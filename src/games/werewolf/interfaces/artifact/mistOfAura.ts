import { Artifact } from '.'
import { ArtifactType } from '../../../../helpers/id'

export const MistOfAura = Artifact({
  type: ArtifactType('Mist of Aura'),
  category: 'Inspection',
  title: 'Mist of Aura',
  description:
    'Choose a player they must truthfully say if they are special (not a normal werewolf or villager).',
  infinite: false,
})
