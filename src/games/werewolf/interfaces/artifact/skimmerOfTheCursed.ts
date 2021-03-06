import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const SkimmerOfTheCursed = Artifact({
  type: ArtifactType('skimmer of the cursed'),
  title: 'Skimmer of the Cursed',
  category: 'Imitate Role',
  description:
    'When you play this, you are cursed, if a werewolf targets you at night you become a werewolf and join their team.',
  infinite: true,
})
