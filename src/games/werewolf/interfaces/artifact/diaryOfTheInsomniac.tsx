import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { PromptView, ByArtifact } from '../prompt'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { getInsomniacMessage } from '../../helpers/getInsomniacMessage'
import { ArtifactType } from '../../../../helpers/id'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const player = game.players[playerId]

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {artifact.title}
      </Typography>
      <Typography component="em" gutterBottom>
        {artifact.description}
      </Typography>

      <Typography>{getInsomniacMessage(player, game)}</Typography>

      <ActionRow fixed>
        <Button color="green" onClick={() => done([])}>
          done
        </Button>
      </ActionRow>
    </>
  )
}

export const DiaryOfTheInsomniac = Artifact({
  type: ArtifactType('diary of the insomniac'),
  title: 'Diary of the Insomniac',
  description:
    'You are told if either of your neighbors woke up the previous night.',
  infinite: false,
  category: 'Imitate Role',
  ActivateView,
})
