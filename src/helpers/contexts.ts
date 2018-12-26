import { createContext } from 'react'
import { Game } from '../interfaces/game'
import { PlayerGame } from '../interfaces/player'

interface Context {
  game: Game
  player: PlayerGame
  updateGame: (game: Partial<Game>) => void
  endGame: (message?: unknown) => void
}

export const GameContext = createContext<Context>({
  updateGame() {},
  endGame() {},
  game: {} as Game,
  player: {} as PlayerGame,
})
