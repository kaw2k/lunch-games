import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard, isRole } from '../interfaces/card/cards'
import { values } from 'ramda'
import { FangFace } from '../interfaces/card/fangFace'
import { Sasquatch } from '../interfaces/card/sasquatch'

export function isWerewolf(
  player: PlayerWerewolf,
  game: WerewolfGame
): boolean {
  const hasClaw = player.artifacts.find(a => a.type === 'claw of the werewolf')
  const isSasquatch = isRole(player, Sasquatch.role)

  return (
    // Role is werewolf
    getCard(player.role).team === 'werewolves' ||
    (!!player.secondaryRole &&
      getCard(player.secondaryRole).team === 'werewolves') ||
    // Activated artifact
    (!!hasClaw &&
      (hasClaw.activated === 'played' ||
        game.options.werewolfArtifactAlwaysActive)) ||
    // Sasquatch
    (isSasquatch && !!player.sasquatchWakesUp)
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

export function getWerewolves(game: WerewolfGame) {
  return values(game.players)
    .filter(p => {
      return (
        p.alive &&
        ((isRole(p, FangFace.role) && doesFangFaceWakeUp(p, game)) ||
          (!isRole(p, FangFace.role) && isWerewolf(p, game)))
      )
    })
    .map(p => p.id)
}
