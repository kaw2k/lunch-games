import { Artifact } from '.'
import { GenericArtifactMorningView } from '../../components/artifact/genericMorningView'
import { ArtifactType } from '../../../../helpers/id'

export const HeartOfIndifference = Artifact({
  type: ArtifactType('heart of indifference'),
  title: 'Heart of Indifference',
  category: 'Chaos',
  description: 'Each day at dawn choose a player who may not vote.',
  infinite: true,
  MorningView: GenericArtifactMorningView,
})
