import Link from "next/link";
import { RenderBadge } from "@/components/RenderBadge";
import { teamService } from "@/container";

/**
 * SSG: esta página no usa datos dinámicos ni `revalidate`,
 * así que Next.js la genera UNA vez en `next build`.
 */
export default async function HomePage() {
  const teams = await teamService.getAllTeams();

  return (
    <>
      <h1>Fulbito UCC</h1>
      <RenderBadge strategy="SSG" description="Generada en el build, nunca cambia" />

      <p>
        Cada ruta usa una estrategia de rendering distinta según qué tan
        cambiante es su información.
      </p>

      <h2>Equipos</h2>
      <p>Cada perfil de equipo también es SSG (usa generateStaticParams).</p>
      <ul className="team-list">
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/teams/${team.slug}`}>{team.name}</Link>
            <span>{team.city}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
