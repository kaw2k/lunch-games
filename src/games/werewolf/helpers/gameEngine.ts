import { WerewolfGame, Victory } from '../interfaces/game'
import { Actions, guard, linkKill } from '../interfaces/actions'
import { assertNever } from '../../../helpers/assertNever'
import sortBy from 'ramda/es/sortBy'
import pipe from 'ramda/es/pipe'
import { PlayerWerewolf } from '../interfaces/player'
import { curry, values } from 'ramda'
import { PlayerId } from '../../../interfaces/player'
import { getArtifact, AllArtifacts } from '../data/artifacts'
import { ArtifactState } from '../interfaces/artifact'
import { addAction, addDelayedAction } from './addAction'
import { DelayAction } from '../interfaces/delayAction'
import { clone } from '../../../helpers/clone'
import { makeNightPrompts } from './makeNightPrompts'
import map from 'ramda/es/map'

// ===========================================================
// THE GAME ENGINE
// Will execute actions along with stored actions
// ===========================================================
export function runActions(
  initialGame: WerewolfGame,
  initialActions: Actions[] = []
): WerewolfGame {
  let game: WerewolfGame = { ...initialGame }
  let remainingActions = game.actions.concat(initialActions)
  game.actions = []

  // Set a limit, just in case we hit some recursion...
  let count = 0
  const limit = 100

  while (remainingActions.length && count < limit) {
    remainingActions = sortBy(action => action.order, remainingActions)
    const action = remainingActions[0]
    remainingActions = remainingActions.slice(1)
    game = updateGame(action, game)
    remainingActions = remainingActions.concat(game.actions)
    game.actions = []
    count++
  }

  if (count === limit) alert('Something went wrong')

  return game
}

function updateGame(action: Actions, game: WerewolfGame): WerewolfGame {
  const player = game.players[action.target]

  // KILLING ACTIONS
  // Each of these if statements are just pre-processors.
  // There is one catch all if at the bottom of this block
  // which does the actual killing.
  // -----------------------------------------------------------
  if (action.type === 'vote kill') {
    if (player.role === 'tanner') {
      return setVictory(
        {
          team: 'tanner',
          message: `${player.name} was the tanner and was lynched. ${
            player.name
          } wins!`,
        },
        game
      )
    }

    // TODO: Add message for mayor not dieing
    if (player.role === 'mayor') {
      return game
    }
  }

  if (action.type === 'werewolf kill') {
    if (player.isGuarded) {
      return game
    }

    if (player.isBlessed) {
      return updateWerewolfPlayer(player.id, { isBlessed: 'attacked' }, game)
    }

    if (isCursed(player, game)) {
      return updateWerewolfPlayer(player.id, { role: 'werewolf' }, game)
    }
  }

  if (action.type === 'link kill') {
    if (player.isGuarded) {
      return game
    }

    if (player.isBlessed) {
      return updateWerewolfPlayer(player.id, { isBlessed: 'attacked' }, game)
    }
  }

  // INTERNAL KILLING ACTION
  // All of the kill actions should be here
  // -----------------------------------------------------------
  if (
    action.type === 'sudo kill' ||
    action.type === 'link kill' ||
    action.type === 'werewolf kill' ||
    action.type === 'vote kill'
  ) {
    return killPlayer(action.target, action, game)
  }

  // MISC ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'update player') {
    return updateWerewolfPlayer(player.id, action.updates, game)
  }

  if (action.type === 'bless') {
    return updateWerewolfPlayer(player.id, { isBlessed: action.source }, game)
  }

  if (action.type === 'guard') {
    return updateWerewolfPlayer(player.id, { isGuarded: true }, game)
  }

  if (action.type === 'indoctrinate') {
    console.log('=================', action)
    return updateWerewolfPlayer(
      player.id,
      { inCult: player.inCult.concat(action.source) },
      game
    )
  }

  // SETUP ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'link player') {
    return updateWerewolfPlayer(
      action.source,
      player => ({
        linkedTo: player.linkedTo.concat(action.target),
      }),
      game
    )
  }

  // ARTIFACT ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'scepter of rebirth') {
    const artifact = player.artifacts.find(a => a.type === 'scepter of rebirth')
    if (!artifact || artifact.activated) return game

    return pipe(
      destroyArtifact(player.id, artifact.type),
      updateWerewolfPlayer(player.id, { alive: true })
    )(game)
  }

  // MODERATOR ACTIONS
  // -----------------------------------------------------------

  // FALL THROUGH
  // -----------------------------------------------------------
  return assertNever(action)
}

// ===========================================================
// MOVE THESE TO THEIR OWN FILES
// ===========================================================
// Things that need to happen to the game before night starts
export function startNight(initialGame: WerewolfGame): WerewolfGame {
  let game = clone(initialGame)

  game.night.prompts = makeNightPrompts(game)
  game.night.kills = []
  game = processQueuedActions(game)

  return game
}

// Things that need to happen to the game before day starts
export function startDay(initialGame: WerewolfGame): WerewolfGame {
  let game = clone(initialGame)
  game.dayCount = game.dayCount + 1
  game = processQueuedActions(game)
  game.players = map(
    player => ({
      ...player,
      isBlessed: player.isBlessed === 'attacked' ? false : player.isBlessed,
      isGuarded: false,
    }),
    game.players
  )

  return game
}

function processQueuedActions(initialGame: WerewolfGame): WerewolfGame {
  let game = clone(initialGame)

  type ReduceResult = {
    moveToActions: WerewolfGame['actions']
    moveToDelayedActions: WerewolfGame['delayedActions']
  }
  const { moveToActions, moveToDelayedActions } = game.delayedActions.reduce<
    ReduceResult
  >(
    ({ moveToActions, moveToDelayedActions }, action) => {
      if (action.day === game.dayCount && action.time === 'night') {
        return {
          moveToActions: moveToActions.concat(action.action),
          moveToDelayedActions:
            action.occurrence === 'recurring'
              ? moveToDelayedActions.concat(action)
              : moveToDelayedActions,
        }
      } else {
        return {
          moveToActions,
          moveToDelayedActions: moveToDelayedActions.concat(action),
        }
      }
    },
    { moveToActions: [], moveToDelayedActions: [] }
  )

  game.actions = game.actions.concat(moveToActions)
  game.delayedActions = moveToDelayedActions

  return game
}

// ===========================================================
// PRIVATE HELPER FUNCTIONS
// ===========================================================
function isCursed(player: PlayerWerewolf, game: WerewolfGame): boolean {
  const cursedArtifact = player.artifacts.find(
    a => a.type === 'skimmer of the cursed'
  )

  return (
    player.role === 'cursed' ||
    player.secondaryRole === 'cursed' ||
    !!(
      cursedArtifact &&
      (cursedArtifact.activated || game.options.cursedArtifactAlwaysActive)
    )
  )
}

// TODO: When you add diseased, modify this
function isDiseased(player: PlayerWerewolf, game: WerewolfGame): boolean {
  const diseasedArtifact = player.artifacts.find(
    a => a.type === 'blood of the diseased'
  )
  return !!(diseasedArtifact && diseasedArtifact.activated)
}

const killPlayer = curry(
  (
    playerId: PlayerId,
    actionType: Actions,
    game: WerewolfGame
  ): WerewolfGame => {
    const player = game.players[playerId]
    if (!player || !player.alive) return game

    let actions: Actions[] = []
    let delayedActions: DelayAction<Actions>[] = []

    // If the player is linked, kill them as well
    actions = actions.concat(
      player.linkedTo.map(id => linkKill({ target: id }))
    )

    // If they are the cult leader, kill the cult
    if (game.options.killCult && player.role === 'cult leader') {
      values(game.players).forEach(cultMember => {
        if (cultMember.inCult.find(id => id == player.id)) {
          actions = actions.concat(linkKill({ target: cultMember.id }))
        }
      })
    }

    // If they were diseased, respond accordingly
    if (isDiseased(player, game) && actionType.type === 'werewolf kill') {
      const actions = values(game.players).reduce<DelayAction<Actions>[]>(
        (memo, player) => {
          const action: DelayAction<Actions> = {
            time: 'night',
            occurrence: 'once',
            day: game.dayCount + 1,
            action: guard({ target: player.id }),
          }

          return memo.concat(action)
        },
        []
      )

      delayedActions = delayedActions.concat(actions)
    }

    return pipe(
      // Propagate actions
      addAction(actions),
      addDelayedAction(delayedActions),
      // Kill them
      updateWerewolfPlayer(playerId, { alive: false }),
      // Activate artifacts they had with post death actions
      _game =>
        player.artifacts.reduce<WerewolfGame>((game, artifactState) => {
          const artifact = getArtifact(artifactState.type as AllArtifacts)

          if (!artifact.actions.postDeathAction) return game

          return artifact.actions.postDeathAction(
            artifactState,
            actionType,
            player,
            game
          )
        }, _game)
    )(game)
  }
)

// const activateArtifact = curry(
//   (playerId: PlayerId, artifact: string, game: WerewolfGame): WerewolfGame => {
//     return updateWerewolfPlayer(
//       playerId,
//       player => ({
//         artifacts: player.artifacts.map(a =>
//           a.type === artifact ? { ...a, activated: true } : a
//         ),
//       }),
//       game
//     )
//   }
// )

const destroyArtifact = curry(
  (target: PlayerId, artifact: string, game: WerewolfGame): WerewolfGame => {
    return updateWerewolfPlayer(
      target,
      player => ({
        artifacts: player.artifacts.filter(a => a.type !== artifact),
      }),
      game
    )
  }
)

// const passArtifact = curry(
//   (
//     source: PlayerId,
//     target: PlayerId,
//     artifact: AllArtifacts,
//     game: WerewolfGame
//   ): WerewolfGame => {
//     const state = game.players[source].artifacts.find(a => a.type === artifact)
//     if (!state) return game

//     return pipe(
//       destroyArtifact(source, artifact),
//       giveArtifact(target, state)
//     )(game)
//   }
// )

// const setGameProps = curry(
//   (
//     props:
//       | Partial<WerewolfGame>
//       | ((game: WerewolfGame) => Partial<WerewolfGame>),
//     game: WerewolfGame
//   ): WerewolfGame => {
//     return {
//       ...game,
//       ...(typeof props === 'function' ? props(game) : props),
//     }
//   }
// )

const setVictory = curry(
  (victory: Victory, game: WerewolfGame): WerewolfGame => {
    return {
      ...game,
      victory: game.victory || victory,
    }
  }
)

const updateWerewolfPlayer = curry(
  (
    playerId: PlayerId,
    props:
      | Partial<PlayerWerewolf>
      | ((p: PlayerWerewolf) => Partial<PlayerWerewolf>),
    game: WerewolfGame
  ): WerewolfGame => {
    return {
      ...game,
      players: {
        ...game.players,
        [playerId]: {
          ...game.players[playerId],
          ...(typeof props === 'function'
            ? props(game.players[playerId])
            : props),
        },
      },
    }
  }
)

export const giveArtifact = curry(
  (
    target: PlayerId,
    artifact: ArtifactState,
    game: WerewolfGame
  ): WerewolfGame => {
    return updateWerewolfPlayer(
      target,
      player => ({
        artifacts: player.artifacts.concat(artifact),
      }),
      game
    )
  }
)
