import { values } from 'ramda'
import { WerewolfGame } from '../interfaces/game'
import { Roles } from '../interfaces/card/cards'
import uniq from 'ramda/es/uniq'

export function getGameRoles(game: WerewolfGame): Roles[] {
  const rolesInGame = values(game.players).reduce<Roles[]>((memo, p) => {
    memo = memo.concat(p.role)
    if (p.secondaryRole) memo = memo.concat(p.secondaryRole)
    return memo
  }, [])

  return uniq([...rolesInGame, ...game.initialRoles])
}
