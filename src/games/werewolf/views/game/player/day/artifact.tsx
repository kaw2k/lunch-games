import * as React from 'react'
import { PlayerWerewolf } from '../../../../interfaces/player'
import { ArtifactView } from '../../../../components/artifact/artifactView'

interface Props {
  player: PlayerWerewolf
}

export const WerewolfPlayerDayArtifact: React.SFC<Props> = ({ player }) => {
  return (
    <>
      {player.artifacts.map(artifactState => (
        <ArtifactView
          showPlay
          key={artifactState.type}
          player={player}
          artifactState={artifactState}
        />
      ))}
    </>
  )
}
