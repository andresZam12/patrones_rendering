import { RenderBadge } from "@/components/RenderBadge";
import { standingsService } from "@/container";

/**
 * ISR: la página se sirve desde caché y se regenera en segundo plano
 * como máximo cada 30 segundos (debe ser un número literal).
 */
export const revalidate = 30;

export default async function StandingsPage() {
  const standings = await standingsService.getStandings();

  return (
    <>
      <h1>Tabla de posiciones</h1>
      <RenderBadge strategy="ISR" description="Se regenera cada 30 segundos" />

      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>DG</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((row) => (
            <tr key={row.team.id}>
              <td>{row.team.name}</td>
              <td>{row.played}</td>
              <td>{row.won}</td>
              <td>{row.drawn}</td>
              <td>{row.lost}</td>
              <td>{row.goalDifference}</td>
              <td><strong>{row.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
