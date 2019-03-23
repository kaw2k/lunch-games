import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard, isRole } from '../interfaces/card/cards'
import { values } from 'ramda'
import { FangFace } from '../interfaces/card/fangFace'

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

export function doesFangFaceWakeUp(
  player: PlayerWerewolf,
  game: WerewolfGame
): boolean {
  const livingWolves = values(game.players).filter(
    p => p.alive && isWerewolf(p, game)
  )

  return (
    livingWolves.length === 1 &&
    isRole(livingWolves[0], FangFace.role) &&
    player.id === livingWolves[0].id
  )
}
