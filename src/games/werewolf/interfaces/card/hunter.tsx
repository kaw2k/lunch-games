import * as React from 'react'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { PromptView } from '../prompt'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import values from 'ramda/es/values'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { linkKill } from '../actions'
import { Typography } from '@material-ui/core'

const OnDeathView: PromptView = ({ prompt, done }) => {
  const { game } = React.useContext(WerewolfGameContext)

  if (game.playerInteraction.ready) {
    return <Typography variant="h2">waiting for moderator </Typography>
  }

  const player =
    prompt.type === 'by name' || prompt.type === 'by role'
      ? prompt.player
      : null

  if (!player) {
    return <NoNightActionView data="nope" done={done} />
  }

  return (
    <ChoosePlayers
      title="Who would you like to kill?"
      doneText="kill"
      removePlayer={game.players[player]}
      players={values(game.players).filter(p => p.alive)}
      onDone={([target]) => {
        done([linkKill({ target })])
      }}
    />
  )
}

export const Hunter = Card({
  role: 'hunter',
  weight: 3,
  team: 'villagers',
  emoji: Emoji('🏹'),
  cardCount: 1,
  description: `When you die, you immediately pick a player who also dies.`,
  hints: [`If you don't know a werewolf, kill someone for the lulz.`],
  image: require('../../static/hunter.png'),
  profile: require('../../static/hunter-profile.png'),
  appearsBad: always(false),
  SetupRoleView: GenericSetupRoleView,
  OnDeathView,
})
