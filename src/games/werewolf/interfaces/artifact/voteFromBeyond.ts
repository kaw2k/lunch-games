import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const VoteFromBeyond = Artifact({
  type: ArtifactType('vote from beyond'),
  category: 'Misc',
  title: 'Vote From Beyond',
  description:
    'You may vote during the day, even if you have been eliminated. You may not open your eyes at night when dead.',
  infinite: true,
})
