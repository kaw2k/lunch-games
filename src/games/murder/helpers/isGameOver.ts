import { Party, MurderGame } from '../interfaces/game'

// Only the bad people have guesses left
// We are past round 3

export function isGameOver(game: MurderGame): Party | null {
  if (game.round === 'end') return 'bad'

  return null
}
