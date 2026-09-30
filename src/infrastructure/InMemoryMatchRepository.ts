import { Match, MatchStatus } from "@/domain/entities/Match";
import { MatchRepository } from "@/domain/repositories/MatchRepository";

/** Implementación en memoria del repositorio de partidos. */
export class InMemoryMatchRepository implements MatchRepository {
  constructor(private readonly matches: readonly Match[]) {}

  async findAll(): Promise<Match[]> {
    return [...this.matches];
  }

  async findById(id: string): Promise<Match | null> {
    return this.matches.find((match) => match.id === id) ?? null;
  }

  async findByStatus(status: MatchStatus): Promise<Match[]> {
    return this.matches.filter((match) => match.status === status);
  }

  async findByTeamId(teamId: string): Promise<Match[]> {
    return this.matches.filter((match) => match.involves(teamId));
  }
}
