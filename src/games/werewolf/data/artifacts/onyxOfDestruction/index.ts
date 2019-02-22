import { Artifact } from '../../../interfaces/artifact'

export const OnyxOfDestruction = Artifact({
  type: 'onyx of destruction',
  state: {
    type: 'onyx of destruction',
    title: 'Onyx of Destruction',
    activated: false,
    description:
      'Choose a player with an unrevealed artifact card and remove it from the game.',
    infinite: false,
    morningAction: null,
    state: null,
  },
  actions: {
    setup: null,
    morningAction: null,
    action: null,
    postDeathAction: null,
  },
})
