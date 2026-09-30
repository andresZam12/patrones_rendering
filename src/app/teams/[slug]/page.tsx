import Link from "next/link";
import { notFound } from "next/navigation";
import { RenderBadge } from "@/components/RenderBadge";
import { teamService } from "@/container";
import { formatScore } from "@/domain/entities/Match";

// Solo existen las rutas generadas en el build; cualquier otra devuelve 404
export const dynamicParams = false;

/** SSG con parámetros: Next.js genera una página por cada equipo. */
export async function generateStaticParams() {
  const teams = await teamService.getAllTeams();
  return teams.map((team) => ({ slug: team.slug }));
}

interface TeamPageProps {
  // En Next.js 15 los params son una Promise
  params: Promise<{ slug: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const profile = await teamService.getTeamProfile(slug);

  if (!profile) notFound();

  const { team, matches } = profile;

  return (
    <>
      <h1>{team.name}</h1>
      <RenderBadge strategy="SSG" description="Una página estática por equipo" />

      <p>
        {team.city} · fundado en {team.foundedYear} ({team.getAge()} años)
      </p>

      <h2>Partidos</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            <Link href={`/matches/${match.id}`}>
              {match.homeTeam.name} vs {match.awayTeam.name}
            </Link>{" "}
            — {match.isFinished() ? formatScore(match.getFinalScore()) : match.status}
          </li>
        ))}
      </ul>
    </>
  );
}
