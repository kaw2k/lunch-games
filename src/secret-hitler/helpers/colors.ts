export const BLACK = 'black'
export const WHITE = 'white'
export const BLUE = '#69D2E7'
export const RED = '#ec4d3b'
export const GREY = '#d4d4d4'

export type Colors = 'black' | 'grey' | 'red' | 'blue'

export function getColor(color: Colors | null | undefined): string {
  if (color === 'black') return BLACK
  if (color === 'blue') return BLUE
  if (color === 'grey') return GREY
  if (color === 'red') return RED

  return WHITE
}
