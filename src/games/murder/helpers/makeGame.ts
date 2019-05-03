import { Role, MurderGame, MurderLobby } from '../interfaces/game'
import repeat from 'ramda/es/repeat'
import { shuffle } from '../../../helpers/shuffle'
import { PlayerMurder } from '../interfaces/player'
import { Hash } from '../../../interfaces/hash'

// 4-5: 1 murderer, 1 forensic scientist, remaining investigators
// 6: 1 murderer, 1 accomplice, 1 witness, 1 forensic scientist, remaining investigators
// 7: 1 murderer, 1 accomplice, 1 forensic scientist, remaining investigators
// 8-12: 1 murderer, 1 accomplice, 1 witness, 1 forensic scientist, remaining investigators

export function makeGame(lobby: MurderLobby): MurderGame {
  const INVESTIGATOR: Role = 'investigator'
  const investigators = repeat(INVESTIGATOR, 10)

  const numPeople = lobby.lobbyPlayers.length

  let roles: Role[] = ['forensic scientist', 'murderer']
  if (numPeople === 6) roles = roles.concat('accomplice')
  if (numPeople === 7) roles = roles.concat('witness')
  roles = shuffle(roles.concat(investigators).slice(0, numPeople))

  return {
    id: lobby.id,
    lobbyPlayers: lobby.lobbyPlayers,
    message: null,
    type: 'murder-game',
    players: shuffle(lobby.lobbyPlayers).reduce<Hash<PlayerMurder>>(
      (memo, p, i) => ({
        ...memo,
        [p.id]: { ...p, ready: false, role: roles[i] },
      }),
      {}
    ),
  }
}
