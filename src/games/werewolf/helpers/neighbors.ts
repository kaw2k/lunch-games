import { PlayerId } from '../../../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import findIndex from 'ramda/es/findIndex'

export function getNeighbor(
  start: PlayerId,
  direction: 'right' | 'left',
  game: WerewolfGame
): PlayerId | null {
  const livingPlayers = game.playerOrder.filter(p => game.players[p].alive)
  const startingIndex = findIndex(p => p === start, livingPlayers)

  // We are starting with an invalid player
  if (startingIndex === -1) return null

  if (direction === 'left')
    return livingPlayers[(startingIndex || livingPlayers.length) - 1]

  if (direction === 'right')
    return livingPlayers[
      startingIndex === livingPlayers.length - 1 ? 0 : startingIndex + 1
    ]

  return null
}
