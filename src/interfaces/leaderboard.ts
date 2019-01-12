import { SecretHitlerGame } from '../secret-hitler/interfaces/game'
import { AvalonGame } from '../avalon/interfaces/game'

export interface GameResultPlayer {
  id: string
  role: string
}

export interface GameResult {
  date: number
  winners: GameResultPlayer[]
  losers: GameResultPlayer[]
  gameType: SecretHitlerGame['type'] | AvalonGame['type']
}
