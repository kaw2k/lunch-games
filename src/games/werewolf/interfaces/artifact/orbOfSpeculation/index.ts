import { Artifact } from '../../../interfaces/artifact'

export const OrbOfSpeculation = Artifact({
  type: 'orb of speculation',
  title: 'Orb of Speculation',
  description:
    'Choose two players. If both of them are werewolves the village team wins and the game is over. If they are not, you are instantly eliminated.',
  infinite: false,
  morningAction: null,
  setup: null,
  action: null,
  postDeathAction: null,
})
