import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const TalismanOfTrouble = Artifact({
  type: ArtifactType('talisman of trouble'),
  category: 'Chaos',
  title: 'Talisman of Trouble',
  description:
    'Two players are eliminated during the day that this card is revealed.',
  infinite: false,
})
