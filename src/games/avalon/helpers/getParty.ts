import { Role, Party } from '../interfaces/game'

export function getParty(role: Role): Party {
  return role === 'good' || role === 'merlin' || role === 'percival'
    ? 'good'
    : 'bad'
}
