import * as React from 'react'
import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { count } from '../../../../helpers/count'
import { isWerewolf } from '../../helpers/isWerewolf'
import { NightMessageOrder } from '../nightMessage'
import { NightViewProps } from '../nightViewInterfaces'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { chewksKill } from '../actions'
import { NoNightActionView } from '../../components/night/noNightActionView'

const title = 'Chewks, wake up and kill someone.'
const description =
  'If they are a werewolf, they die. If no more werewolves are alive, you can kill anyone.'

const NightModerator: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const player =
    (props.type === 'by role' || props.type === 'by name') && props.player

  if (!player) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase done={done} {...props} title={title}>
      <ChoosePlayers
        doneText="kill"
        columns={2}
        onDone={targets => {
          done(targets.map(target => chewksKill({ target })))
        }}
        players={values(game.players).filter(p => p.alive)}>
        {profileProps => (
          <WerewolfProfile {...profileProps} key={profileProps.player.id} />
        )}
      </ChoosePlayers>
    </NightViewBase>
  )
}

export const Chewks = Card({
  role: 'chewks',
  weight: 4,
  team: 'chewks',
  emoji: Emoji('💆‍♂️'),
  cardCount: 1,
  description: `You win if you're the last one left. You get to choose a player to kill each night. You can only kill werewolves to start, but after they're all eliminated you can then target others.`,
  hints: [
    `You appear as a villager to the Seer until all the werewolves are dead. Try to get inspected early in the game to prove your innocence.`,
    `Later in the game you can claim Seer as you should be figuring out who is good and bad.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('../../static/chewks.png'),
  profile: require('../../static/chewks-profile.png'),
  isActive: always(true),
  appearsBad: (player, game) => {
    const wolves = count(game.players, p => isWerewolf(p, game))
    return wolves ? false : true
  },
  night: {
    title,
    description,
    ModeratorView: NightModerator,
    PlayerView: NightModerator,
    order: NightMessageOrder.killing,
  },
})
