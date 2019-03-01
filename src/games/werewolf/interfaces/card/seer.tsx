import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { NightViewProps } from '../nightViewInterfaces'
import { bless } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { getCard } from './cards'

const title = 'Seer, wake up! Inspect someone!'

const NightView: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (props.type === 'by role' || props.type === 'by name') && props.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase {...props} title={title} done={done} role="priest">
      <ChoosePlayers
        columns={2}
        doneText="inspect"
        onDone={([targetId]) => {
          const target = game.players[targetId]
          const isPrimaryBad = getCard(target.role).appearsBad(target, game)
          const isSecondaryBad = !target.secondaryRole
            ? false
            : getCard(target.secondaryRole).appearsBad(target, game)
          const isBad = isPrimaryBad || isSecondaryBad

          alert(`${target.name || target.id} is ${isBad ? 'bad' : 'good'}`)
          done([])
        }}
        players={values(game.players).filter(p => p.alive)}>
        {props => <WerewolfProfile key={props.player.id} {...props} />}
      </ChoosePlayers>
    </NightViewBase>
  )
}

export const Seer = Card({
  role: 'seer',
  weight: 7,
  team: 'villagers',
  emoji: Emoji('🔮'),
  cardCount: 1,
  description: `Each night, you can inspect a player and find out if they're on the Werewolf team or not.`,
  hints: [
    `If the tanner is in the game, you want to make sure the villagers don't vote to eliminate the tanner`,
    `If the bodyguard is in the game, it is typically safe to come out earlier and ask to be protected.`,
    `If there is no way for you to be protected, you may want to wait until you find more than one werewolf.`,
    `Chewkacabra shows up as a villager until all the werewolves are dead.`,
    `Cursed shows up as a villager until they are attacked by werewolves.`,
    `Lycan always shows up as a werewolf even though they are a villager.`,
  ],
  image: require('../../static/seer.png'),
  profile: require('../../static/seer-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  isActive: always(true),
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
