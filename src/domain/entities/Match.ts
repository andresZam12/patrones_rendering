import { Team } from "./Team";

export type Side = "home" | "away";
export type MatchStatus = "scheduled" | "live" | "finished";

export interface Goal {
  readonly minute: number;
  readonly side: Side;
  readonly scorer: string;
}

export interface Score {
  readonly home: number;
  readonly away: number;
}

const FULL_TIME_MINUTE = 90;

/** Formatea un marcador como "2 - 1". */
export function formatScore(score: Score): string {
  return `${score.home} - ${score.away}`;
}

/**
 * Entidad de dominio: un partido.
 * Encapsula las reglas de cómo se calcula el marcador en cada minuto.
 */
export class Match {
  constructor(
    public readonly id: string,
    public readonly homeTeam: Team,
    public readonly awayTeam: Team,
    public readonly status: MatchStatus,
    private readonly goals: readonly Goal[],
  ) {}

  /**
   * Minuto actual del partido.
   * En modo demo, un partido "live" avanza 1 minuto por cada segundo real
   * y vuelve a empezar al llegar al minuto 90 (así se ve el cambio rápido).
   */
  getElapsedMinute(now: Date): number {
    switch (this.status) {
      case "scheduled":
        return 0;
      case "finished":
        return FULL_TIME_MINUTE;
      case "live":
        return Math.floor(now.getTime() / 1000) % (FULL_TIME_MINUTE + 1);
    }
  }

  /** Marcador acumulado hasta un minuto dado. */
  getScoreAt(minute: number): Score {
    const scored = this.goals.filter((goal) => goal.minute <= minute);
    return {
      home: scored.filter((goal) => goal.side === "home").length,
      away: scored.filter((goal) => goal.side === "away").length,
    };
  }

  /** Marcador final (minuto 90). */
  getFinalScore(): Score {
    return this.getScoreAt(FULL_TIME_MINUTE);
  }

  /** Goles ocurridos hasta un minuto dado, en orden cronológico. */
  getGoalsUntil(minute: number): Goal[] {
    return this.goals
      .filter((goal) => goal.minute <= minute)
      .slice()
      .sort((a, b) => a.minute - b.minute);
  }

  isFinished(): boolean {
    return this.status === "finished";
  }

  involves(teamId: string): boolean {
    return this.homeTeam.id === teamId || this.awayTeam.id === teamId;
  }
}
