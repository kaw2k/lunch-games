import { Artifact } from '../../../interfaces/artifact'

export const BloodOfTheDiseased = Artifact({
  type: 'blood of the diseased',
  state: {
    type: 'blood of the diseased',
    title: 'Blood of the Diseased',
    activated: false,
    description:
      'Choose a player to become infected with disease. If the werewolves eliminate that player, they do not get to choose a target the following night.',
    infinite: true,
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