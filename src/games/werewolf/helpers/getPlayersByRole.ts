import { values } from 'ramda'
import { WerewolfGame } from '../interfaces/game'
import { Roles } from '../interfaces/card/cards'

export function getPlayersByRole(role: Roles, game: WerewolfGame) {
  return values(game.players).filter(p => p.role === role)
}

export function getPlayerByRole(role: Roles, game: WerewolfGame) {
  return values(game.players).find(p => p.role === role)
}
