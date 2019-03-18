import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
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
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerId | null>(
    null
  )
  const artifact = getArtifact(artifactState.type)

  const playersWithUnusedArtifacts = values(game.players).filter(p => {
    return !!p.artifacts.find(a => a.activated === 'unplayed')
  })

  if (selectedPlayer) {
    const p = game.players[selectedPlayer]
    return (
      <>
        <Typography variant="h2" gutterBottom>
          {playerName(selectedPlayer, game)}'s Artifacts
        </Typography>

        {p.artifacts
          .filter(a => a.activated === 'unplayed')
          .map(a => (
            <ArtifactView key={a.type} artifactState={a} player={p} />
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
      columns={2}
      removePlayer={game.players[playerId]}
      players={playersWithUnusedArtifacts}
      doneText="choose player"
      onDone={([target]) => setSelectedPlayer(target)}>
      {props => <WerewolfProfile key={props.player.id} {...props} />}
    </ChoosePlayers>
  )
}

export const AmethystOfKnowledge = Artifact({
  type: 'amethyst of knowledge',
  title: 'Amethyst of Knowledge',
  description:
    'Choose a player with an unrevealed artifact and secretly view it. Decide if you want that player to reveal that artifact now.',
  infinite: false,
  category: 'Target Other Artifacts',
  ActivateView,
})
