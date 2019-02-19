import { Player } from '../../../interfaces/player'
import { Werewolf } from '../interfaces/game'

export function isModerator(player: Player, game: Werewolf): boolean {
  return !!game.moderators.find(pid => pid === player.id)
}
