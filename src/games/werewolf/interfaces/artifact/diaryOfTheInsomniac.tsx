import * as React from 'react'
import { Artifact } from '.'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { getArtifact } from './artifacts'
import { isWerewolf } from '../../helpers/isWerewolf'
import { getCard } from '../card/cards'
import { PromptView, ByArtifact } from '../prompt'
import { Typography } from '@material-ui/core'
import { ActionRow } from '../../../../components/actionRow'
import { Button } from '../../../../components/button'
import { getNeighbor } from '../../helpers/neighbors'
import { playerName } from '../../../../components/playerName'

const ActivateView: PromptView<ByArtifact> = ({
  done,
  prompt: { artifact: artifactState, player: playerId },
}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const artifact = getArtifact(artifactState.type)
  const player = game.players[playerId]

  const left = getNeighbor(player.id, 'left', game)
  const leftPlayer = left && game.players[left]
  const right = getNeighbor(player.id, 'right', game)
  const rightPlayer = right && game.players[right]

  // TODO: Move this out to a helper. We eventually need to consider fang face
  const didEitherWakeUp =
    (rightPlayer &&
      (rightPlayer.secondaryRole ||
        getCard(rightPlayer.role).night ||
        isWerewolf(rightPlayer, game))) ||
    (leftPlayer &&
      (leftPlayer.secondaryRole ||
        getCard(leftPlayer.role).night ||
        isWerewolf(leftPlayer, game)))

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {artifact.title}
      </Typography>
      <Typography component="em" gutterBottom>
        {artifact.description}
      </Typography>

      <Typography>
        One of your neighbors ({leftPlayer && playerName(leftPlayer)} or
        {rightPlayer && playerName(rightPlayer)}){' '}
        {didEitherWakeUp ? 'woke up' : `didn't wake up`} last night.
      </Typography>

      <ActionRow fixed>
        <Button color="green" onClick={() => done([])}>
          done
        </Button>
      </ActionRow>
    </>
  )
}

export const DiaryOfTheInsomniac = Artifact({
  type: 'diary of the insomniac',
  title: 'Diary of the Insomniac',
  description:
    'You are told if either of your neighbors woke up the previous night.',
  infinite: false,
  category: 'Imitate Role',
  ActivateView,
})
