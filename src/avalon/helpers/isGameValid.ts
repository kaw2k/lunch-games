import { Role } from '../interfaces/game'
import { count } from '../../helpers/count'
import { getParty } from './getParty'

export function isGameValid(numPlayers: number, roles: Role[]): boolean {
  const numBad = count(roles, role => getParty(role) === 'bad')

  const numGood = count(roles, role => getParty(role) === 'good')
  const hasEnoughGood = numBad + numGood === numPlayers

  if (numPlayers <= 6 && numBad === 2 && hasEnoughGood) return true
  if (numPlayers <= 9 && numBad === 3 && hasEnoughGood) return true
  if (numPlayers <= 10 && numBad === 4 && hasEnoughGood) return true

  return false
}
