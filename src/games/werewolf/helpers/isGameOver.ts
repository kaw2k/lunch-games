import { WerewolfGame } from '../interfaces/game'
import { isWerewolf } from './isWerewolf'
import { count } from '../../../helpers/count'
import { setVictory } from './gameEngine'
import values from 'ramda/es/values'
import contains from 'ramda/es/contains'
import pipe from 'ramda/es/pipe'
import { isRole } from '../interfaces/card/cards'
import all from 'ramda/es/all'

export function isGameOver(game: WerewolfGame): WerewolfGame {
  return pipe(
    isChewksWin,
    isWerewolfWin,
    isCultWin,
    isVillagerWin,
    isZombieWin
  )(game)
}

function isChewksWin(game: WerewolfGame): WerewolfGame {
  const living = values(game.players).filter(p => p.alive)
  const chewks = count(living, p => isRole(p, 'chewks'))

  if (chewks === 1 && living.length === 2) {
    return setVictory({ team: 'chewks', message: 'Chewks has won!' }, game)
  }

  return game
}

function isWerewolfWin(game: WerewolfGame): WerewolfGame {
  const living = values(game.players).filter(p => p.alive)
  const numWolves = count(living, p => isWerewolf(p, game))
  const nonWolves = living.length - numWolves
  const chewks = count(living, p => isRole(p, 'chewks'))

  if (!chewks && numWolves >= nonWolves) {
    return setVictory(
      { team: 'werewolves', message: 'The werewolves have won!' },
      game
    )
  }

  return game
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

function isZombieWin(game: WerewolfGame): WerewolfGame {
  const allEaten = all(
    player => player.areBrainsEaten || isRole(player, 'zombie'),
    values(game.players).filter(p => p.alive)
  )

  if (allEaten) {
    return setVictory(
      {
        message: `Everyone's brains have been eaten. Zombies win!`,
        team: 'zombie',
      },
      game
    )
  }

  return game
}
