import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import { getCard, isRole } from '../interfaces/card/cards'
import { playerNameList } from '../../../components/playerName'
import { isWerewolf, doesFangFaceWakeUp } from './isWerewolf'
import { getNeighbors } from './neighbors'
import any from 'ramda/es/any'
import { FangFace } from '../interfaces/card/fangFace'

export function getInsomniacMessage(
  player: PlayerWerewolf,
  game: WerewolfGame
): string {
  const neighbors = getNeighbors(player.id, 'skip-gaps', game)

  const hasWokenUp = any(pid => {
    const target = game.players[pid]
    const isFangFace = isRole(target, FangFace.role)
    const isFangFaceActive = doesFangFaceWakeUp(target, game)

    return (
      !!getCard(target.role).night ||
      isFangFaceActive ||
      (isWerewolf(target, game) && !isFangFace) ||
      (!!target.secondaryRole && !!getCard(target.secondaryRole).night)
    )
  }, neighbors)

  const names = playerNameList(neighbors, game)

  return hasWokenUp
    ? `One of your neighbors (${names}) woke up last night`
    : `None of your neighbors (${names}) woke up last night`
}
