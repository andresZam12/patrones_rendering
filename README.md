# Football Hub

Proyecto de Programación Orientada a la Web: un mismo proyecto Next.js (App Router)
que usa SSG, ISR, SSR y CSR, con arquitectura en capas y POO.

## Cómo ejecutarlo

    npm install
    npm run build
    npm start

> Usa `build` + `start`. En `npm run dev` todas las páginas se renderizan
> en cada petición y no se nota la diferencia entre estrategias.

## Estrategia por ruta

| Ruta                | Estrategia | Cómo se activa                                   |
|---------------------|------------|--------------------------------------------------|
| `/`                 | SSG        | Sin datos dinámicos, se genera en el build       |
| `/teams/[slug]`     | SSG        | `generateStaticParams` + `dynamicParams = false` |
| `/standings`        | ISR        | `export const revalidate = 30`                   |
| `/matches/[id]`     | SSR        | `export const dynamic = "force-dynamic"`         |
| `/live`             | CSR        | `"use client"` + `fetch("/api/live")` cada 2 s   |

## Capas

    domain/          Entidades y reglas de negocio (Team, Match, StandingsCalculator)
    application/     Casos de uso (servicios) y DTOs
    infrastructure/  Implementaciones concretas (repositorios en memoria)
    container.ts     Raíz de composición: inyección de dependencias
    app/             Rutas de Next.js (solo presentación)
    components/      RenderBadge (server) y LiveScoreboard (client)

Para cambiar a una base de datos real, crea nuevas clases que implementen
`TeamRepository` y `MatchRepository` y cámbialas en `container.ts`.
