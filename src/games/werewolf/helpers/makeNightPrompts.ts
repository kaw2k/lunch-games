import { WerewolfGame, NightPrompt } from '../interfaces/game'
import values from 'ramda/es/values'
import { getCard, Roles } from '../data/roles'
import uniq from 'ramda/es/uniq'
import sortBy from 'ramda/es/sortBy'
import { isWerewolf } from './isWerewolf'
import { PlayerId } from '../../../interfaces/player'

export function makeNightPrompts(game: WerewolfGame): NightPrompt[] {
  function getPlayers(role: Roles): PlayerId[] {
    return values(game.players)
      .filter(p => p.alive && p.role === role)
      .map(p => p.id)
  }

  const currentRoles = values(game.players).reduce<Roles[]>((memo, p) => {
    memo = memo.concat(p.role)
    if (p.secondaryRole) memo = memo.concat(p.secondaryRole)
    return memo
  }, [])

  const roles = sortBy(
    role => getCard(role).nightOrder,
    uniq([...game.initialRoles, ...currentRoles])
  ).filter(role => getCard(role).team !== 'werewolves')

  const werewolves = values(game.players)
    .filter(p => {
      return p.alive && isWerewolf(p, game)
    })
    .map(p => p.id)

  const playersWithSecondaryRoles = values(game.players).filter(p => {
    return p.alive && p.secondaryRole
  })

  return [
    ...roles.map<NightPrompt>(role => ({
      type: 'primary',
      players: getPlayers(role),
      role,
    })),
    ...playersWithSecondaryRoles.map<NightPrompt>(p => ({
      type: 'secondary',
      players: [p.id],
      role: p.secondaryRole,
    })),
    {
      players: werewolves,
      role: 'werewolf',
      type: 'primary',
    },
  ]

  // ORDERING
  // --------
  // Normal roles
  // Secondary roles
  // Werewolf
  // Boogyman
}
