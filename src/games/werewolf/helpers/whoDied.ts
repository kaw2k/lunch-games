import { WerewolfGame } from '../interfaces/game'
import { PlayerId } from '../../../interfaces/player'
import values from 'ramda/es/values'

export function whoDied(
  initialGame: WerewolfGame,
  deltaGame: WerewolfGame
): PlayerId[] {
  return values(deltaGame.players)
    .filter(p => !p.alive && initialGame.players[p.id].alive)
    .map(p => p.id)
}
