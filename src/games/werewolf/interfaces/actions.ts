import { PlayerId } from '../../../interfaces/player'
import values from 'ramda/es/values'
import keys from 'ramda/es/keys'
import { PlayerWerewolf } from './player'

enum ActionOrder {
  setup = 0,
  misc = 50,
  kill = 100,
}

export interface Action<Type extends string> {
  type: Type
  order: ActionOrder
}

interface TargetOnePlayer<Type extends string> extends Action<Type> {
  target: PlayerId
}
const TargetOnePlayer = <T extends string>(type: T, order: ActionOrder) => {
  function ac(target: PlayerId): TargetOnePlayer<T> {
    return { type, target, order }
  }
  ac.type = type

  return ac
}

interface TargetTwoPlayers<Type extends string> extends Action<Type> {
  targets: [PlayerId, PlayerId]
}
const TargetTwoPlayers = <T extends string>(type: T, order: ActionOrder) => {
  function ac(targets: [PlayerId, PlayerId]): TargetTwoPlayers<T> {
    return { type, targets, order }
  }
  ac.type = type

  return ac
}

interface TargetAndSource<Type extends string> extends Action<Type> {
  target: PlayerId
  source: PlayerId
}
const TargetAndSource = <T extends string>(type: T, order: ActionOrder) => {
  function ac(target: PlayerId, source: PlayerId): TargetAndSource<T> {
    return { type, target, source, order }
  }
  ac.type = type

  return ac
}

interface TargetUpdate<Type extends string> extends Action<Type> {
  target: PlayerId
  updates: Partial<Pick<PlayerWerewolf, 'role'>>
}
const TargetUpdate = <T extends string>(type: T, order: ActionOrder) => {
  function ac(
    target: PlayerId,
    updates: Partial<PlayerWerewolf>
  ): TargetUpdate<T> {
    return { type, target, updates, order }
  }
  ac.type = type

  return ac
}

const AllActionCreatorMap = {
  // Kill
  'sudo kill': TargetOnePlayer('sudo kill', ActionOrder.kill),
  'vote kill': TargetOnePlayer('vote kill', ActionOrder.kill),
  'werewolf kill': TargetOnePlayer('werewolf kill', ActionOrder.kill),
  'link kill': TargetOnePlayer('link kill', ActionOrder.kill),
  // 'vampire kill': TargetOnePlayer('vampire kill'),
  // 'chewks kill': TargetOnePlayer('chewks kill'),

  // Protection
  guard: TargetOnePlayer('guard', ActionOrder.misc),
  bless: TargetOnePlayer('bless', ActionOrder.misc),

  // Misc
  'update player': TargetUpdate('update player', ActionOrder.misc),
  // 'vampire bite': TargetOnePlayer('vampire bite'),
  indoctrinate: TargetAndSource('indoctrinate', ActionOrder.misc),
  // silence: TargetOnePlayer('silence'),
  // exile: TargetOnePlayer('exile'),

  // Role Actions

  // Setup Actions
  'link player': TargetAndSource('link player', ActionOrder.setup),

  // Artifact Actions
  'scepter of rebirth': TargetOnePlayer('scepter of rebirth', ActionOrder.misc),
} as const

type Values<T extends object> = T[keyof T]

export type Actions = ReturnType<Values<typeof AllActionCreatorMap>>
type ActionTypes = keyof typeof AllActionCreatorMap

// Used as string references
export const ActionTypes = keys(AllActionCreatorMap)
export const ActionCreators = values(AllActionCreatorMap)

export type ActionCreators = typeof ActionCreators

export const getActionCreator = <Type extends ActionTypes>(type: Type) => {
  return AllActionCreatorMap[type]
}
