import { Team } from "../entities/Team";

/**
 * Contrato (abstracción) para acceder a equipos.
 * Los servicios dependen de esta interfaz, no de una implementación concreta
 * (principio de inversión de dependencias).
 */
export interface TeamRepository {
  findAll(): Promise<Team[]>;
  findBySlug(slug: string): Promise<Team | null>;
}
