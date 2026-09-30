import { MatchRepository } from "@/domain/repositories/MatchRepository";
import { TeamRepository } from "@/domain/repositories/TeamRepository";
import { StandingRow, StandingsCalculator } from "@/domain/services/StandingsCalculator";

/** Caso de uso: obtener la tabla de posiciones. */
export class StandingsService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository,
    private readonly calculator: StandingsCalculator,
  ) {}

  async getStandings(): Promise<StandingRow[]> {
    const [teams, matches] = await Promise.all([
      this.teamRepository.findAll(),
      this.matchRepository.findAll(),
    ]);
    return this.calculator.calculate(teams, matches);
  }
}
