import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { getCard } from '../../interfaces/card/cards'
import { NoNightActionView } from './noNightActionView'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { isModerator } from '../../helpers/isModerator'
import { actionToString } from '../../interfaces/actions'
import { PromptViewProps } from '../../interfaces/prompt'
import { useTimer } from '../../../../hooks/useTimer'
import { playerName } from '../../../../components/playerName'

interface Props extends PromptViewProps {
  title: string
}

export const NightViewBase: React.SFC<Props> = ({
  done,
  title,
  prompt,
  children,
}) => {
  const { game, player } = React.useContext(WerewolfGameContext)
  const time = useTimer(game.timer || Date.now(), game.options.nightTimeLimit)

  if (prompt.type === 'by artifact') {
    return (
      <NoNightActionView
        done={() => done([])}
        data="artifacts are not supported at night"
      />
    )
  }

  if (prompt.type === 'by message') {
    return <NoNightActionView done={() => done([])} data={prompt.message} />
  }

  const card = getCard(prompt.role)
  const hasNightAction = !!card.night
  if (game.time !== 'night') return null

  if (
    (prompt.type === 'by name' && !hasNightAction) ||
    (prompt.type === 'by role' &&
      (!prompt.player || !game.players[prompt.player].alive)) ||
    (prompt.type === 'by team' && !prompt.players.length)
  ) {
    return (
      <NoNightActionView
        done={() => done([])}
        data={prompt.type === 'by name' ? prompt.player : title}
      />
    )
  }

  if (!!game.playerInteraction.ready && isModerator(player, game)) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          The player(s) have made a decision
        </Typography>

        {game.playerInteraction.actions
          .filter(x => x)
          .map((action, i) => (
            <Typography key={i}>{actionToString(action)}</Typography>
          ))}

        <ActionRow fixed>
          <Button
            onClick={() => done(game.playerInteraction.actions)}
            color="green">
            accept
          </Button>
        </ActionRow>
      </>
    )
  }

  if (!!game.options.nightTimeLimit && time.timesUp) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          {time.message}
        </Typography>
        <ActionRow fixed>
          <Button onClick={() => done([])} color="green">
            continue
          </Button>
        </ActionRow>
      </>
    )
  }

  let names = ''
  if (prompt.type === 'by role' && prompt.player) {
    names = playerName(prompt.player, game)
  }
  if (prompt.type === 'by team' && prompt.players.length) {
    names = prompt.players.map(id => playerName(id, game)).join(', ')
  }

  return (
    <>
      <Typography gutterBottom variant="h2">
        {prompt.type === 'by name' &&
          `${playerName(game.players[prompt.player])}, wake up! Do the thing!`}

        {(prompt.type === 'by role' || prompt.type === 'by team') && title}
      </Typography>

      {isModerator(player, game) && names && (
        <Typography gutterBottom component="em">
          SECRET: {names}
        </Typography>
      )}

      {!!game.options.nightTimeLimit && (
        <Typography gutterBottom variant="h2">
          {time.message}
        </Typography>
      )}

      {children}
    </>
  )
}
