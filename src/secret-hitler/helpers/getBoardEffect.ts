import { PlayerSecretHitler } from '../interfaces/player'
import { Party, BoardEffects, PlayerHash } from '../interfaces/game'
import { isArray } from 'util'
import values from 'ramda/es/values'

export function getBoardEffect(
  numPlayers: number | PlayerSecretHitler[] | PlayerHash,
  numFascists: number | Party[]
): BoardEffects | null {
  numPlayers =
    typeof numPlayers === 'number'
      ? numPlayers
      : isArray(numPlayers)
      ? numPlayers.length
      : values(numPlayers).length

  numFascists =
    typeof numFascists === 'number'
      ? numFascists
      : numFascists.filter(c => c === 'fascist').length

  if (numFascists === 4 || numFascists === 5) {
    return 'kill'
  }

  if (numPlayers === 5 || numPlayers === 6) {
    if (numFascists === 3) {
      return 'inspect cards'
    }
  } else if (numPlayers === 7 || numPlayers === 8) {
    if (numFascists === 2) {
      return 'inspect role'
    } else if (numFascists === 3) {
      return 'choose president'
    }
  } else if (numPlayers === 9 || numPlayers === 10) {
    if (numFascists === 1 || numFascists === 2) {
      return 'inspect role'
    } else if (numFascists === 3) {
      return 'choose president'
    }
  }

  return null
}
