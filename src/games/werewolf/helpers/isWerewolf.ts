import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard } from '../interfaces/card/cards'

export function isWerewolf(
  player: PlayerWerewolf,
  game: WerewolfGame
): boolean {
  const hasClaw = player.artifacts.find(a => a.type === 'claw of the werewolf')

  return (
    getCard(player.role).team === 'werewolves' ||
    (!!player.secondaryRole &&
      getCard(player.secondaryRole).team === 'werewolves') ||
    (!!hasClaw &&
      (hasClaw.activated === 'played' ||
        game.options.werewolfArtifactAlwaysActive))
  )
}
