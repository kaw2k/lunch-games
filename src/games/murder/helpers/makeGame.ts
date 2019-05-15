import {
  Role,
  MurderGame,
  MurderLobby,
  EVIDENCES,
  WEAPONS,
} from '../interfaces/game'
import repeat from 'ramda/es/repeat'
import { shuffle } from '../../../helpers/shuffle'
import { PlayerMurder } from '../interfaces/player'
import { Hash } from '../../../interfaces/hash'
import { CAUSE_OF_DEATH, SCENES } from '../interfaces/scenes'

export function makeGame(lobby: MurderLobby): MurderGame {
  // Not counting the forensic scientist
  const numPeople = lobby.lobbyPlayers.length - 1
  const numCardsNeeded = lobby.murderOptions.cardCounts

  const weapons = shuffle(WEAPONS)
  const evidences = shuffle(EVIDENCES)

  const INVESTIGATOR: Role = 'investigator'
  let roles: Role[] = ['forensic scientist', 'murderer']
  if (numPeople >= 5) roles = roles.concat('accomplice')
  if (numPeople >= 6) roles = roles.concat('witness')
  roles = shuffle(
    roles.concat(repeat(INVESTIGATOR, 10)).slice(0, numPeople + 1)
  )

  return {
    id: lobby.id,
    lobbyPlayers: lobby.lobbyPlayers,
    message: null,
    type: 'murder-game',
    scenes: [CAUSE_OF_DEATH, ...shuffle(SCENES).slice(0, 4)],
    round: 'setup',
    murderOptions: lobby.murderOptions,
    players: shuffle(lobby.lobbyPlayers).reduce<Hash<PlayerMurder>>(
      (memo, p, i) => ({
        ...memo,
        [p.id]: {
          ...p,
          ready: false,
          role: roles[i],
          weapons: weapons.slice(
            i * numCardsNeeded,
            i * numCardsNeeded + numCardsNeeded
          ),
          markedWeapons: [],
          evidence: evidences.slice(
            i * numCardsNeeded,
            i * numCardsNeeded + numCardsNeeded
          ),
          markedEvidences: [],
        },
      }),
      {}
    ),
  }
}
