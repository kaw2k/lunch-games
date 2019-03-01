import * as React from 'react'
import { Artifact, ArtifactViewComponent } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { artifactKill, endGame } from '../actions'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { values } from 'ramda'
import { isWerewolf } from '../../helpers/isWerewolf'
import { getCard } from '../card/cards'

const ActivateView: ArtifactViewComponent = ({
  artifactState,
  back,
  player,
}) => {
  const { runActions, game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)

  return (
    <ChoosePlayers
      title={artifact.title}
      description={artifact.description}
      players={values(game.players).filter(p => p.alive)}
      columns={2}
      cancelText="cancel"
      onCancel={back}
      doneText="select player"
      numToSelect={2}
      onDone={([one, two]) => {
        if (
          isWerewolf(game.players[one], game) &&
          isWerewolf(game.players[two], game)
        ) {
          const team = getCard(player.role).team
          runActions([
            endGame({
              message: `${player.name ||
                player.id} guessed correctly, ${team} wins!`,
              team,
            }),
          ])
        } else {
          runActions([artifactKill({ target: player.id })])
        }

        back()
      }}
    />
  )
}

export const OrbOfSpeculation = Artifact({
  type: 'orb of speculation',
  title: 'Orb of Speculation',
  description:
    'Choose two players. If both of them are werewolves the village team wins and the game is over. If they are not, you are instantly eliminated.',
  infinite: false,
  ActivateView,
  MorningView: null,
})
