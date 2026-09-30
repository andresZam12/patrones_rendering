/**
 * Entidad de dominio: representa un equipo de fútbol.
 * No conoce nada de Next.js ni de bases de datos.
 */
export class Team {
  constructor(
    public readonly id: string,
    public readonly slug: string, // Se usa en la URL: /teams/[slug]
    public readonly name: string,
    public readonly city: string,
    public readonly foundedYear: number,
  ) {}

  /** Años de historia del club. */
  getAge(referenceYear: number = new Date().getFullYear()): number {
    return referenceYear - this.foundedYear;
  }
}
