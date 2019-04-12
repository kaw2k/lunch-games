import { always, values } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { ViewRole } from '../../components/viewRole/role'
import { linkPlayer } from '../actions'
import { SetupViewProps } from '../setupViewInterfaces'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

export const VAWolfSetup: React.SFC<SetupViewProps> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        When VA Wolf dies, the person you choose dies as well.
      </Typography>
      <ChooseWerewolfPlayer
        players={values(game.players).filter(p => p.id !== player.id)}
        doneText="ready"
        onDone={([target]) =>
          ready([linkPlayer({ target: target.id, source: player.id })])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}

export const VAWolf = Card({
  role: CardRole('va wolf'),
  weight: -2,
  team: 'villagers',
  emoji: Emoji('👵'),
  cardCount: 1,
  description: `You choose someone the first night, if you die that person dies as well.`,
  hints: [
    `As long as your linked partner is in the game DON'T come out. The werewolves will kill you and your linked person.`,
  ],
  image: require('../../static/va-wolf.png'),
  profile: require('../../static/va-wolf-profile.png'),
  SetupRoleView: VAWolfSetup,
  appearsBad: always(false),
})
