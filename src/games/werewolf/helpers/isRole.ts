import { PlayerWerewolf } from '../interfaces/player'
import { Roles } from '../interfaces/card/cards'

export function isRole(player: PlayerWerewolf, role: Roles): boolean {
  return player.role === role || player.secondaryRole === role
}
