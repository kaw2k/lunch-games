import { Player } from '../../../interfaces/player'
import { RoomId, Lobby } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { PlayerMurder } from './player'
import { Omit } from '@material-ui/core'
import { WeaponId, EvidenceId, SceneId } from '../../../helpers/id'
import _evidences from '../static/evidence/*.png'
import _weapons from '../static/weapon/*.png'
import { values } from 'ramda'

import murderer from '../static/roles/murderer.png'
import investigator from '../static/roles/investigator.png'
import witness from '../static/roles/witness.png'
import accomplice from '../static/roles/accomplice.png'
import forensic from '../static/roles/forensic-scientist.png'

import { assertNever } from '../../../helpers/assertNever'

export type Party = 'good' | 'bad'
export type Role =
  | 'murderer'
  | 'investigator'
  | 'witness'
  | 'accomplice'
  | 'forensic scientist'

export const getRoleImage = (role: Role): string => {
  if (role === 'accomplice') return accomplice
  if (role === 'murderer') return murderer
  if (role === 'witness') return witness
  if (role === 'investigator') return investigator
  if (role === 'forensic scientist') return forensic

  return assertNever(role)
}

export interface Weapon {
  id: WeaponId
  img: string
  type: 'weapon'
}

export interface Evidence {
  id: EvidenceId
  type: 'evidence'
  img: string
}

export const EVIDENCES = values(_evidences).map<Evidence>((img: string, i) => ({
  img,
  id: EvidenceId(i),
  type: 'evidence',
  marked: [],
}))

export const WEAPONS = values(_weapons).map<Weapon>((img: string, i) => ({
  img,
  id: WeaponId(i),
  type: 'weapon',
  marked: [],
}))

export interface Scene {
  id: SceneId
  type: 'cause of death' | 'location' | 'misc'
  title: string
  hints: string[]
  selected?: number
}

interface MurderOptions {
  cardCounts: 3 | 4 | 5 // 4
  roundOneTime: number // 5 min
  roundTwoTime: number // 4 min
  roundThreeTime: number // 3 min
  speakingTime: number // 30000
  useEvents: boolean // false
}

export interface MurderLobby extends Omit<Lobby, 'type'> {
  type: 'murder-lobby'
  murderRoles: Role[]
  murderOptions: MurderOptions
}

export interface MurderGame {
  type: 'murder-game'
  id: RoomId

  message: null | string

  lobbyPlayers: Player[]
  players: Hash<PlayerMurder>

  round: 'setup' | 1 | 2 | 3 | 'end'

  scenes: Scene[]

  murderOptions: MurderOptions
}

export type Murder = MurderGame | MurderLobby
