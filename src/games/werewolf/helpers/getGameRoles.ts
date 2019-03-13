import { values } from 'ramda'
import { WerewolfGame } from '../interfaces/game'
import { Roles } from '../interfaces/card/cards'
import uniq from 'ramda/es/uniq'

export function getGameRoles(game: WerewolfGame): Roles[] {
  const rolesInGame = values(game.players).map(p => p.role)
  return uniq([...rolesInGame, ...game.initialRoles])
}
