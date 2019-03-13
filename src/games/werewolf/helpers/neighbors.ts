import { PlayerId } from '../../../interfaces/player'
import { WerewolfGame } from '../interfaces/game'
import findIndex from 'ramda/es/findIndex'
import values from 'ramda/es/values'
import uniq from 'ramda/es/uniq'
import { equals } from 'ramda'

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

export function makeSeatingChart(game: WerewolfGame): PlayerId[] | null {
  const players = values(game.players)
  let seats: PlayerId[] = []
  let currentPlayer = players[0]

  for (let i = 0; i < players.length; i++) {
    seats = seats.concat(currentPlayer.id)
    if (!currentPlayer.leftNeighbor) {
      break
    } else {
      currentPlayer = game.players[currentPlayer.leftNeighbor]
    }
  }

  const hasAllPlayers = seats.length === players.length
  const hasDuplicates = !equals(uniq(seats), seats)

  if (!hasAllPlayers || hasDuplicates) return null

  return seats
}
