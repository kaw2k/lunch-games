import * as React from 'react'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { values } from 'ramda'
import { werewolfKill, updatePlayer } from '../actions'
import { always } from 'ramda'
import { Card } from '.'
import { Emoji } from '../emoji'
import { NightMessageOrder } from '../nightMessage'
import { GenericSetupWerewolfRoleView } from '../../components/setupRole/genericWerewolfViewRole'
import { isWerewolf } from '../../helpers/isWerewolf'
import { NightViewBase } from '../../components/night/nightActionViewBase'
import { PromptView } from '../prompt'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { Typography } from '@material-ui/core'
import { NoNightActionView } from '../../components/night/noNightActionView'

type WerewolfKill = ReturnType<typeof werewolfKill>

const title = 'Alpha Wolf, wake up!'

const NightView: PromptView = ({ done, prompt }) => {
  const { game } = React.useContext(WerewolfGameContext)

  const playerId =
    (prompt.type === 'by role' || prompt.type === 'by name') && prompt.player

  if (!playerId) {
    return <NoNightActionView done={() => done([])} data={title} />
  }

  const isSomeoneAlreadyMarked = !!values(game.players).find(
    p => !!p.markedByAlphaWolf
  )
  const hasWerewolfDied = values(game.players).find(
    p => !p.alive && isWerewolf(p, game)
  )
  const canConvertSomeone = !isSomeoneAlreadyMarked && hasWerewolfDied
  const convertiblePlayers = game.actions.filter(
    a => a.type === 'werewolf kill'
  ) as WerewolfKill[]

  return (
    <NightViewBase done={done} prompt={prompt} title={title}>
      {!canConvertSomeone && (
        <>
          <Typography variant="h2">
            {!hasWerewolfDied
              ? 'You must wait for a werewolf to die before you can convert someone'
              : 'You already converted someone'}
          </Typography>

          <ActionRow fixed>
            <Button color="green" onClick={() => done([])}>
              continue
            </Button>
          </ActionRow>
        </>
      )}

      {canConvertSomeone && (
        <ChoosePlayers
          description="These are the players the werewolves are trying to kill. If the player you choose would get killed, they are instead converted to a werewolf. Otherwise you can try again tomorrow night. "
          players={convertiblePlayers.map(a => game.players[a.target])}
          cancelText="continue"
          onCancel={() => done([])}
          doneText="convert player"
          onDone={([target]) => {
            done([
              updatePlayer({
                target,
                updates: {
                  markedByAlphaWolf: true,
                },
              }),
            ])
          }}
        />
      )}
    </NightViewBase>
  )
}

export const AlphaWolf = Card({
  role: 'alpha wolf',
  weight: -9,
  team: 'werewolves',
  emoji: Emoji('🐻'),
  cardCount: 1,
  description: `Once per game, following the elimination of a wolf during the day, you may turn the wolves target into a wolf instead of eliminating them.`,
  hints: [`Pretty strong, have fun!`],
  image: require('../../static/unknown.png'),
  profile: require('../../static/unknown-profile.png'),
  SetupRoleView: GenericSetupWerewolfRoleView,
  randomlySelectable: true,
  appearsBad: always(true),
  night: {
    title,
    ModeratorView: NightView,
    PlayerView: NightView,
    order: NightMessageOrder.postWerewolf - 1,
  },
})
