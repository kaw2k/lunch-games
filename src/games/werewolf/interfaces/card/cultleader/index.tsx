import * as React from 'react'
import { ChoosePlayers } from '../../../../../components/choosePlayers'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { NightViewProps } from '../../nightViewInterfaces'
import { indoctrinate } from '../../actions'
import { NightViewBase } from '../../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '..'
import { Emoji } from '../../emoji'
import { NightMessageOrder } from '../../nightMessage'
import { GenericSetupRoleView } from '../../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../../components/night/noNightActionView'

const nightTitle = `Cult leader, wake up! Indoctrinate someone, they are now in your cult.`

const NightView: React.SFC<NightViewProps> = ({ done, ...props }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const player =
    props.type === 'by role' || (props.type === 'by name' && props.player)

  if (typeof player !== 'object')
    return <NoNightActionView done={() => done([])} data={nightTitle} />

  return (
    <>
      <NightViewBase
        done={done}
        role="cult leader"
        title={nightTitle}
        {...props}>
        <ChoosePlayers
          removePlayer={player}
          doneText="indoctrinate"
          onDone={([target]) => {
            done([indoctrinate({ target, source: player.id })])
          }}
          players={values(game.players).filter(
            p => !contains(player.id, p.inCult) && p.alive
          )}>
          {props => <WerewolfProfile {...props} />}
        </ChoosePlayers>
      </NightViewBase>
    </>
  )
}

export const CultLeader = Card({
  role: 'cult leader',
  weight: 1,
  team: 'cult leader',
  emoji: Emoji('🍷'),
  cardCount: 1,
  description: `Every night wake up to indoctrinate people into your cult. You win if all living players are in your cult.`,
  hints: [
    `Indoctrinate people who you think won't die early`,
    `Your cult dies with you, so DON'T come out as the cult leader. You are a high priority role to kill.`,
  ],
  SetupRoleView: GenericSetupRoleView,
  image: require('./cult-leader.png'),
  profile: require('./cult-leader-profile.png'),
  isActive: always(true),
  appearsBad: always(false),
  night: {
    title: nightTitle,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.misc,
  },
})
