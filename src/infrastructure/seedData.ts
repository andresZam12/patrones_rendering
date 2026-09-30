import { Match } from "@/domain/entities/Match";
import { Team } from "@/domain/entities/Team";

export interface SeedData {
  teams: Team[];
  matches: Match[];
}

/**
 * Datos de ejemplo (equipos ficticios).
 * Para pasar a una base de datos real basta con crear otra implementación
 * de los repositorios; nada más cambia.
 */
export function createSeedData(): SeedData {
  const galeras = new Team("t1", "galeras-fc", "Galeras FC", "Pasto", 1998);
  const narino = new Team("t2", "narino-united", "Nariño United", "Ipiales", 2005);
  const condor = new Team("t3", "condor-sc", "Cóndor SC", "Túquerres", 2011);
  const pacifico = new Team("t4", "pacifico-fc", "Pacífico FC", "Tumaco", 2001);

  const matches: Match[] = [
    new Match("m1", galeras, condor, "finished", [
      { minute: 15, side: "home", scorer: "Ruiz" },
      { minute: 40, side: "away", scorer: "Mora" },
      { minute: 78, side: "home", scorer: "Ruiz" },
    ]),
    new Match("m2", narino, pacifico, "finished", []),
    new Match("m3", pacifico, galeras, "finished", [
      { minute: 22, side: "away", scorer: "Ortega" },
      { minute: 55, side: "home", scorer: "Cuero" },
      { minute: 63, side: "away", scorer: "Ruiz" },
      { minute: 88, side: "away", scorer: "Ortega" },
    ]),
    new Match("m4", narino, condor, "live", [
      { minute: 12, side: "home", scorer: "Benavides" },
      { minute: 34, side: "away", scorer: "Mora" },
      { minute: 67, side: "home", scorer: "Benavides" },
      { minute: 81, side: "home", scorer: "Erazo" },
    ]),
    new Match("m5", galeras, narino, "scheduled", []),
    new Match("m6", galeras, pacifico, "live", [
      { minute: 8, side: "away", scorer: "Cuero" },
      { minute: 30, side: "home", scorer: "Ruiz" },
      { minute: 52, side: "home", scorer: "Ortega" },
    ]),
  ];

  return { teams: [galeras, narino, condor, pacifico], matches };
}
