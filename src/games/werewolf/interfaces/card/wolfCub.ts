import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'

// deathMessage: 'the wolf cub died, wolves get to kill two people next night',

export const WolfCub = Card({
  role: 'wolf cub',
  weight: -8,
  team: 'werewolves',
  emoji: Emoji('🐶'),
  cardCount: 1,
  description: `You're a Werewolf. When you die your team gets to kill two people.`,
  hints: [
    'Your value happens when you die, you do not want to be the only wolf alive.',
    `Act suspicious, try coming out as the seer or apprentice seer a few rounds into the game. You may find out who the real seer is and your team will be able to kill two people when you die.`,
  ],
  image: require('../../static/wolf-cub.png'),
  profile: require('../../static/wolf-cub-profile.png'),
  appearsBad: always(true),
  SetupRoleView: GenericSetupWerewolfRoleView,
})
