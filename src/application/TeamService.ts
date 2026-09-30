import { Match } from "@/domain/entities/Match";
import { Team } from "@/domain/entities/Team";
import { MatchRepository } from "@/domain/repositories/MatchRepository";
import { TeamRepository } from "@/domain/repositories/TeamRepository";

export interface TeamProfile {
  team: Team;
  matches: Match[];
}

/** Casos de uso relacionados con equipos. */
export class TeamService {
  // Las dependencias llegan por el constructor (inyección de dependencias)
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  getAllTeams(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async getTeamProfile(slug: string): Promise<TeamProfile | null> {
    const team = await this.teamRepository.findBySlug(slug);
    if (!team) return null;

    const matches = await this.matchRepository.findByTeamId(team.id);
    return { team, matches };
  }
}
