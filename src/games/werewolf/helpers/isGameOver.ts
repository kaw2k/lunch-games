import { WerewolfGame } from '../interfaces/game'
import { isWerewolf } from './isWerewolf'
import { count } from '../../../helpers/count'
import { setVictory } from './gameEngine'

export function isGameOver(game: WerewolfGame): WerewolfGame {
  const numWolves = count(game.players, p => isWerewolf(p, game))

  const badPeopleRemain = numWolves

  if (!badPeopleRemain)
    return setVictory(
      { team: 'villagers', message: 'The villager team wins!' },
      game
    )

  return game
}
