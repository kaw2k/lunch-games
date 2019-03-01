import { WerewolfGame } from '../interfaces/game'
import { isWerewolf } from './isWerewolf'
import { count } from '../../../helpers/count'
import { setVictory } from './gameEngine'
import { isRole } from './isRole'
import values from 'ramda/es/values'
import contains from 'ramda/es/contains'
import pipe from 'ramda/es/pipe'

export function isGameOver(game: WerewolfGame): WerewolfGame {
  return pipe(
    isCultWin,
    isVillagerWin
  )(game)
}

function isVillagerWin(game: WerewolfGame): WerewolfGame {
  const living = values(game.players).filter(p => p.alive)
  const numWolves = count(living, p => isWerewolf(p, game))
  const numChewks = count(living, p => isRole(p, 'chewks'))

  const badPeopleRemain = numWolves + numChewks

  if (!badPeopleRemain) {
    return setVictory(
      { team: 'villagers', message: 'The villager team wins!' },
      game
    )
  }

  return game
}

function isCultWin(game: WerewolfGame): WerewolfGame {
  for (let player of values(game.players)) {
    if (!isRole(player, 'cult leader')) continue

    const livingPlayers = values(game.players).filter(p => p.alive)
    const cultMembers = count(livingPlayers, p => contains(player.id, p.inCult))

    if (cultMembers === livingPlayers.length - 1)
      return setVictory(
        {
          message: `${player.name || player.id} is the cult leader and wins`,
          team: 'cult leader',
        },
        game
      )
  }

  return game
}
