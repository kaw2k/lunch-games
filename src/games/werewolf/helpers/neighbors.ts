import { PlayerId } from '../../../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import findIndex from 'ramda/es/findIndex'

export function getNeighbor(
  start: PlayerId,
  direction: 'right' | 'left',
  gaps: 'skip-gaps' | 'allow-gaps',
  game: WerewolfGame
): PlayerId | null {
  const players =
    gaps === 'skip-gaps'
      ? game.playerOrder.filter(p => game.players[p].alive)
      : game.playerOrder

  const startingIndex = findIndex(p => p === start, players)

  let player: PlayerId | null = null

  // We are starting with an invalid player
  if (startingIndex === -1) return null

  if (direction === 'left')
    player = players[(startingIndex || players.length) - 1]

  if (direction === 'right')
    player =
      players[startingIndex === players.length - 1 ? 0 : startingIndex + 1]

  return player && game.players[player].alive ? player : null
}

export function getNeighbors(
  start: PlayerId,
  gaps: 'skip-gaps' | 'allow-gaps',
  game: WerewolfGame
): PlayerId[] {
  let neighbors: PlayerId[] = []

  const left = getNeighbor(start, 'left', gaps, game)
  if (left) neighbors = neighbors.concat(left)

  const right = getNeighbor(start, 'right', gaps, game)
  if (right) neighbors = neighbors.concat(right)

  return neighbors
}
