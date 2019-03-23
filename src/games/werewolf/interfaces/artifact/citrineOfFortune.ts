import { Artifact, ArtifactState } from '.'
import { Artifacts } from './artifacts'
import { values } from 'ramda'
import contains from 'ramda/es/contains'
import { shuffle } from '../../../../helpers/shuffle'
import { giveArtifact, destroyArtifact } from '../actions'
import { ArtifactType } from '../../../../helpers/id'

export const CitrineOfFortune = Artifact({
  type: ArtifactType('citrine of fortune'),
  title: 'Citrine of Fortune',
  category: 'Chaos',
  description:
    'Exchange this Artifact for a new one which must be revealed instantly.',
  infinite: false,
  ActivateCallback: ({ game, done, prompt: { player: playerId } }) => {
    const usedArtifacts = values(game.players).reduce<Artifacts[]>(
      (memo, p) => {
        return memo.concat(p.artifacts.map(a => a.type))
      },
      []
    )
    const nextArtifactType = shuffle(
      Artifacts.map(a => a.type).filter(a => !contains(a, usedArtifacts))
    )[0]

    done([
      destroyArtifact({
        target: playerId,
        artifact: CitrineOfFortune.type,
      }),
      giveArtifact({
        target: playerId,
        artifact: ArtifactState(nextArtifactType, {
          activated: 'unplayed',
        }),
      }),
    ])
  },
})
