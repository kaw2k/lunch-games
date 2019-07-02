import { Player, PlayerId } from '../../../interfaces/player'
import { RoomId, Lobby } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { Omit } from '@material-ui/core'
import { Id } from '../../../helpers/id'
import { shuffle } from '../../../helpers/shuffle'
import { clone } from '../../../helpers/clone'
import values from 'ramda/es/values'
import { Opaque } from '../../../interfaces/opaque'

export type SkullCardId = Opaque<'skull card id', Id>
export type SkullCardType = 'skull' | 'flower'
export interface SkullCard {
  id: SkullCardId
  type: SkullCardType
}

export function SkullCard(type: SkullCardType): SkullCard {
  return {
    id: Id() as SkullCardId,
    type,
  }
}

export interface PlayerSkull extends Player {
  correctGuess: boolean
  cards: SkullCard[]
  playedCards: SkullCard[]
  playerOnLeft: PlayerId
  pass: boolean
}

export interface SkullLobby extends Omit<Lobby, 'type'> {
  type: 'skull-lobby'
  seatingChart: PlayerId[]
}

export interface Bidding {
  type: 'round-bidding'
  activePlayer: PlayerId
  highestBidPlayer: PlayerId | null
  bid: number
}

export interface Resolution {
  type: 'round-resolution'
  bid: number
  flippedCards: number
  highestBidPlayer: PlayerId
  messages: string[]
  next?: PlayerId | 'next round'
}

export interface Discard {
  type: 'round-discard'
  highestBidPlayer: PlayerId
  activePlayer: PlayerId
}

export interface SkullGame {
  type: 'skull-game'
  id: RoomId
  message: null | string
  lobbyPlayers: Player[]
  players: Hash<PlayerSkull>
  state: Bidding | Resolution | Discard
  seatingChart: PlayerId[]
}

export type Skull = SkullGame | SkullLobby

export function makeGame(lobby: SkullLobby): SkullGame {
  return {
    id: lobby.id,
    lobbyPlayers: lobby.lobbyPlayers,
    message: null,
    type: 'skull-game',
    seatingChart: lobby.seatingChart,
    state: {
      type: 'round-bidding',
      activePlayer: shuffle(lobby.lobbyPlayers)[0].id,
      bid: 0,
      highestBidPlayer: null,
    },
    players: lobby.lobbyPlayers.reduce<Hash<PlayerSkull>>(
      (memo, p, i) => ({
        ...memo,
        [p.id]: {
          ...p,
          cards: [
            SkullCard('skull'),
            SkullCard('flower'),
            SkullCard('flower'),
            SkullCard('flower'),
          ],
          playedCards: [],
          playerOnLeft: null as any,
          bid: 0,
          pass: false,
          correctGuess: false,
        },
      }),
      {}
    ),
  }
}

export function startBidding(
  initialGame: SkullGame,
  startingPlayer?: PlayerId
): SkullGame {
  let game = clone(initialGame)

  const activePlayers = values(game.players).filter(p => p.cards.length)

  values(game.players).forEach(player => {
    game.players[player.id] = {
      ...player,
      pass: false,
      cards: player.cards.concat(player.playedCards),
      playedCards: [],
    }
  })

  game.state = {
    type: 'round-bidding',
    activePlayer: startingPlayer || shuffle(activePlayers)[0].id,
    highestBidPlayer: null,
    bid: 0,
  }

  return game
}

export function startResolution(initialGame: SkullGame): SkullGame {
  let game = clone(initialGame)

  if (game.state.type !== 'round-bidding' || !game.state.highestBidPlayer)
    throw game

  game.state = {
    type: 'round-resolution',
    bid: game.state.bid,
    highestBidPlayer: game.state.highestBidPlayer,
    flippedCards: 0,
    messages: [],
  }

  return game
}

export function numPlayedCards(game: SkullGame): number {
  return values(game.players).reduce((memo, player) => {
    return memo + player.playedCards.length
  }, 0)
}

export const everyonePlayed = (game: SkullGame): boolean => {
  const livingPlayers = values(game.players).filter(
    p => p.cards.length + p.playedCards.length > 0
  )
  return livingPlayers.reduce<boolean>(
    (memo, p) => memo && p.playedCards.length > 0,
    true
  )
}

export const getNextPlayer = (
  game: SkullGame,
  startingPlayer: PlayerSkull,
  pred?: (player: PlayerSkull) => boolean
): PlayerSkull => {
  const isAlive = (player: PlayerSkull) =>
    !!player.cards.length || !!player.playedCards.length

  if (!isAlive(startingPlayer)) throw null

  let next = game.players[startingPlayer.playerOnLeft]

  while (!isAlive(next) && (pred ? !pred(next) : true)) {
    next = game.players[next.playerOnLeft]
  }

  if (next.id === startingPlayer.id) throw null

  return next
}
