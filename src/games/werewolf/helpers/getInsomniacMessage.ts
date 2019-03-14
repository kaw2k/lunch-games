import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard, isRole } from '../interfaces/card/cards'
import { playerName } from '../../../components/playerName'
import { isWerewolf, doesFangFaceWakeUp } from './isWerewolf'
import { getNeighbor } from './neighbors'

export function getInsomniacMessage(
  player: PlayerWerewolf,
  game: WerewolfGame
): string {
  let players: PlayerWerewolf[] = []
  let hasNightAction: boolean = false

  const left = getNeighbor(player.id, 'left', game)
  if (left) {
    const target = game.players[left]
    const isFangFace = isRole(target, 'fang face')
    const isFangFaceActive = doesFangFaceWakeUp(target, game)

    players = players.concat(target)
    hasNightAction =
      hasNightAction ||
      !!getCard(target.role).night ||
      isFangFaceActive ||
      (isWerewolf(target, game) && !isFangFace) ||
      (!!target.secondaryRole && !!getCard(target.secondaryRole).night)
  }

  const right = getNeighbor(player.id, 'right', game)
  if (right) {
    const target = game.players[right]
    const isFangFace = isRole(target, 'fang face')
    const isFangFaceActive = doesFangFaceWakeUp(target, game)

    players = players.concat(target)
    hasNightAction =
      hasNightAction ||
      !!getCard(target.role).night ||
      isFangFaceActive ||
      (isWerewolf(target, game) && !isFangFace) ||
      (!!target.secondaryRole && !!getCard(target.secondaryRole).night)
  }

  return players.map(p => playerName(p)).join(', ')
}
