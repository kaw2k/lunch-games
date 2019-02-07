import { PlayerAvalon } from '../interfaces/player'
import { Hash } from '../../../interfaces/hash'
import { Party, PeopleOnMission, VotesNeededToFail } from '../interfaces/game'
import { isArray } from 'util'
import values from 'ramda/es/values'

export function getBoardEffect(
  numPlayers: number | PlayerAvalon[] | Hash<PlayerAvalon>,
  numRound: number | Party[]
): {
  people: PeopleOnMission
  fail: VotesNeededToFail
} {
  numRound = typeof numRound === 'number' ? numRound : numRound.length
  numPlayers =
    typeof numPlayers === 'number'
      ? numPlayers
      : isArray(numPlayers)
      ? numPlayers.length
      : values(numPlayers).length

  if (numPlayers === 5) {
    if (numRound === 0) {
      return { fail: 1, people: 2 }
    } else if (numRound === 1) {
      return { fail: 1, people: 3 }
    } else if (numRound === 2) {
      return { fail: 1, people: 2 }
    } else if (numRound === 3) {
      return { fail: 1, people: 3 }
    } else {
      return { fail: 1, people: 3 }
    }
  } else if (numPlayers === 6) {
    if (numRound === 0) {
      return { fail: 1, people: 2 }
    } else if (numRound === 1) {
      return { fail: 1, people: 3 }
    } else if (numRound === 2) {
      return { fail: 1, people: 4 }
    } else if (numRound === 3) {
      return { fail: 1, people: 3 }
    } else {
      return { fail: 1, people: 4 }
    }
  } else if (numPlayers === 7) {
    if (numRound === 0) {
      return { fail: 1, people: 2 }
    } else if (numRound === 1) {
      return { fail: 1, people: 3 }
    } else if (numRound === 2) {
      return { fail: 1, people: 3 }
    } else if (numRound === 3) {
      return { fail: 2, people: 4 }
    } else {
      return { fail: 1, people: 4 }
    }
  } else {
    if (numRound === 0) {
      return { fail: 1, people: 3 }
    } else if (numRound === 1) {
      return { fail: 1, people: 4 }
    } else if (numRound === 2) {
      return { fail: 1, people: 4 }
    } else if (numRound === 3) {
      return { fail: 2, people: 5 }
    } else {
      return { fail: 1, people: 5 }
    }
  }
}
