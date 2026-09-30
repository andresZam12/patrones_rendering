"use client";

import { useEffect, useState } from "react";
import type { LiveMatchDto } from "@/application/dto/LiveMatchDto";

const POLLING_INTERVAL_MS = 2000;

/**
 * Client Component (CSR): el navegador pide los datos a /api/live
 * cada 2 segundos y actualiza la pantalla sin recargar la página.
 */
export function LiveScoreboard() {
  const [matches, setMatches] = useState<LiveMatchDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true; // Evita actualizar el estado si el componente ya se desmontó

    const loadMatches = async () => {
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = (await response.json()) as { matches: LiveMatchDto[] };
        if (isActive) {
          setMatches(data.matches);
          setError(null);
        }
      } catch {
        if (isActive) setError("No se pudo actualizar el marcador. Reintentando…");
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadMatches();
    const intervalId = setInterval(loadMatches, POLLING_INTERVAL_MS);

    // Limpieza: detener el polling al salir de la página
    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, []);

  if (isLoading) return <p>Cargando marcadores…</p>;

  return (
    <section aria-live="polite">
      {error && <p role="alert">{error}</p>}
      {matches.length === 0 && !error && <p>No hay partidos en vivo ahora.</p>}
      <ul className="scoreboard">
        {matches.map((match) => (
          <li key={match.id}>
            <span className="minute">{match.minute}&apos;</span>
            <span>{match.homeName}</span>
            <strong className="score">
              {match.homeScore} - {match.awayScore}
            </strong>
            <span>{match.awayName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
