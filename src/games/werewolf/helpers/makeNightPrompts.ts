import { WerewolfGame } from '../interfaces/game'
import values from 'ramda/es/values'
import { isWerewolf, doesFangFaceWakeUp } from './isWerewolf'
import { getCard, Roles, hasRole, isRole } from '../interfaces/card/cards'
import { getGameRoles } from './getGameRoles'
import { getPlayerByRole } from './getPlayersByRole'
import { Prompts, ByTeam, ByMessage } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'
import { Werewolf } from '../interfaces/card/werewolf'
import { FangFace } from '../interfaces/card/fangFace'
import { Sasquatch } from '../interfaces/card/sasquatch'
import sortBy from 'ramda/es/sortBy'
import { NightMessageOrder } from '../interfaces/nightMessage'
import { assertNever } from '../../../helpers/assertNever'

function getWerewolves(game: WerewolfGame) {
  return values(game.players)
    .filter(p => {
      return (
        (isRole(p, FangFace.role) && doesFangFaceWakeUp(p, game)) ||
        (!isRole(p, FangFace.role) && isWerewolf(p, game))
      )
    })
    .map(p => p.id)
}

export function makeNightPrompts(game: WerewolfGame): Prompts[] {
  let prompts: Prompts[] = []

  // Check for sasquatch
  // ----------------------------
  if (hasRole(Sasquatch.role, game) && !game.killedAtDay.length) {
    const sasquatchPrompt: ByMessage = {
      id: Id(),
      type: 'by message',
      message: `No one died today, sasquatch has transformed into a werewolf`,
    }
    prompts = prompts.concat(sasquatchPrompt)
  }

  // Check for secondary roles
  // ----------------------------
  prompts = prompts.concat(
    values(game.players)
      .filter(p => p.alive && p.secondaryRole)
      .map<Prompts>(p => ({
        type: 'by name',
        id: Id(),
        player: p.id,
        role: p.secondaryRole as Roles,
      }))
  )

  // Check for primary roles
  // ----------------------------
  prompts = prompts.concat(
    getGameRoles(game)
      .filter(role => getCard(role).night && role !== 'werewolf')
      .map<Prompts>(role => {
        const p = getPlayerByRole(role, game)
        return {
          type: 'by role',
          id: Id(),
          player: p && p.id,
          role: role,
        }
      })
  )

  // Add any teams
  // ----------------------------
  const teams: ByTeam[] = [
    {
      id: Id(),
      type: 'by team',
      players: getWerewolves(game),
      role: Werewolf.role,
    },
  ]
  prompts = prompts.concat(teams)

  prompts = prompts.filter(prompt => {
    if (game.options.noFlip) return true

    if (
      prompt.type === 'by role' &&
      (!prompt.player || !game.players[prompt.player].alive)
    ) {
      return false
    }

    if (
      prompt.type === 'by name' &&
      (!prompt.player || !game.players[prompt.player].alive)
    ) {
      return false
    }

    if (prompt.type === 'by team') {
      return !!prompt.players.find(player => game.players[player].alive)
    }

    return true
  })

  prompts = sortBy(prompt => {
    if (prompt.type === 'by message') return NightMessageOrder.none
    if (prompt.type === 'by artifact') return NightMessageOrder.none
    if (prompt.type === 'by team') return NightMessageOrder.werewolf
    if (prompt.type === 'by role') return getCard(prompt.role).night!.order
    if (prompt.type === 'by name') return NightMessageOrder.last

    return assertNever(prompt)
  }, prompts)

  return prompts
}
