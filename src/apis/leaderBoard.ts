import { database } from '../helpers/firebase'
import { GameResult } from '../interfaces/leaderBoard'

export function addLeaderBoard(game: GameResult) {
  database.leaderBoard.add(game)
}
