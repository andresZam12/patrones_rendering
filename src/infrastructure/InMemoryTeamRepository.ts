import { Team } from "@/domain/entities/Team";
import { TeamRepository } from "@/domain/repositories/TeamRepository";

/** Implementación en memoria del repositorio de equipos. */
export class InMemoryTeamRepository implements TeamRepository {
  constructor(private readonly teams: readonly Team[]) {}

  async findAll(): Promise<Team[]> {
    return [...this.teams];
  }

  async findBySlug(slug: string): Promise<Team | null> {
    return this.teams.find((team) => team.slug === slug) ?? null;
  }
}
