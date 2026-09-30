import { MatchService } from "@/application/MatchService";
import { StandingsService } from "@/application/StandingsService";
import { TeamService } from "@/application/TeamService";
import { StandingsCalculator } from "@/domain/services/StandingsCalculator";
import { InMemoryMatchRepository } from "@/infrastructure/InMemoryMatchRepository";
import { InMemoryTeamRepository } from "@/infrastructure/InMemoryTeamRepository";
import { createSeedData } from "@/infrastructure/seedData";

/**
 * Raíz de composición: el ÚNICO lugar donde se crean las implementaciones
 * concretas y se conectan entre sí. Las páginas solo importan los servicios.
 */
const { teams, matches } = createSeedData();

const teamRepository = new InMemoryTeamRepository(teams);
const matchRepository = new InMemoryMatchRepository(matches);

export const teamService = new TeamService(teamRepository, matchRepository);
export const matchService = new MatchService(matchRepository);
export const standingsService = new StandingsService(
  teamRepository,
  matchRepository,
  new StandingsCalculator(),
);
