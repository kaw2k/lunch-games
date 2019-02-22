import { WerewolfGame, NightPrompt } from '../interfaces/game'
import values from 'ramda/es/values'
import { getCard, Roles } from '../data/roles'
import uniq from 'ramda/es/uniq'
import sortBy from 'ramda/es/sortBy'
import { PlayerWerewolf } from '../interfaces/player'

export function startNight(game: WerewolfGame): NightPrompt[] {
  const currentRoles = values(game.players).reduce<Roles[]>((memo, p) => {
    memo = memo.concat(p.role)
    if (p.secondaryRole) memo = memo.concat(p.secondaryRole)
    return memo
  }, [])

  const roleOrder = sortBy(
    role => getCard(role).nightOrder,
    uniq([...game.initialRoles, ...currentRoles])
  )
  function sort(
    players: PlayerWerewolf[],
    key: keyof Pick<PlayerWerewolf, 'role' | 'secondaryRole'>
  ) {
    return sortBy(p => roleOrder.indexOf(p[key] as any), players)
  }

  const nonWerewolvesPrimary = values(game.players).filter(p => {
    const card = getCard(p.role)
    const isAlive = p.alive
    const notAWolf = card.team !== 'werewolves'
    const hasNightAction = !!card.NightModeratorView
    return isAlive && notAWolf && hasNightAction
  })

  const nonWerewolvesSecondary = values(game.players).filter(p => {
    if (!p.secondaryRole) return false
    const card = getCard(p.secondaryRole)
    const isAlive = p.alive
    const notAWolf = card.team !== 'werewolves'
    const hasNightAction = !!card.NightModeratorView
    return isAlive && notAWolf && hasNightAction
  })

  return [
    ...sort(nonWerewolvesPrimary, 'role').map(p => ({
      players: [p.id],
      role: p.role,
    })),
    ...sort(nonWerewolvesSecondary, 'secondaryRole').map(p => ({
      players: [p.id],
      role: p.role,
    })),
  ]

  // Normal roles
  // Secondary roles
  // Werewolf
  // Boogyman
}
