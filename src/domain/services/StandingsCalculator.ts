import { Match } from "../entities/Match";
import { Team } from "../entities/Team";

export interface StandingRow {
  readonly team: Team;
  readonly played: number;
  readonly won: number;
  readonly drawn: number;
  readonly lost: number;
  readonly goalsFor: number;
  readonly goalsAgainst: number;
  readonly goalDifference: number;
  readonly points: number;
}

/** Fila interna mutable, solo se usa mientras se acumulan resultados. */
interface MutableRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
}

/**
 * Servicio de dominio: calcula la tabla de posiciones.
 * Es una clase pura (sin I/O), por eso es fácil de probar.
 */
export class StandingsCalculator {
  private static readonly POINTS_PER_WIN = 3;
  private static readonly POINTS_PER_DRAW = 1;

  calculate(teams: Team[], matches: Match[]): StandingRow[] {
    const table = new Map<string, MutableRow>(
      teams.map((team) => [team.id, this.createEmptyRow(team)]),
    );

    // Solo los partidos terminados cuentan para la tabla
    for (const match of matches.filter((m) => m.isFinished())) {
      const home = table.get(match.homeTeam.id);
      const away = table.get(match.awayTeam.id);
      if (!home || !away) continue;

      const score = match.getFinalScore();
      this.register(home, score.home, score.away);
      this.register(away, score.away, score.home);
    }

    return [...table.values()]
      .map((row) => this.toStandingRow(row))
      .sort(this.compareRows);
  }

  private createEmptyRow(team: Team): MutableRow {
    return { team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0 };
  }

  private register(row: MutableRow, scored: number, conceded: number): void {
    row.played += 1;
    row.goalsFor += scored;
    row.goalsAgainst += conceded;

    if (scored > conceded) row.won += 1;
    else if (scored === conceded) row.drawn += 1;
    else row.lost += 1;
  }

  private toStandingRow(row: MutableRow): StandingRow {
    return {
      ...row,
      goalDifference: row.goalsFor - row.goalsAgainst,
      points:
        row.won * StandingsCalculator.POINTS_PER_WIN +
        row.drawn * StandingsCalculator.POINTS_PER_DRAW,
    };
  }

  /** Orden: puntos, diferencia de gol y goles a favor. */
  private compareRows = (a: StandingRow, b: StandingRow): number =>
    b.points - a.points ||
    b.goalDifference - a.goalDifference ||
    b.goalsFor - a.goalsFor;
}
