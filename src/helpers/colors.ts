export const BLACK = 'black'
export const WHITE = 'white'
export const BLUE = '#69D2E7'
export const RED = '#a73629'
export const GREY = '#d4d4d4'
export const GREEN = '#36b889'
export const TEAL = '#37818b'

export type Colors =
  | 'black'
  | 'grey'
  | 'red'
  | 'blue'
  | 'white'
  | 'green'
  | 'teal'

export function getColor(color: Colors | null | undefined): string {
  if (color === 'black') return BLACK
  if (color === 'blue') return BLUE
  if (color === 'grey') return GREY
  if (color === 'red') return RED
  if (color === 'white') return WHITE
  if (color === 'green') return GREEN
  if (color === 'teal') return TEAL

  return WHITE
}
