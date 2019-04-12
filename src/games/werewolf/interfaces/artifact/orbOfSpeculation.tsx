import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { artifactKill, endGame } from '../actions'
import { values } from 'ramda'
import { isWerewolf } from '../../helpers/isWerewolf'
import { getCard } from '../card/cards'
import { PromptView, ByArtifact } from '../prompt'
import { ArtifactType } from '../../../../helpers/id'
import { ChooseWerewolfPlayer } from '../../components/chooseWerewolfPlayer'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const player = game.players[playerId]

  return (
    <ChooseWerewolfPlayer
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      doneText="select player"
      numToSelect={2}
      onDone={([one, two]) => {
        if (
          isWerewolf(game.players[one.id], game) &&
          isWerewolf(game.players[two.id], game)
        ) {
          const team = getCard(player.role).team
          done([
            endGame({
              message: `${player.name ||
                player.id} guessed correctly, ${team} wins!`,
              team,
            }),
          ])
        } else {
          done([artifactKill({ target: player.id })])
        }
      }}
    />
  )
}

export const OrbOfSpeculation = Artifact({
  type: ArtifactType('orb of speculation'),
  title: 'Orb of Speculation',
  category: 'Chaos',
  description:
    'Choose two players. If both of them are werewolves the village team wins and the game is over. If they are not, you are instantly eliminated.',
  infinite: false,
  ActivateView,
})
