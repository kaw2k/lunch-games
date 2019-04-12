import { colors } from '@material-ui/core'

export function getColorFromString(str: string) {
  const num =
    str
      .replace(/[^a-zA-Z]+/g, '')
      .split('')
      .map(c => c.charCodeAt(0))
      .reduce((x, y) => x + y, 0) + str.length

  if (!(num % 11)) return colors.indigo[300]
  if (!(num % 7)) return colors.deepOrange[300]
  if (!(num % 5)) return colors.brown[300]
  if (!(num % 4)) return colors.purple[300]
  if (!(num % 3)) return colors.red[300]
  if (!(num % 2)) return colors.cyan[300]

  return colors.grey[300]
}
