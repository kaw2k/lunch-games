import * as React from 'react'
import { PreviousGovernment } from '../../interfaces/game'
import { PlayerSecretHitler } from '../../interfaces/player'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { isGameOver } from '../../helpers/isGameOver'
import { sanitizeCards } from '../../helpers/sanitizeCards'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import { PlayerCard } from '../../../../components/card/player'

interface Props {
  cancel: () => void
}

export const MyTurn: React.SFC<Props> = ({ cancel }) => {
  const { player, game, endGame, updateGame } = React.useContext(
    SecretHitlerGameContext
  )

  function proceed(government: PreviousGovernment | null) {
    const fascists = game.playedCards.filter(c => c.card === 'fascist')

    if (!government) {
      cancel()

      if (game.chaos + 1 === 3) {
        const nextGame = sanitizeCards({
          ...game,
          playedCards: game.playedCards.concat({
            card: game.remainingCards[0],
            government: null,
          }),
          remainingCards: game.remainingCards.slice(1),
          previousGovernment: null,
          message: `A random card was played and it was a ${
            game.remainingCards[0]
          }`,
          chaos: 0,
        })
        const gameOver = isGameOver(nextGame)

        if (gameOver) {
          endGame(gameOver, `The random card ended the game, ${gameOver}s win!`)
        } else {
          updateGame(nextGame)
        }
      } else {
        updateGame({
          ...game,
          chaos: game.chaos + 1,
        })
      }
    } else if (government.chancellor.role.isHitler && fascists.length >= 3) {
      endGame(
        'fascist',
        `${government.chancellor.name ||
          government.chancellor
            .id} is hitler and was elected chancellor, fascists win!`
      )
    } else {
      updateGame(
        sanitizeCards({
          ...game,
          government: {
            ...government,
            cards: game.remainingCards.slice(0, 3),
            veto: null,
          },
          remainingCards: game.remainingCards.slice(3),
          chaos: 0,
        })
      )
      cancel()
    }
  }

  return (
    <ChoosePlayers
      title="Choose your chancellor"
      description={`It is your turn, choose who you want to be your chancellor. Call for a vote, if it passes, select "goes" otherwise select "rejected". `}
      players={values(game.players).filter(p => p.living && p.id !== player.id)}
      renderPlayer={({ item, ...props }) => (
        <PlayerCard
          player={item}
          key={item.id}
          disabled={
            !!game.previousGovernment &&
            (game.previousGovernment.president.id === item.id ||
              game.previousGovernment.chancellor.id === item.id)
          }
          {...props}
        />
      )}
      onCancel={cancel}
      altText="rejected"
      onAlt={() => proceed(null)}
      doneText="goes"
      onDone={([chancellor]) => {
        proceed({
          president: player,
          chancellor: chancellor as PlayerSecretHitler,
        })
      }}
    />
  )
}
