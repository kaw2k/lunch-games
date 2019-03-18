import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values, flatten } from 'ramda'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { getCard, Roles } from './cards'
import { PromptView } from '../prompt'
import { Actions } from '../actions'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Id } from '../../../../helpers/id'

const title =
  'Frankensteins monster, wake up! Perform any actions that you can!'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [activeRole, setActiveRole] = React.useState<Roles | null>(null)
  const [actions, addActions] = React.useState<{ [role in Roles]?: Actions[] }>(
    {}
  )

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const absorbedRoles = values(game.players)
    .filter(p => !p.alive && getCard(p.role).canFrankensteinAbsorbIt)
    .map(p => p.role)

  const NightView =
    activeRole &&
    getCard(activeRole).night &&
    getCard(activeRole).night!.ModeratorView

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      {!NightView && (
        <>
          <Typography variant="h2">Choose your action</Typography>
          {absorbedRoles.map(role => (
            <Button
              key={role}
              disabled={!!actions[role]}
              onClick={() => setActiveRole(role)}>
              {role}
            </Button>
          ))}

          <ActionRow fixed>
            <Button
              color="green"
              onClick={() => done(flatten(values(actions)) as any)}>
              done
            </Button>
          </ActionRow>
        </>
      )}

      {activeRole && NightView && (
        <NightView
          done={a => {
            setActiveRole(null)
            addActions({ ...actions, [activeRole]: a || [] })
          }}
          prompt={{
            id: Id(),
            type: 'by role' as 'by role',
            player: playerId,
            role: activeRole,
          }}
        />
      )}
    </NightViewBase>
  )
}

export const FrankensteinsMonster = Card({
  role: 'frankensteins monster',
  weight: 0,
  team: 'villagers',
  emoji: Emoji('🌭'),
  cardCount: 1,
  description: `Whenever a special character is eliminated you get their power.`,
  hints: [],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.inspection,
  },
})
