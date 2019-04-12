import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { Button } from '../../../../../components/button'
import { ActionRow } from '../../../../../components/actionRow'
import { WerewolfPlayerCard } from '../../../components/werewolfPlayerCard'
import {
  voteKill,
  showPrompts,
  sudoKill,
  revivePlayer,
  addDelayedAction,
  updateArtifact,
} from '../../../interfaces/actions'
import { values, sortBy } from 'ramda'
import { startNight } from '../../../helpers/gameEngine'
import { PlayerId } from '../../../../../interfaces/player'
import { useTimer } from '../../../../../hooks/useTimer'
import { Typography } from '@material-ui/core'
import { hasRole } from '../../../interfaces/card/cards'
import { Mason } from '../../../interfaces/card/mason'
import { ArtifactView } from '../../../components/artifact/artifactView'
import { isAnotherArtifactActive } from '../../../helpers/artifact'
import { getArtifact } from '../../../interfaces/artifact/artifacts'
import { Id } from '../../../../../helpers/id'
import { Grid } from '../../../../../components/grid'
import { makeStyles } from '@material-ui/styles'

interface Props {}

const useStyles = makeStyles({
  selectedPlayer: {
    width: '200px',
    margin: '0 auto 2em',
  },
})

export const DayModerator: React.SFC<Props> = () => {
  const { game, updateGame, runActions } = React.useContext(WerewolfGameContext)
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerId | null>(
    null
  )
  const classes = useStyles()
  const time = useTimer(game.timer || Date.now(), game.options.dayTimeLimit)

  const activeArtifact = isAnotherArtifactActive(game)
  if (activeArtifact) {
    const View = getArtifact(activeArtifact.artifactState.type).ActivateView
    if (View) {
      return (
        <View
          done={actions => {
            runActions([
              updateArtifact({
                target: activeArtifact.player,
                artifact: activeArtifact.artifactState.type,
                updates: {
                  activated: 'played',
                },
              }),
              ...actions,
            ])
          }}
          prompt={{
            type: 'by artifact',
            artifact: activeArtifact.artifactState,
            id: Id(),
            player: activeArtifact.player,
          }}
        />
      )
    }
  }

  if (selectedPlayer) {
    const player = game.players[selectedPlayer]

    return (
      <>
        <WerewolfPlayerCard
          className={classes.selectedPlayer}
          player={player}
          showLiving
          showRole
        />

        {player.artifacts.map(artifactState => (
          <ArtifactView
            showPlay
            artifactState={artifactState}
            player={player}
          />
        ))}

        <ActionRow>
          <Button
            confirm="you should only use this as a last resort"
            onClick={() => {
              runActions([sudoKill({ target: player.id }), showPrompts({})])
              setSelectedPlayer(null)
            }}>
            Moderator Kill
          </Button>

          {!player.alive && (
            <Button
              confirm
              onClick={() => {
                runActions([revivePlayer({ target: player.id })])
                setSelectedPlayer(null)
              }}>
              Revive
            </Button>
          )}

          {hasRole(Mason.role, game) && (
            <Button
              confirm
              onClick={() => {
                setSelectedPlayer(null)
                runActions([
                  addDelayedAction({
                    delayedAction: {
                      occurrence: 'once',
                      time: 'night',
                      day: game.day,
                      action: sudoKill({ target: player.id }),
                    },
                  }),
                ])
              }}>
              they said the word mason
            </Button>
          )}
        </ActionRow>

        <Button
          color="red"
          onClick={() => {
            runActions([voteKill({ target: player.id }), showPrompts({})])
            setSelectedPlayer(null)
          }}>
          Lynch/Kill
        </Button>

        <ActionRow fixed>
          <Button onClick={() => setSelectedPlayer(null)}>cancel</Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      {!!game.options.dayTimeLimit && (
        <Typography variant="h2">{time.message}</Typography>
      )}

      <Typography component="em">
        {values(game.players).filter(p => p.alive).length} living players
      </Typography>

      <Grid>
        {sortBy(p => !p.alive, values(game.players)).map(player => (
          <WerewolfPlayerCard
            showRole
            showLiving
            key={player.id}
            player={player}
            onClick={() => setSelectedPlayer(player.id)}
          />
        ))}
      </Grid>

      <ActionRow fixed>
        <Button
          color="green"
          confirm
          onClick={() => updateGame(startNight(game))}>
          start night
        </Button>
      </ActionRow>
    </>
  )
}
