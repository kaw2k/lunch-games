import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { PlayerWerewolf } from '../interfaces/player'
import { Roles, Cards, getCard } from '../interfaces/card/cards'
import { getWeight } from './getWeight'
import { isWerewolf } from './isWerewolf'
import { count } from '../../../helpers/count'
import { shuffle } from '../../../helpers/shuffle'
import { sortBy } from 'ramda'

function getGameWeight(players: PlayerWerewolf[]): number {
  const livingRoles = players
    .filter(p => p.alive)
    .reduce<Roles[]>((memo, p) => {
      memo = memo.concat(p.role)
      if (p.secondaryRole) memo = memo.concat(p.secondaryRole)
      return memo
    }, [])

  return getWeight(livingRoles)
}

// This is a dumpster fire
export function getNewRole(player: PlayerWerewolf, game: WerewolfGame): Roles {
  const currentGameWeight = getGameWeight(
    values(game.players).filter(p => p.id !== player.id)
  )

  // The overall card list that we can select from
  // Remove all cards that are already maxed out or
  // are otherwise not selectable
  const possibleCards = Cards.filter(card => {
    const numberOfCardInGame = count(
      game.players,
      player => player.role === card.role
    )
    const isCardMaxedOut = numberOfCardInGame === card.cardCount

    return card.randomlySelectable && !isCardMaxedOut
  })

  function getRole(roles: Roles[]): Roles {
    return shuffle(
      sortBy(
        ([role, delta]) => Math.abs(delta),
        roles.map<[Roles, number]>(role => {
          return [role, currentGameWeight + getCard(role).weight]
        })
      ).slice(0, 3)
    )[0][0]
  }

  // We want to make sure werewolves stay on the same team
  if (isWerewolf(player, game)) {
    return getRole(
      possibleCards
        .filter(card => {
          return card.team === 'werewolves' || card.team === 'werewolves allies'
        })
        .map(card => card.role)
    )
  } else {
    return getRole(
      possibleCards
        .filter(card =>
          currentGameWeight < 0 ? card.weight > 0 : card.weight < 0
        )
        .map(card => card.role)
    )
  }
}
