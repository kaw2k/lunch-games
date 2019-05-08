import { Player, PlayerId } from '../../../interfaces/player'
import { RoomId, Lobby } from '../../../interfaces/room'
import { Hash } from '../../../interfaces/hash'
import { PlayerMurder } from './player'
import { Omit } from '@material-ui/core'
import { WeaponId, EvidenceId, SceneId } from '../../../helpers/id'
import _evidences from '../static/evidence/*.png'
import _weapons from '../static/evidence/*.png'
import { values } from 'ramda'

export type Party = 'good' | 'bad'
export type Role =
  | 'murderer'
  | 'investigator'
  | 'witness'
  | 'accomplice'
  | 'forensic scientist'

export interface Weapon {
  id: WeaponId
  img: string
  marked: PlayerId[]
}

export interface Evidence {
  id: EvidenceId
  marked: PlayerId[]
  img: string
}

export const EVIDENCES = values(_evidences).map<Evidence>((img: string, i) => ({
  img,
  id: EvidenceId(i),
  marked: [],
}))

export const WEAPONS = values(_weapons).map<Weapon>((img: string, i) => ({
  img,
  id: WeaponId(i),
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
