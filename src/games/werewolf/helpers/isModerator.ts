import { Player } from '../../../interfaces/player'
import { Werewolf } from '../interfaces/game'

export function isModerator(player: Player, game: Werewolf): boolean {
  const moderators =
    game.type === 'werewolf-game' ? game.moderators : game.werewolfModerators
  return !!moderators.find(pid => pid === player.id)
}
