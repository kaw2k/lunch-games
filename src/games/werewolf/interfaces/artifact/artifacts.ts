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
import { VoidOfNothingness } from './voidOfNothingness'
import { BowOfHunting } from './bowOfHunting'
import { ClawOfTheWerewolf } from './clawOfTheWerewolf'
import { CitrineOfFortune } from './citrineOfFortune'
import { WreathOfPeace } from './wreathOfPeace'
import { VoteFromBeyond } from './voteFromBeyond'
import { StaffOfTheSeer } from './staffOfTheSeer'
import { AmuletOfProtection } from './amuletOfProtection'
import { DiaryOfTheInsomniac } from './diaryOfTheInsomniac'
import { StoneOfAlteration } from './stoneOfAlteration'
import { RodOfReincarnation } from './rodOfReincarnation'
import { AmethystOfKnowledge } from './amethystOfKnowledge'
import { RubyOfKismet } from './rubyOfKismet'
import { TalismanOfTrouble } from './talismanOfTrouble'
import { RingOfTruth } from './ringOfTruth'
import { MistOfAura } from './mistOfAura'
import { MakeOfTheMayor } from './makeOfTheMayor'
import { MaskOfSpellcasting } from './maskOfSpellcasting'
import { CauldronOfSorcery } from './cauldronOfSorcery'
import { CoinOfYouth } from './coinOfYouth'
import { HeartOfIndifference } from './heartOfIndifference'
import { CudgelOfTheOldHag } from './cudgelOfTheOldHag'
import { CloakOfThePrince } from './cloakOfThePrince'
import { EmeraldOfJealousy } from './emeraldOfJealousy'
import { SheetOfTheGhost } from './sheetOfTheGhost'
import { EyeOfTheBeholder } from './eyeOfTheBeholder'
import { SpearOfFury } from './spearOfFury'
import { DiamondOfDenial } from './diamondOfDenial'
import { AmberOfDawn } from './amberOfDawn'

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
  WreathOfPeace,
  VoteFromBeyond,
  StaffOfTheSeer,
  AmuletOfProtection,
  DiaryOfTheInsomniac,
  StoneOfAlteration,
  RodOfReincarnation,
  AmethystOfKnowledge,
  RubyOfKismet,
  TalismanOfTrouble,
  RingOfTruth,
  MistOfAura,
  MakeOfTheMayor,
  MaskOfSpellcasting,
  CauldronOfSorcery,
  CoinOfYouth,
  HeartOfIndifference,
  CudgelOfTheOldHag,
  CloakOfThePrince,
  EmeraldOfJealousy,
  SheetOfTheGhost,
  EyeOfTheBeholder,
  SpearOfFury,
  DiamondOfDenial,
  AmberOfDawn,
]
export type Artifacts = (typeof Artifacts)[0]['type']

export function getArtifact(type: Artifacts): Artifact<Artifacts> {
  return Artifacts.find(artifact => artifact.type === type) as Artifact<
    Artifacts
  >
}
