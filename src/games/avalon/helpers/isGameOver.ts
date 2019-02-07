import { AvalonGame, Party } from '../interfaces/game'
import { isArray } from 'util'
import { count } from '../../../helpers/count'

export function isGameOver(game: AvalonGame | Party[]): Party | null {
  const cards = isArray(game) ? game : game.missionResults

  const bad = count(cards, c => c === 'bad')
  const good = count(cards, c => c === 'good')

  if (good === 3) return 'good'
  if (bad === 3) return 'bad'
  return null
}
