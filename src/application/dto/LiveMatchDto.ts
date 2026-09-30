/**
 * DTO (objeto plano y serializable) que viaja del servidor al navegador.
 * Las clases del dominio NO se pueden enviar a un Client Component,
 * por eso se convierten a este formato.
 */
export interface LiveMatchDto {
  id: string;
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
  minute: number;
}
