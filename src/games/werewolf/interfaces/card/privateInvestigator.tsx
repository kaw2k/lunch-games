import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { updatePlayer } from '../actions'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupRoleView } from '../../components/setupRole/genericSetupRole'
import { NoNightActionView } from '../../components/night/noNightActionView'
import { PromptView } from '../prompt'
import { getNeighbor } from '../../helpers/neighbors'
import { getCard } from './cards'
import { playerName } from '../../../../components/playerName'
import { CardRole } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

type State = boolean
const defaultState: State = false

const title = 'PI, wake up!'
const description = `Point at some one, if they or one of their neighbors are a wolf I will say yes`

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const player = game.players[playerId]
  let state: State = player.state.pi || defaultState

  return (
    <NightViewBase prompt={prompt} title={title} done={done}>
      <Typography gutterBottom component="em">
        {description}
      </Typography>

      {state && (
        <>
          <Typography component="em">You already used your power</Typography>
          <ActionRow fixed>
            <Button color="green" onClick={() => done([])}>
              continue
            </Button>
          </ActionRow>
        </>
      )}

      {!state && (
        <ChooseWerewolfPlayer
          players={values(game.players).filter(p => p.alive)}
          cancelText="no thanks"
          onCancel={() => done([])}
          doneText="inspect"
          onDone={([target]) => {
            const state = true

            let players = [target]
            const left = getNeighbor(target.id, 'left', 'skip-gaps', game)
            if (left) players = players.concat(game.players[left])
            const right = getNeighbor(target.id, 'right', 'skip-gaps', game)
            if (right) players = players.concat(game.players[right])

            const isOneBad = !!players.find(p => {
              const isPrimaryBad = getCard(p.role).appearsBad(p, game)
              const isSecondaryBad =
                !!p.secondaryRole &&
                getCard(p.secondaryRole).appearsBad(p, game)

              return isPrimaryBad || isSecondaryBad
            })

            const names = players.map(p => playerName(p)).join(', ')

            alert(
              isOneBad ? `One of ${names} are bad` : `None of ${names} are bad`
            )

            done([
              updatePlayer({
                target: playerId,
                updates: {
                  state: {
                    ...player.state,
                    pi: state,
                  },
                },
              }),
            ])
          }}
        />
      )}
    </NightViewBase>
  )
}

export const PrivateInvestigator = Card({
  role: CardRole('pi'),
  weight: 3,
  team: 'villagers',
  emoji: Emoji('👻'),
  cardCount: 1,
  description: `You have a one-time use power where you can inspect a player. You're told if that player or one of their neighbors is a Werewolf.`,
  hints: [
    `This is a very strong power that only grows in importance as the game moves along.`,
    `Try waiting until a few people are in question.`,
  ],
  image: require('../../static/pi.png'),
  profile: require('../../static/pi-profile.png'),
  SetupRoleView: GenericSetupRoleView,
  appearsBad: always(false),
  randomlySelectable: true,
  canFrankensteinAbsorbIt: true,
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.protection,
  },
})
