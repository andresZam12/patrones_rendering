import { Match } from "@/domain/entities/Match";
import { MatchRepository } from "@/domain/repositories/MatchRepository";
import { LiveMatchDto } from "./dto/LiveMatchDto";

/** Casos de uso relacionados con partidos. */
export class MatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  getMatchById(id: string): Promise<Match | null> {
    return this.matchRepository.findById(id);
  }

  /** Foto del estado de todos los partidos en vivo en el instante `now`. */
  async getLiveSnapshot(now: Date): Promise<LiveMatchDto[]> {
    const liveMatches = await this.matchRepository.findByStatus("live");
    return liveMatches.map((match) => this.toLiveDto(match, now));
  }

  private toLiveDto(match: Match, now: Date): LiveMatchDto {
    const minute = match.getElapsedMinute(now);
    const score = match.getScoreAt(minute);

    return {
      id: match.id,
      homeName: match.homeTeam.name,
      awayName: match.awayTeam.name,
      homeScore: score.home,
      awayScore: score.away,
      minute,
    };
  }
}
