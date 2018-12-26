import { Opaque } from './opaque'
import { Player, PlayerGame } from './player'

export type Party = 'fascist' | 'liberal'
export function isParty(thing: any): thing is Party {
  return thing === 'fascist' || thing === 'liberal'
}

export interface Role {
  isHitler: boolean
  party: Party
}

export type RoomId = Opaque<'Game Id', string>

export type BoardEffects =
  | 'kill'
  | 'inspect role'
  | 'inspect cards'
  | 'choose president'

export interface Lobby {
  type: 'lobby'
  id: RoomId
  lobbyPlayers: Player[]
  victoryMessage?: string | null
}

export interface PreviousGovernment {
  president: PlayerGame
  chancellor: PlayerGame
}

export interface Government extends PreviousGovernment {
  cards: Party[]
  veto: boolean | null
}

export interface Game {
  type: 'game'
  id: RoomId
  lobbyPlayers: Player[]
  previousGovernment: PreviousGovernment | null
  government: Government | null
  performPower: PlayerGame | null
  players: PlayerGame[]
  discardedCards: Party[]
  remainingCards: Party[]
  playedCards: Party[]
  chaos: number
}

export type Room = Lobby | Game
