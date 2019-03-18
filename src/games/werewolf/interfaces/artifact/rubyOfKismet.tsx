import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact, ArtifactState } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { Typography } from '@material-ui/core'
import { values } from 'ramda'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { WerewolfProfile } from '../../components/werewolfProfile'
import { PlayerId } from '../../../../interfaces/player'
import { playerName } from '../../../../components/playerName'
import { ArtifactView } from '../../components/artifact/artifactView'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { player: playerId, artifact: artifactState },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [selectedPlayers, setSelectedPlayers] = React.useState<PlayerId[]>([])
  const artifact = getArtifact(artifactState.type)

  const playersWithUnusedArtifacts = values(game.players).filter(p => {
    return !!p.artifacts.find(a => a.activated === 'unplayed')
  })

  if (selectedPlayers.length) {
    type A = [PlayerId, ArtifactState]
    const artifacts = selectedPlayers.reduce<A[]>((memo, player) => {
      const artifacts = game.players[player].artifacts
        .filter(a => a.activated === 'unplayed')
        .map<A>(a => [player, a])

      return memo.concat(artifacts)
    }, [])

    return (
      <>
        {artifacts.map(([playerId, artifactState]) => (
          <>
            <Typography gutterBottom variant="h2">
              {playerName(playerId, game)}
            </Typography>
            <ArtifactView
              player={game.players[playerId]}
              artifactState={artifactState}
            />
          </>
        ))}

        <ActionRow fixed>
          <Button color="green" onClick={() => done([])}>
            done
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      removePlayer={game.players[playerId]}
      players={playersWithUnusedArtifacts}
      columns={2}
      numToSelect={2}
      notExact
      doneText="choose players"
      onDone={targets => setSelectedPlayers(targets)}>
      {props => <WerewolfProfile key={props.player.id} {...props} />}
    </ChoosePlayers>
  )
}

export const RubyOfKismet = Artifact({
  type: 'ruby of kismet',
  title: 'Ruby of Kismet',
  description:
    'Choose two players and have each of them reveal their artifacts in the order you choose.',
  infinite: false,
  category: 'Target Other Artifacts',
  ActivateView,
})
