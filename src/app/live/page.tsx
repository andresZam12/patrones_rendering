import { LiveScoreboard } from "@/components/LiveScoreboard";
import { RenderBadge } from "@/components/RenderBadge";

/**
 * Esta página es un cascarón estático (título y badge).
 * Lo importante ocurre en <LiveScoreboard />, que se ejecuta en el navegador (CSR).
 */
export default function LivePage() {
  return (
    <>
      <h1>Partidos en vivo</h1>
      <RenderBadge strategy="CSR" description="El navegador consulta /api/live cada 2 s" />
      <LiveScoreboard />
    </>
  );
}
