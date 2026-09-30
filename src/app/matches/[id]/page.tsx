import { notFound } from "next/navigation";
import { RenderBadge } from "@/components/RenderBadge";
import { matchService } from "@/container";
import { formatScore } from "@/domain/entities/Match";

/** SSR: se renderiza en el servidor en CADA petición, sin caché. */
export const dynamic = "force-dynamic";

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = await matchService.getMatchById(id);

  if (!match) notFound();

  // El marcador se calcula con la hora de ESTA petición
  const minute = match.getElapsedMinute(new Date());
  const score = match.getScoreAt(minute);
  const goals = match.getGoalsUntil(minute);

  return (
    <>
      <h1>
        {match.homeTeam.name} {formatScore(score)} {match.awayTeam.name}
      </h1>
      <RenderBadge strategy="SSR" description="Se renderiza en cada petición" />

      <p>
        Estado: {match.status} · minuto {minute}
      </p>

      <h2>Goles</h2>
      {goals.length === 0 ? (
        <p>Todavía no hay goles.</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={`${goal.minute}-${goal.scorer}`}>
              {goal.minute}&apos; {goal.scorer} (
              {goal.side === "home" ? match.homeTeam.name : match.awayTeam.name})
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
