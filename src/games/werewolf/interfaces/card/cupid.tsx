import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { ViewRole } from '../../components/viewRole/role'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { linkPlayer } from '../actions'
import { SetupViewProps } from '../setupViewInterfaces'
import { CardRole } from '../../../../helpers/id'

const SetupRoleView: React.SFC<SetupViewProps> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        Cupid links two people together. When one of them dies, the other dies
        as well.
      </Typography>
      <ChoosePlayers
        players={game.players}
        removePlayer
        doneText="match make"
        columns={2}
        numToSelect={2}
        onDone={([one, two]) =>
          ready([
            linkPlayer({ target: one, source: two }),
            linkPlayer({ target: two, source: one }),
          ])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}

export const Cupid = Card({
  role: CardRole('cupid'),
  weight: -3,
  team: 'villagers',
  emoji: Emoji('🏹'),
  cardCount: 1,
  description: `You link two players the first night, and if one of them dies the other dies too.`,
  hints: [
    `Never reveal who you linked, unless you know one of them to be a werewolf`,
  ],
  image: require('../../static/cupid.png'),
  profile: require('../../static/cupid-profile.png'),
  SetupRoleView: SetupRoleView,
  appearsBad: always(false),
})
