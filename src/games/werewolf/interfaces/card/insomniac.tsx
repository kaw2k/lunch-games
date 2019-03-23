import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { getInsomniacMessage } from '../../helpers/getInsomniacMessage'
import { CardRole } from '../../../../helpers/id'

const title = 'Insomniac, wake up!'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <Typography variant="h2">
        {getInsomniacMessage(game.players[playerId], game)}
      </Typography>

      <ActionRow fixed>
        <Button color="green" onClick={() => done([])}>
          continue
        </Button>
      </ActionRow>
    </NightViewBase>
  )
}

export const Insomniac = Card({
  role: CardRole('insomniac'),
  weight: 3,
  team: 'villagers',
  emoji: Emoji('😴'),
  cardCount: 1,
  description: `Each night, learn if at least on ofr your neighbors has taken a night action.`,
  hints: [
    `Not all night action users are bad.`,
    `Be careful not to out the seer, see if either of your neighbors is suspicious before coming out.`,
    `Your neighbors skips gaps if the people adjacent to you are killed`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  randomlySelectable: true,
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
