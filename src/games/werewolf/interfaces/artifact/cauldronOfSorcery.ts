import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const CauldronOfSorcery = Artifact({
  type: ArtifactType('cauldron of sorcery'),
  category: 'Inspection',
  title: 'Cauldron of Sorcery',
  description:
    'Choose a player they must truthfully say if they are special (not a normal werewolf or villager).',
  infinite: false,
})
