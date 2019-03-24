import { WerewolfGame } from '../interfaces/game'
import { PlayerId } from '../../../interfaces/player'
import { ArtifactState } from '../interfaces/artifact'
import values from 'ramda/es/values'

interface ActiveArtifact {
  player: PlayerId
  artifactState: ArtifactState
}

export const isAnotherArtifactActive = (game: WerewolfGame): ActiveArtifact | null => {
  return values(game.players).reduce<ActiveArtifact | null>((memo, player) => {
    if (!player.alive) return memo

    const artifactState = player.artifacts.find(a => a.activated === 'playing')
    if (artifactState) return memo || { player: player.id, artifactState }

    return memo
  }, null)
}
