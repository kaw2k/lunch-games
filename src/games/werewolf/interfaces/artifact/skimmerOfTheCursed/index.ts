import { Artifact } from '../../../interfaces/artifact'

export const SkimmerOfTheCursed = Artifact({
  type: 'skimmer of the cursed',
  title: 'Skimmer of the Cursed',
  description:
    'When you play this, you are cursed, if a werewolf targets you at night you become a werewolf and join their team.',
  infinite: false,
  morningAction: null,
  setup: null,
  action: null,
  postDeathAction: null,
})
