import * as React from 'react'
import { PreviousGovernment, SecretHitlerGame } from '../../interfaces/game'
import { PlayerSecretHitler } from '../../interfaces/player'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import values from 'ramda/es/values'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { isGameOver } from '../../helpers/isGameOver'

interface Props {
  cancel: () => void
}

export const MyTurn: React.SFC<Props> = ({ cancel }) => {
  const { player, game, endGame, updateGame } = React.useContext(
    SecretHitlerGameContext
  )
  const [chancellor, setChancellor] = React.useState<PlayerSecretHitler | null>(
    null
  )

  function proceed(government: PreviousGovernment | null) {
    const fascists = game.playedCards.filter(c => c === 'fascist')

    if (!government) {
      cancel()

      if (game.chaos + 1 === 3) {
        const nextGame: SecretHitlerGame = {
          ...game,
          playedCards: game.playedCards.concat(game.remainingCards[0]),
          remainingCards: game.remainingCards.slice(1),
          chaos: 0,
        }
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
      updateGame({
        ...game,
        government: {
          ...government,
          cards: game.remainingCards.slice(0, 3),
          veto: null,
        },
        remainingCards: game.remainingCards.slice(3),
        chaos: 0,
      })
      cancel()
    }
  }

  return (
    <Layout padded>
      <h1>Choose your chancellor</h1>
      <p>
        It is your turn, choose who you want to be your chancellor. Call for a
        vote, if it passes, select "goes" otherwise select "rejected".
      </p>

      {values(game.players)
        .filter(p => p.living && p.id !== player.id)
        .map(p => (
          <Profile
            key={p.id}
            text={p.name || p.id}
            image={p.profileImg}
            onClick={() => setChancellor(p)}
            selected={!!(chancellor && p.id === chancellor.id)}
            disabled={
              !!game.previousGovernment &&
              (game.previousGovernment.president.id === p.id ||
                game.previousGovernment.chancellor.id === p.id)
            }
          />
        ))}

      <ActionRow>
        <Button padded onClick={cancel}>
          cancel
        </Button>
        <Button padded onClick={() => proceed(null)}>
          rejected
        </Button>
        <Button
          padded
          disabled={!chancellor}
          onClick={() =>
            proceed({
              president: player,
              chancellor: chancellor as PlayerSecretHitler,
            })
          }>
          goes
        </Button>
      </ActionRow>
    </Layout>
  )
}
