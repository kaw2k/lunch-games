import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { updatePlayer, werewolfKill, leprechaunDiversion } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'
import { getNeighbor } from '../../helpers/neighbors'
import { PlayerId } from '../../../../interfaces/player'
import contains from 'ramda/es/contains'
import { CardRole } from '../../../../helpers/id'

type WerewolfKill = ReturnType<typeof werewolfKill>

type State = PlayerId[]
const defaultState: State = []

const title = 'Leprechaun, wake up!'
const description = `Here are who the werewolves attacked. You can divert their attack to one of their targets to the player on either their left or their right.`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [divertTarget, setDivertTarget] = React.useState<PlayerId | null>(null)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const player = game.players[playerId]
  let previouslyDivertedPlayers: State = player.state.leprechaun || defaultState

  const werewolfAttacks = game.actions.filter(
    action => action.type === 'werewolf kill'
  ) as WerewolfKill[]

  let alternateTargets: PlayerId[] = []
  if (divertTarget) {
    const left = getNeighbor(divertTarget, 'left', 'skip-gaps', game)
    if (left) alternateTargets = alternateTargets.concat(left)
    const right = getNeighbor(divertTarget, 'right', 'skip-gaps', game)
    if (right) alternateTargets = alternateTargets.concat(right)
  }

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <Typography gutterBottom component="em">
        {description}
      </Typography>

      {!divertTarget && (
        <>
          <Typography component="em">
            Here are the players the werewolves' attacked. You may only select
            other players besides yourself who you have not defended before.
          </Typography>
          <ChoosePlayers
            players={werewolfAttacks.map(action => game.players[action.target])}
            cancelText="no one i guess"
            onCancel={() => done([])}
            doneText="choose player"
            onDone={([target]) => setDivertTarget(target)}>
            {props => (
              <WerewolfProfile
                key={props.player.id}
                {...props}
                disabled={
                  (!game.options.luckyLeprechaun && props.player.id === playerId) ||
                  contains(props.player.id, previouslyDivertedPlayers)
                }
              />
            )}
          </ChoosePlayers>
        </>
      )}

      {divertTarget && (
        <ChoosePlayers
          columns={2}
          players={alternateTargets.map(pid => game.players[pid])}
          cancelText="cancel"
          onCancel={() => setDivertTarget(null)}
          altText="eh, pass"
          onAlt={() => done([])}
          doneText="divert attack"
          onDone={([target]) => {
            previouslyDivertedPlayers = previouslyDivertedPlayers.concat(
              divertTarget
            )

            const action = game.actions.find(
              a => a.type === 'werewolf kill' && a.target === divertTarget
            )

            if (!action) {
              return setDivertTarget(null)
            }

            done([
              updatePlayer({
                target: playerId,
                updates: {
                  state: {
                    ...player.state,
                    leprechaun: previouslyDivertedPlayers,
                  },
                },
              }),
              leprechaunDiversion({
                actionId: action.id,
                target: target,
              }),
            ])
          }}>
          {props => (
            <WerewolfProfile
              key={props.player.id}
              {...props}
              disabled={props.player.id === playerId}
            />
          )}
        </ChoosePlayers>
      )}
    </NightViewBase>
  )
}

export const Leprechaun = Card({
  role: CardRole('leprechaun'),
  weight: 5,
  team: 'villagers',
  emoji: Emoji('🌈'),
  cardCount: 1,
  description: `Each night, you may change the Werewolves' target to an adjacent player.`,
  hints: [
    `You may not divert the werewolves' from attacking the same person twice`,
    `You may not divert the werewolves' attack either from or to yourself`,
  ],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  randomlySelectable: true,
  canFrankensteinAbsorbIt: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.leprechaun,
  },
})
