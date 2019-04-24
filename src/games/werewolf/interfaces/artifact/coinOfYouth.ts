import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const CoinOfYouth = Artifact({
  type: ArtifactType('coin of youth'),
  category: 'Chaos',
  title: 'Coin of Youth',
  description:
    'You must say the name of your role at least once per day or you will be eliminated that night.',
  infinite: true,
})
