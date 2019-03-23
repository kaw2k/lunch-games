import { PlayerId } from '../../../interfaces/player'
import { PlayerWerewolf } from './player'
import { Id, ActionId } from '../../../helpers/id'
import { assertNever } from '../../../helpers/assertNever'
import { Artifacts } from './artifact/artifacts'
import { Teams } from './card'
import { DelayAction } from './delayAction'
import { Prompts } from './prompt'
import { ArtifactState } from './artifact'

enum ActionOrder {
  setup = 0,
  misc = 50,
  artifact = 75,
  kill = 100,
  postKill = 150,
}

export type Action<Type extends string, Payload extends object> = {
  id: ActionId
  type: Type
  order: ActionOrder
} & Payload

interface Target {
  target: PlayerId
}
interface TargetAndSource {
  target: PlayerId
  source: PlayerId
}
interface TargetUpdate {
  target: PlayerId
  updates: Partial<
    Pick<
      PlayerWerewolf,
      'role' | 'secondaryRole' | 'state' | 'markedByAlphaWolf'
    >
  >
}
interface TargetArtifact {
  target: PlayerId
  artifact: Artifacts
}

function Action<Type extends string, Payload extends object>(
  type: Type,
  payload: Payload,
  order: ActionOrder
): Action<Type, Payload> {
  return {
    type,
    order,
    id: ActionId(),
    ...payload,
  }
}

function AC<Type extends string, Payload extends object>(
  type: Type,
  order: ActionOrder
) {
  return function(payload: Payload): Action<Type, Payload> {
    return Action(type, payload, order)
  }
}

export const revivePlayer = AC<'revive player', Target>(
  'revive player',
  ActionOrder.kill
)
export const sudoKill = AC<'sudo kill', Target>('sudo kill', ActionOrder.kill)
export const voteKill = AC<'vote kill', Target>('vote kill', ActionOrder.kill)
export const artifactKill = AC<'artifact kill', Target>(
  'artifact kill',
  ActionOrder.kill
)
export const werewolfKill = AC<'werewolf kill', Target>(
  'werewolf kill',
  ActionOrder.kill
)
export const chewksKill = AC<'chewks kill', Target>(
  'chewks kill',
  ActionOrder.kill
)
export const linkKill = AC<'link kill', Target>('link kill', ActionOrder.kill)
export const guard = AC<'guard', Target>('guard', ActionOrder.misc)
export const leprechaunDiversion = AC<
  'leprechaun diversion',
  {
    actionId: Id
    target: PlayerId
  }
>('leprechaun diversion', ActionOrder.misc)
export const bless = AC<'bless', TargetAndSource>('bless', ActionOrder.misc)
export const eatBrains = AC<'eat brains', Target>(
  'eat brains',
  ActionOrder.misc
)
export const updatePlayer = AC<'update player', TargetUpdate>(
  'update player',
  ActionOrder.misc
)
export const indoctrinate = AC<'indoctrinate', TargetAndSource>(
  'indoctrinate',
  ActionOrder.misc
)
export const linkPlayer = AC<'link player', TargetAndSource>(
  'link player',
  ActionOrder.setup
)
export const copyPlayer = AC<'copy player', TargetAndSource>(
  'copy player',
  ActionOrder.setup
)
export const scepterOfRebirth = AC<'scepter of rebirth', Target>(
  'scepter of rebirth',
  ActionOrder.postKill
)
export const rodOfReincarnation = AC<'rod of reincarnation', Target>(
  'rod of reincarnation',
  ActionOrder.postKill
)

export const updateArtifact = AC<
  'update artifact',
  {
    target: PlayerId
    artifact: Artifacts
    updates: Partial<ArtifactState>
  }
>('update artifact', ActionOrder.artifact)

export const destroyArtifact = AC<'destroy artifact', TargetArtifact>(
  'destroy artifact',
  ActionOrder.artifact
)

export const giveArtifact = AC<
  'give artifact',
  {
    target: PlayerId
    artifact: ArtifactState
  }
>('give artifact', ActionOrder.artifact)

export const passArtifact = AC<
  'pass artifact',
  {
    target: PlayerId
    source: PlayerId
    artifact: Artifacts
  }
>('pass artifact', ActionOrder.artifact)

export const endGame = AC<
  'end game',
  {
    team: Teams
    message: string
  }
>('end game', ActionOrder.artifact)

export const addAction = AC<
  'add action',
  {
    action: Action<any, any> | Action<any, any>[]
  }
>('add action', ActionOrder.misc)

export const addDelayedAction = AC<
  'add delayed action',
  {
    delayedAction: DelayAction<Action<any, any>> | DelayAction<Action<any, any>>
  }
>('add delayed action', ActionOrder.misc)

export const showPrompts = AC<'show prompts', { prompts?: Prompts[] }>(
  'show prompts',
  ActionOrder.misc
)

export type Actions =
  | ReturnType<typeof revivePlayer>
  | ReturnType<typeof sudoKill>
  | ReturnType<typeof voteKill>
  | ReturnType<typeof werewolfKill>
  | ReturnType<typeof chewksKill>
  | ReturnType<typeof linkKill>
  | ReturnType<typeof artifactKill>
  | ReturnType<typeof guard>
  | ReturnType<typeof bless>
  | ReturnType<typeof updatePlayer>
  | ReturnType<typeof indoctrinate>
  | ReturnType<typeof linkPlayer>
  | ReturnType<typeof copyPlayer>
  | ReturnType<typeof scepterOfRebirth>
  | ReturnType<typeof passArtifact>
  | ReturnType<typeof destroyArtifact>
  | ReturnType<typeof updateArtifact>
  | ReturnType<typeof giveArtifact>
  | ReturnType<typeof endGame>
  | ReturnType<typeof addDelayedAction>
  | ReturnType<typeof addAction>
  | ReturnType<typeof showPrompts>
  | ReturnType<typeof rodOfReincarnation>
  | ReturnType<typeof leprechaunDiversion>
  | ReturnType<typeof eatBrains>

export function actionToString(action: Actions): string | null {
  if (action.type === 'bless')
    return `${action.target} was blessed by ${action.source}`

  if (action.type === 'guard')
    return `${action.target} was protected by the bodyguard`

  if (action.type === 'indoctrinate')
    return `${action.target} was indoctrinated by ${action.source}`

  if (action.type === 'scepter of rebirth')
    return `${action.target} came back to life by the scepter of rebirth!`

  if (action.type === 'rod of reincarnation')
    return `${action.target} came back to life with a new role!`

  if (action.type === 'sudo kill')
    return `${action.target} was killed by the moderator`

  if (action.type === 'vote kill')
    return `${action.target} was lynched by the village`

  if (action.type === 'werewolf kill')
    return `${action.target} was eaten by werewolves`

  if (action.type === 'chewks kill')
    return `${action.target} was torn apart by chewks`

  if (action.type === 'leprechaun diversion') return null

  if (action.type === 'artifact kill')
    return `${action.target} was killed by an artifact`

  if (action.type === 'revive player')
    return `${action.target} came back to life somehow?!`

  if (action.type === 'link kill') return `${action.target} was linked and died`

  if (action.type === 'link player') return null
  if (action.type === 'copy player') return null
  if (action.type === 'update player') return null
  if (action.type === 'pass artifact') return null
  if (action.type === 'update artifact') return null
  if (action.type === 'destroy artifact') return null
  if (action.type === 'give artifact') return null
  if (action.type === 'end game') return null
  if (action.type === 'add action') return null
  if (action.type === 'show prompts') return null
  if (action.type === 'eat brains') return null
  if (action.type === 'add delayed action') return null

  return assertNever(action)
}
