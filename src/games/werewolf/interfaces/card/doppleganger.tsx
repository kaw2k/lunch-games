import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { ViewRole } from '../../components/viewRole/role'
import { copyPlayer } from '../actions'
import { SetupViewProps } from '../setupViewInterfaces'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

export const SetupView: React.SFC<SetupViewProps> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        Choose a person, when they die you get their role. It will be visible to
        you in your role tab.
      </Typography>
      <ChooseWerewolfPlayer
        players={values(game.players).filter(p => p.id !== player.id)}
        doneText="ready"
        onDone={([target]) =>
          ready([copyPlayer({ target: target.id, source: player.id })])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}

export const Doppleganger = Card({
  role: CardRole('doppleganger'),
  weight: -2,
  team: 'villagers',
  emoji: Emoji('🤷‍♀️'),
  cardCount: 1,
  description: `You pick a player the first night. When that player dies, you become that role.`,
  hints: [
    `Usually the moderator will try to tap you to tell you your role after you become that role. If you are playing on your phone, your role will update and show you.`,
    `If the moderator does not mention anything, chances are you are a villager or non-important role.`,
    `Be careful about coming out too early with who you cloned, it can get you into trouble if they were suspicious in throughout the game.`,
    `You can lie and say you cloned someone who was clearly good (and dead).`,
  ],
  image: require('../../static/doppleganger.png'),
  profile: require('../../static/doppleganger-profile.png'),
  SetupRoleView: SetupView,
  appearsBad: always(false),
})
