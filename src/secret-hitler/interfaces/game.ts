import { PlayerSecretHitler } from '../../secret-hitler/interfaces/player'
import { Player } from '../../interfaces/player'
import { RoomId, Lobby } from '../../interfaces/room'
import { Omit } from 'ramda'

export type Party = 'fascist' | 'liberal'
export function isParty(thing: any): thing is Party {
  return thing === 'fascist' || thing === 'liberal'
}

export interface Role {
  isHitler: boolean
  party: Party
}

export type BoardEffects =
  | 'kill'
  | 'inspect role'
  | 'inspect cards'
  | 'choose president'

export interface PreviousGovernment {
  president: PlayerSecretHitler
  chancellor: PlayerSecretHitler
}

export interface Government extends PreviousGovernment {
  cards: Party[]
  veto: boolean | null
}

export type PlayerHash = { [playerId: string]: PlayerSecretHitler }

export interface SecretHitlerGame {
  type: 'secret-hitler-game'
  id: RoomId
  lobbyPlayers: Player[]
  previousGovernment: PreviousGovernment | null
  government: Government | null
  performPower: PlayerSecretHitler | null
  players: PlayerHash
  discardedCards: Party[]
  remainingCards: Party[]
  playedCards: Party[]
  chaos: number
  message: string | null
}

export interface SecretHitlerLobby extends Omit<Lobby, 'type'> {
  type: 'secret-hitler-lobby'
}

export type SecretHitler = SecretHitlerGame | SecretHitlerLobby
