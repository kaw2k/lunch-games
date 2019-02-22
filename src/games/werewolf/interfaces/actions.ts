import { PlayerId } from '../../../interfaces/player'
import { PlayerWerewolf } from './player'
import { Id } from '../../../helpers/id'

enum ActionOrder {
  setup = 0,
  misc = 50,
  artifact = 75,
  kill = 100,
  postKill = 150,
}

type Action<Type extends string, Payload extends object> = {
  id: string
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
  updates: Partial<Pick<PlayerWerewolf, 'role'>>
}

function Action<Type extends string, Payload extends object>(
  type: Type,
  payload: Payload,
  order: ActionOrder
): Action<Type, Payload> {
  return {
    type,
    order,
    id: Id(),
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

export const sudoKill = AC<'sudo kill', Target>('sudo kill', ActionOrder.kill)
export const voteKill = AC<'vote kill', Target>('vote kill', ActionOrder.kill)
export const werewolfKill = AC<'werewolf kill', Target>(
  'werewolf kill',
  ActionOrder.kill
)
export const linkKill = AC<'link kill', Target>('link kill', ActionOrder.kill)
export const guard = AC<'guard', Target>('guard', ActionOrder.misc)
export const bless = AC<'bless', TargetAndSource>('bless', ActionOrder.misc)
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
export const scepterOfRebirth = AC<'scepter of rebirth', Target>(
  'scepter of rebirth',
  ActionOrder.postKill
)

export type Actions =
  | ReturnType<typeof sudoKill>
  | ReturnType<typeof voteKill>
  | ReturnType<typeof werewolfKill>
  | ReturnType<typeof linkKill>
  | ReturnType<typeof guard>
  | ReturnType<typeof bless>
  | ReturnType<typeof updatePlayer>
  | ReturnType<typeof indoctrinate>
  | ReturnType<typeof linkPlayer>
  | ReturnType<typeof scepterOfRebirth>
