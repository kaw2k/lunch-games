import { Party, Role } from '../interfaces/game'

export function getParty(role: Role): Party {
  return role === 'accomplice' || role === 'murderer' ? 'bad' : 'good'
}
