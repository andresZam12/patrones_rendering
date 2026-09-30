import { Match, MatchStatus } from "../entities/Match";

/** Contrato para acceder a partidos. */
export interface MatchRepository {
  findAll(): Promise<Match[]>;
  findById(id: string): Promise<Match | null>;
  findByStatus(status: MatchStatus): Promise<Match[]>;
  findByTeamId(teamId: string): Promise<Match[]>;
}
