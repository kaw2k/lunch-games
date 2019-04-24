import { Artifact } from '.'
import { GenericArtifactMorningView } from '../../components/artifact/genericMorningView'
import { ArtifactType } from '../../../../helpers/id'

export const MaskOfSpellcasting = Artifact({
  type: ArtifactType('mask of spellcasting'),
  title: 'Mask of Spellcasting',
  category: 'Chaos',
  description: 'Each day at down choose a player who may not speak that day.',
  infinite: true,
  MorningView: GenericArtifactMorningView,
})
