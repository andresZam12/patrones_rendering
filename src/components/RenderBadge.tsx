export type RenderStrategy = "SSG" | "ISR" | "SSR" | "CSR";

interface RenderBadgeProps {
  strategy: RenderStrategy;
  description: string;
}

/**
 * Server Component que muestra la estrategia de rendering y la hora en que
 * se generó el HTML. Sirve para VER la diferencia entre SSG, ISR y SSR:
 * - SSG: la hora queda congelada desde el build.
 * - ISR: la hora cambia cada vez que se regenera la página.
 * - SSR: la hora cambia en cada petición.
 */
export function RenderBadge({ strategy, description }: RenderBadgeProps) {
  const generatedAt = new Date().toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour12: false,
  });

  return (
    <aside className={`badge badge-${strategy.toLowerCase()}`}>
      <strong>{strategy}</strong>
      <span>{description}</span>
      <span>HTML generado a las {generatedAt}</span>
    </aside>
  );
}
