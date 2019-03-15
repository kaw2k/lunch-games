import { WerewolfGame, Victory } from '../interfaces/game'
import {
  Actions,
  guard,
  linkKill,
  scepterOfRebirth,
  updatePlayer,
  revivePlayer,
  rodOfReincarnation,
  werewolfKill,
} from '../interfaces/actions'
import { assertNever } from '../../../helpers/assertNever'
import sortBy from 'ramda/es/sortBy'
import pipe from 'ramda/es/pipe'
import { PlayerWerewolf } from '../interfaces/player'
import { curry, values } from 'ramda'
import { PlayerId } from '../../../interfaces/player'
import { addAction, addDelayedAction } from './addAction'
import { DelayAction } from '../interfaces/delayAction'
import { clone } from '../../../helpers/clone'
import { makeNightPrompts } from './makeNightPrompts'
import map from 'ramda/es/map'
import {
  getArtifact,
  ArtifactState,
  Artifacts,
} from '../interfaces/artifact/artifacts'
import { count } from '../../../helpers/count'
import { isWerewolf } from './isWerewolf'
import { isRole, getCard } from '../interfaces/card/cards'
import { Prompts } from '../interfaces/prompt'
import { Id } from '../../../helpers/id'
import { playerName } from '../../../components/playerName'
import { getNeighbor } from './neighbors'
import { getNewRole } from './getNewRole'

// ===========================================================
// THE GAME ENGINE
// Will execute actions along with stored actions
// ===========================================================
export function runActions(
  initialGame: WerewolfGame,
  initialActions: Actions[] = []
): WerewolfGame {
  let game: WerewolfGame = { ...initialGame }
  game.actions = game.actions.concat(initialActions)

  // Set a limit, just in case we hit some recursion...
  let count = 0
  const limit = 100

  while (game.actions.length && count < limit) {
    game.actions = sortBy(action => action.order, game.actions)
    const action = game.actions[0]
    game.actions = game.actions.slice(1)
    game = performAction(action, game)
    count++
  }

  if (count === limit) alert('Something went wrong')

  return game
}

function performAction(action: Actions, game: WerewolfGame): WerewolfGame {
  if (action.type === 'end game') {
    return setVictory(
      {
        message: action.message,
        team: action.team,
      },
      game
    )
  }

  if (action.type === 'add action') {
    return addAction(action.action, game)
  }

  if (action.type === 'add delayed action') {
    return addDelayedAction(action.delayedAction, game)
  }

  if (action.type === 'show prompts') {
    return updateGame(
      {
        prompts: {
          ...game.prompts,
          items: game.prompts.items.concat(action.prompts || []),
          show: true,
        },
      },
      game
    )
  }

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

    if (player.role === 'prince') {
      return addPrompt(
        {
          id: Id(),
          type: 'by message',
          message: `The villagers tried to lynch ${playerName(
            player
          )} but they are the mayor and can't be lynched.`,
        },
        game
      )
    }
  }

  if (action.type === 'chewks kill') {
    const wolvesRemain = count(game.players, p => isWerewolf(p, game))
    const isWolf = isWerewolf(player, game)

    if (wolvesRemain && !isWolf) return game

    if (!wolvesRemain || (isWolf && game.options.protectWolves)) {
      if (player.isGuarded) {
        return game
      }

      if (player.isBlessed) {
        return updateWerewolfPlayer(player.id, { isBlessed: 'attacked' }, game)
      }
    }
  }

  if (action.type === 'werewolf kill') {
    if (player.isGuarded) {
      return game
    }

    if (player.isBlessed) {
      return updateWerewolfPlayer(player.id, { isBlessed: 'attacked' }, game)
    }

    if (isCursed(player, game) || player.markedByAlphaWolf) {
      return pipe(
        updateWerewolfPlayer(player.id, { role: 'werewolf' }),
        addPrompt({
          id: Id(),
          type: 'by message',
          message: `SECRET: ${playerName(
            player
          )} was attacked by the werewolves and transformed into one.`,
        })
      )(game)
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
    action.type === 'chewks kill' ||
    action.type === 'vote kill' ||
    action.type === 'artifact kill'
  ) {
    const hasAmulet = !!player.artifacts.find(
      a => a.type === 'amulet of protection' && a.activated === 'played'
    )

    return hasAmulet ? game : killPlayer(action.target, action, game)
  }

  // MISC ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'update player') {
    return updateWerewolfPlayer(player.id, action.updates as any, game)
  }

  if (action.type === 'bless') {
    return updateWerewolfPlayer(player.id, { isBlessed: action.source }, game)
  }

  if (action.type === 'guard') {
    return updateWerewolfPlayer(player.id, { isGuarded: true }, game)
  }

  if (action.type === 'indoctrinate') {
    return updateWerewolfPlayer(
      player.id,
      { inCult: player.inCult.concat(action.source) },
      game
    )
  }

  if (action.type === 'leprechaun diversion') {
    return pipe(
      updateGame(game => ({
        actions: game.actions.filter(a => a.id !== action.actionId),
      })),
      addAction(werewolfKill({ target: action.target }))
    )(game)
  }

  // SETUP ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'copy player') {
    return updateWerewolfPlayer(
      action.target,
      { copiedBy: action.source },
      game
    )
  }

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
  if (action.type === 'update artifact') {
    return updateArtifact(action.target, action.artifact, action.updates, game)
  }

  if (action.type === 'pass artifact') {
    return passArtifact(action.source, action.target, action.artifact, game)
  }

  if (action.type === 'destroy artifact') {
    return destroyArtifact(action.target, action.artifact, game)
  }

  if (action.type === 'give artifact') {
    return giveArtifact(action.target, action.artifact, game)
  }

  if (action.type === 'scepter of rebirth') {
    const artifact = player.artifacts.find(a => a.type === 'scepter of rebirth')
    if (!artifact || artifact.activated === 'played') return game

    return pipe(
      addPrompt({
        type: 'by message',
        id: Id(),
        message: `${player.name || player.id} came back to life`,
        player: player.id,
      }),
      updateArtifact(player.id, artifact.type, { activated: 'played' }),
      addAction([revivePlayer({ target: player.id })])
    )(game)
  }

  if (action.type === 'rod of reincarnation') {
    const artifact = player.artifacts.find(
      a => a.type === 'rod of reincarnation'
    )
    if (!artifact || artifact.activated === 'played') return game

    return pipe(
      addPrompt({
        type: 'by message',
        id: Id(),
        message: `${player.name ||
          player.id} came back to life with a new role!`,
        player: player.id,
      }),
      updateArtifact(player.id, artifact.type, { activated: 'played' }),
      addAction([
        revivePlayer({ target: player.id }),
        updatePlayer({
          target: action.target,
          updates: {
            role: 'villager',
            secondaryRole: getNewRole(player, game),
          },
        }),
      ])
    )(game)
  }

  // MODERATOR ACTIONS
  // -----------------------------------------------------------
  if (action.type === 'revive player') {
    game = updateWerewolfPlayer(action.target, { alive: true }, game)

    if (player.copiedBy) {
      game = updateWerewolfPlayer(
        player.copiedBy,
        { role: 'doppleganger' },
        game
      )
    }

    return game
  }

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

  game.time = 'night'

  const numberOfCubsKilled = [...game.killedAtDay, ...game.killedAtDawn].filter(
    pid => isRole(game.players[pid], 'wolf cub')
  ).length

  game.numberOfPeopleToKill = game.numberOfPeopleToKill + numberOfCubsKilled
  game.killedAtDawn = []

  game.timer = Date.now()

  game.playerInteraction = {
    actions: [],
    ready: false,
  }

  game.players = map(
    player => ({
      ...player,
      role:
        isRole(player, 'sasquatch') && !game.killedAtDay.length
          ? 'werewolf'
          : player.role,
      artifacts: player.artifacts.map(a => ({
        ...a,
        performedMorningAction: false,
      })),
    }),
    game.players
  )

  const prompts = makeNightPrompts(game)
  game.prompts = {
    items: prompts.slice(1),
    active: prompts[0],
    show: true,
  }

  return processQueuedActions(game)
}

// Things that need to happen to the game before day starts
export function startDay(initialGame: WerewolfGame): WerewolfGame {
  let game = clone(initialGame)
  game.numberOfPeopleToKill = 1
  game.time = 'day'
  game.prompts = { items: [], active: null, show: false }
  game.playerInteraction = { actions: [], ready: false }
  game.killedAtNight = []
  game.timer = Date.now()
  values(game.players).forEach(player => {
    game.players[player.id].isBlessed =
      player.isBlessed === 'attacked' ? false : player.isBlessed || false

    game.players[player.id].isGuarded = false

    if (player.markedByAlphaWolf && !isWerewolf(player, game)) {
      game.players[player.id].markedByAlphaWolf = false
    }
  })

  game = runActions(processQueuedActions(game))

  return game
}

export function startDawn(initialGame: WerewolfGame): WerewolfGame {
  let game = runActions(initialGame)

  let prompts: Prompts[] = []

  for (let player of values(game.players)) {
    for (let artifact of player.artifacts) {
      if (
        player.alive &&
        artifact.activated == 'played' &&
        !!getArtifact(artifact.type).MorningView
      ) {
        prompts.push({
          id: Id(),
          type: 'by artifact',
          artifact: artifact,
          player: player.id,
        })
      }
    }
  }

  game.time = 'dawn'
  game.day = game.day + 1
  game.playerInteraction = {
    ready: false,
    actions: [],
  }
  game.killedAtDay = []
  game.prompts = {
    items: game.prompts.items.concat(prompts),
    active: null,
    show: true,
  }

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
      if (action.day === game.day && action.time === game.time) {
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
    isRole(player, 'cursed') ||
    !!(
      cursedArtifact &&
      (cursedArtifact.activated === 'played' ||
        game.options.cursedArtifactAlwaysActive)
    )
  )
}

function isDiseased(player: PlayerWerewolf, game: WerewolfGame): boolean {
  const diseasedArtifact = player.artifacts.find(
    a => a.type === 'blood of the diseased' && a.activated === 'played'
  )
  return isRole(player, 'diseased') || !!diseasedArtifact
}

const killPlayer = curry(
  (
    playerId: PlayerId,
    actionType: Actions,
    initialGame: WerewolfGame
  ): WerewolfGame => {
    let game = clone(initialGame)

    const player = game.players[playerId]
    if (!player || !player.alive) return game

    // If they were linked to people, kill them too
    game = addAction(player.linkedTo.map(id => linkKill({ target: id })), game)

    // If they are the cult leader, kill the cult
    if (game.options.killCult && player.role === 'cult leader') {
      values(game.players).forEach(cultMember => {
        if (cultMember.inCult.find(id => id == player.id)) {
          game = addAction(linkKill({ target: cultMember.id }), game)
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
            day: game.day + 1,
            action: guard({ target: player.id }),
          }

          return memo.concat(action)
        },
        []
      )

      game = addDelayedAction(actions, game)
    }

    if (isRole(player, 'mad bomber')) {
      const gaps = game.options.madBomberOnlyKillsAdjacent
        ? 'allow-gaps'
        : 'skip-gaps'

      const onLeft = getNeighbor(player.id, 'left', gaps, game)
      if (onLeft) game = addAction(linkKill({ target: onLeft }), game)

      const onRight = getNeighbor(player.id, 'right', gaps, game)
      if (onRight) game = addAction(linkKill({ target: onRight }), game)
    }

    if (player.copiedBy) {
      game = addAction(
        updatePlayer({
          target: player.copiedBy,
          updates: {
            role: player.role,
          },
        }),
        game
      )
    }

    // Kill the player
    game = updateWerewolfPlayer(playerId, { alive: false }, game)

    // Add it to our kill list
    game = updateGame(
      game.time === 'dawn'
        ? { killedAtDawn: game.killedAtDawn.concat(playerId) }
        : game.time === 'day'
        ? { killedAtDay: game.killedAtDay.concat(playerId) }
        : game.time === 'night'
        ? { killedAtNight: game.killedAtNight.concat(playerId) }
        : {},
      game
    )

    // Perform any last minute artifacts
    player.artifacts.forEach(artifactState => {
      const artifact = getArtifact(artifactState.type)

      if (
        artifactState.activated === 'unplayed' &&
        artifact.type === 'scepter of rebirth'
      ) {
        game = addAction(scepterOfRebirth({ target: player.id }), game)
      }

      if (
        artifactState.activated === 'unplayed' &&
        artifact.type === 'rod of reincarnation'
      ) {
        game = addAction(rodOfReincarnation({ target: player.id }), game)
      }
    }, game)

    // Add any death prompts
    const primary = getCard(player.role)
    if (primary.OnDeathView) {
      game = addPrompt(
        {
          type: 'by role',
          role: primary.role,
          id: Id(),
          player: player.id,
        },
        game
      )
    }
    const secondary = player.secondaryRole && getCard(player.secondaryRole)
    if (secondary && primary.OnDeathView) {
      game = addPrompt(
        {
          type: 'by role',
          role: secondary.role,
          id: Id(),
          player: player.id,
        },
        game
      )
    }

    return game
  }
)

const updateArtifact = curry(
  (
    playerId: PlayerId,
    artifact: Artifacts,
    state: Partial<ArtifactState>,
    game: WerewolfGame
  ): WerewolfGame => {
    return updateWerewolfPlayer(
      playerId,
      player => ({
        artifacts: player.artifacts.map(a =>
          a.type === artifact ? { ...a, ...state } : a
        ),
      }),
      game
    )
  }
)

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

const passArtifact = curry(
  (
    source: PlayerId,
    target: PlayerId,
    artifact: Artifacts,
    game: WerewolfGame
  ): WerewolfGame => {
    const state = game.players[source].artifacts.find(a => a.type === artifact)
    if (!state) return game

    return pipe(
      destroyArtifact(source, artifact),
      giveArtifact(target, state)
    )(game)
  }
)

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

export const setVictory = curry(
  (victory: Victory, game: WerewolfGame): WerewolfGame =>
    updateGame({ victory: game.victory || victory }, game)
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

const updateGame = curry(
  (
    update:
      | Partial<WerewolfGame>
      | ((game: WerewolfGame) => Partial<WerewolfGame>),
    game: WerewolfGame
  ): WerewolfGame => {
    return {
      ...game,
      ...(typeof update === 'function' ? update(game) : update),
    }
  }
)

const addPrompt = curry(
  (prompt: Prompts | Prompts[], game: WerewolfGame): WerewolfGame =>
    updateGame(
      game => ({
        prompts: {
          ...game.prompts,
          items: game.prompts.items.concat(prompt),
        },
      }),
      game
    )
)
