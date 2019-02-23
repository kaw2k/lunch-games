import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard } from '../interfaces/card/cards'

export function isWerewolf(
  player: PlayerWerewolf,
  game: WerewolfGame
): boolean {
  return (
    getCard(player.role).team === 'werewolves' ||
    (!!player.secondaryRole &&
      getCard(player.secondaryRole).team === 'werewolves')
  )
}
