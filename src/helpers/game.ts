import { BoardEffects, Party, Game } from '../interfaces/game'
import { PlayerGame, Player, PlayerId } from '../interfaces/player'
import { shuffle } from './shuffle'

export const Cards: Party[] = [
  'liberal',
  'liberal',
  'liberal',
  'liberal',
  'liberal',
  'liberal',

  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
  'fascist',
]

export function getBoardEffect(
  numPlayers: number | PlayerGame[],
  numFascists: number | Party[]
): BoardEffects | null {
  numPlayers = typeof numPlayers === 'number' ? numPlayers : numPlayers.length

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

export function assignRoles(players: Player[]): PlayerGame[] {
  const [hitler, ...rest] = shuffle(players)
  const numFascists = players.length <= 6 ? 1 : players.length <= 8 ? 2 : 3
  return shuffle<PlayerGame>([
    {
      ...hitler,
      living: true,
      ready: false,
      role: {
        isHitler: true,
        party: 'fascist',
      },
    },
    ...rest.slice(0, numFascists).map<PlayerGame>(player => ({
      ...player,
      living: true,
      ready: false,
      role: {
        isHitler: false,
        party: 'fascist',
      },
    })),
    ...rest.slice(numFascists).map<PlayerGame>(player => ({
      ...player,
      living: true,
      ready: false,
      role: {
        isHitler: false,
        party: 'liberal',
      },
    })),
  ])
}

export function sanitizeCards(game: Game): Game {
  if (game.remainingCards.length < 3) {
    return {
      ...game,
      discardedCards: [],
      remainingCards: shuffle([...game.discardedCards, ...game.remainingCards]),
    }
  }

  return game
}

export function updatePlayer(
  game: Game,
  id: PlayerId,
  props: Partial<PlayerGame>
): Game {
  return {
    ...game,
    players: game.players.map(p => (p.id === id ? { ...p, ...props } : p)),
  }
}

export function isGameOver(game: Game): Party | null {
  const isHitlerDead = !game.players.find(p => p.living && p.role.isHitler)
  const fascists = game.playedCards.filter(c => c === 'fascist').length
  const liberals = game.playedCards.filter(c => c === 'liberal').length

  if (isHitlerDead || liberals === 6) return 'liberal'
  if (fascists === 6) return 'fascist'
  return null
}
