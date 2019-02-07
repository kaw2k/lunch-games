import { SecretHitlerGame, Party } from '../interfaces/game'
import values from 'ramda/es/values'

export function isGameOver(game: SecretHitlerGame): Party | null {
  const isHitlerDead = !values(game.players).find(
    p => p.living && p.role.isHitler
  )
  const fascists = game.playedCards.filter(c => c === 'fascist').length
  const liberals = game.playedCards.filter(c => c === 'liberal').length

  if (isHitlerDead || liberals === 5) return 'liberal'
  if (fascists === 6) return 'fascist'

  return null
}
