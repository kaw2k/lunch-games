import { BloodOfTheDiseased } from './bloodOfTheDiseased'
import { ScepterOfRebirth } from './scepterOfRebirth'
import { SkimmerOfTheCursed } from './skimmerOfTheCursed'
import { OnyxOfDestruction } from './onyxOfDestruction'
import { OrbOfSpeculation } from './orbOfSpeculation'
import { Artifact } from '.'
import { ShroudOfShame } from './shroudOfShame'
import { MirrorOfTheDoppleganger } from './mirrorOfTheDoppleganger'
import { BreathOfTheOldMan } from './breathOfTheOldMan'
import { ShieldOfTheBodyguard } from './shieldOfTheBodyguard'
import { PlayerId } from '../../../../interfaces/player'
import { VoidOfNothingness } from './voidOfNothingness'
import { BowOfHunting } from './bowOfHunting'
import { ClawOfTheWerewolf } from './clawOfTheWerewolf'
import { CitrineOfFortune } from './citrineOfFortune'

export interface ArtifactState {
  type: Artifacts
  state: any
  linked?: null | PlayerId // If a player copies your artifact, give them an active artifact when your is played
  activated: 'unplayed' | 'playing' | 'played'
}
export function ArtifactState(
  type: Artifacts,
  state: Partial<ArtifactState> = {}
): ArtifactState {
  return {
    type,
    activated: 'unplayed',
    state: null,
    ...state,
  }
}

export const Artifacts = [
  BloodOfTheDiseased,
  ScepterOfRebirth,
  SkimmerOfTheCursed,
  OnyxOfDestruction,
  OrbOfSpeculation,
  ShroudOfShame,
  MirrorOfTheDoppleganger,
  BreathOfTheOldMan,
  ShieldOfTheBodyguard,
  VoidOfNothingness,
  BowOfHunting,
  ClawOfTheWerewolf,
  CitrineOfFortune,
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
