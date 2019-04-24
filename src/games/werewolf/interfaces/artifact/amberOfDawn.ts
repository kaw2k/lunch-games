import { Artifact, ArtifactState } from '.'
import { ArtifactType } from '../../../../helpers/id'
import { values, contains } from 'ramda'
import { getArtifact, Artifacts } from './artifacts'
import { giveArtifact, Actions } from '../actions'
import { shuffle } from '../../../../helpers/shuffle'

export const AmberOfDawn = Artifact({
  type: ArtifactType('amber of dawn'),
  category: 'Chaos',
  title: 'Amber of Dawn',
  description:
    'All players who have revealed 1 use artifacts receive new artifacts.',
  infinite: false,
  ActivateCallback: ({ done, game, prompt: { player: playerId } }) => {
    let usedArtifacts = values(game.players).reduce<Artifacts[]>((memo, p) => {
      return memo.concat(p.artifacts.map(a => a.type))
    }, [])
    let remainingArtifacts = shuffle(
      Artifacts.map(a => a.type).filter(a => !contains(a, usedArtifacts))
    )

    const players = values(game.players).filter(p =>
      p.artifacts.find(
        a =>
          (a.activated === 'played' && !getArtifact(a.type).infinite) ||
          p.id === playerId
      )
    )

    let actions: Actions[] = []

    players.forEach(p => {
      const nextArtifact = remainingArtifacts[0]
      if (nextArtifact) {
        actions = actions.concat(
          giveArtifact({ target: p.id, artifact: ArtifactState(nextArtifact) })
        )
        remainingArtifacts = remainingArtifacts.slice(1)
      }
    })

    done(actions)
  },
})
