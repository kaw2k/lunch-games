import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { ViewRole } from '../../components/viewRole/role'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { linkPlayer } from '../actions'
import { SetupViewProps } from '../setupViewInterfaces'

export const MadBomberSetup: React.SFC<SetupViewProps> = ({ ready }) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  if (!game.options.madBomberOnlyKillsAdjacent) {
    return (
      <>
        <ViewRole role={player.role} />
        <Typography variant="h1">Setup your role</Typography>
        <Typography gutterBottom>
          When the Mad Bomber dies, the players to either side of you (skipping
          gaps) dies as well.
        </Typography>
        <ActionRow fixed>
          <Button color="green" onClick={() => ready([])}>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <ViewRole role={player.role} />
      <Typography variant="h1">Setup your role</Typography>
      <Typography gutterBottom>
        When the Mad Bomber diesVA Wolf dies, the person you choose dies as
        well.
      </Typography>
      <ChoosePlayers
        players={game.players}
        removePlayer
        numToSelect={2}
        doneText="ready"
        onDone={([left, right]) =>
          ready([
            linkPlayer({ target: left, source: player.id }),
            linkPlayer({ target: right, source: player.id }),
          ])
        }
        doneProps={disabled => ({
          color: disabled ? 'red' : 'green',
        })}
      />
    </>
  )
}

export const MadBomber = Card({
  role: 'mad bomber',
  weight: -2,
  team: 'villagers',
  emoji: Emoji('💣'),
  cardCount: 1,
  description: `If you are eliminated, the players immediately to your left and right are eliminated as well.`,
  // deathMessage: `The mad bomber has died, players on either side dies as well`,
  hints: [
    `You really don't want to out your role, try as hard as you can to pretend to be something else`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: MadBomberSetup,
  appearsBad: always(false),
})
