import { shuffle } from '../../../helpers/shuffle'
import { PlayerAvalon } from '../interfaces/player'
import { Player } from '../../../interfaces/player'
import { Hash } from '../../../interfaces/hash'
import { Role } from '../interfaces/game'
import { getParty } from './getParty'

export function assignRoles(
  players: Player[],
  roles: Role[]
): Hash<PlayerAvalon> {
  return shuffle(roles).reduce<Hash<PlayerAvalon>>((hash, role, i) => {
    return {
      ...hash,
      [players[i].id]: {
        ...players[i],
        role,
        party: getParty(role),
        ready: false,
        ladyOfTheLake: false,
        missionVote: null,
      },
    }
  }, {})
}
