import { SecretHitlerGame } from '../interfaces/game'
import { shuffle } from '../../helpers/shuffle'

export function sanitizeCards(game: SecretHitlerGame): SecretHitlerGame {
  if (game.remainingCards.length < 3) {
    return {
      ...game,
      discardedCards: [],
      remainingCards: shuffle([...game.discardedCards, ...game.remainingCards]),
    }
  }

  return game
}
