export interface GameResultPlayer {
  id: string
  role: string
}

export interface GameResult {
  date: number
  winners: GameResultPlayer[]
  losers: GameResultPlayer[]
  gameType: string
}
