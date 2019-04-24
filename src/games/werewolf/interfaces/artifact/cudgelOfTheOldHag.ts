import { Artifact } from '.'
import { GenericArtifactMorningView } from '../../components/artifact/genericMorningView'
import { ArtifactType } from '../../../../helpers/id'

export const CudgelOfTheOldHag = Artifact({
  type: ArtifactType('cudgel of the old hag'),
  title: 'Cudgel of the Old Hag',
  category: 'Chaos',
  description:
    'Each day at dawn choose a player to leave the village during the day',
  infinite: true,
  MorningView: GenericArtifactMorningView,
})
