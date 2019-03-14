import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { guard, linkKill, updatePlayer } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'

interface State {
  hasAttacked: boolean
  hasProtected: boolean
}

const defaultState: State = {
  hasAttacked: false,
  hasProtected: false,
}

const title = 'Witch, wake up!'
const description = `You may protect everyone from harm as well as kill someone, once per game, each. Thumbs down and point to kill, thumbs up to protect everyone.`

enum View {
  select,
  kill,
}

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [view, setView] = React.useState<View>(View.select)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const player = game.players[playerId]
  let state: State = player.state.witch || defaultState

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <Typography gutterBottom component="em">
        {description}
      </Typography>

      {view === View.select && (
        <>
          {!state.hasProtected && (
            <Button
              confirm
              onClick={() => {
                state.hasProtected = true
                done([
                  ...values(game.players).map(p => guard({ target: p.id })),
                  updatePlayer({
                    target: playerId,
                    updates: {
                      state: {
                        ...player.state,
                        witch: state,
                      },
                    },
                  }),
                ])
              }}>
              protect everyone
            </Button>
          )}

          {!state.hasAttacked && (
            <Button onClick={() => setView(View.kill)}>kill someone</Button>
          )}

          <ActionRow fixed>
            <Button
              color="green"
              confirm
              onClick={() => {
                done([
                  updatePlayer({
                    target: playerId,
                    updates: {
                      state: {
                        ...player.state,
                        witch: state,
                      },
                    },
                  }),
                ])
              }}>
              pass
            </Button>
          </ActionRow>
        </>
      )}

      {view === View.kill && (
        <>
          <ChoosePlayers
            columns={2}
            doneText="kill"
            players={values(game.players).filter(p => p.alive)}
            cancelText="cancel"
            onCancel={() => setView(View.select)}
            onDone={([target]) => {
              state.hasAttacked = true
              done([
                linkKill({ target }),
                updatePlayer({
                  target: playerId,
                  updates: {
                    state: {
                      ...player.state,
                      witch: state,
                    },
                  },
                }),
              ])
            }}>
            {props => <WerewolfProfile key={props.player.id} {...props} />}
          </ChoosePlayers>
        </>
      )}
    </NightViewBase>
  )
}

export const Witch = Card({
  role: 'witch',
  weight: 4,
  team: 'villagers',
  emoji: Emoji('🧙‍♂️'),
  cardCount: 1,
  description: `At night, once per game (each) you can 1) choose to protect everyone 2) choose to kill someone.`,
  image: require('../../static/witch.png'),
  profile: require('../../static/witch-profile.png'),
  hints: [
    `Save your protection for a time that would be helpful to the team, i.e. if the Seer reveals themselves then save everyone that night. Or if the Wolf Cub is in the game then save everyone the night there werewolves get to kill 2 people.`,
    `Your save becomes more valuable as the game keeps going, don't die without using it!`,
  ],
  SetupRoleView: GenericSetupRoleView,
  randomlySelectable: true,
  appearsBad: always(false),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
