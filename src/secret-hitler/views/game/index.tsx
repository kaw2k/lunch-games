import * as React from 'react'
import { MyTurn } from './myTurn'
import { Overview } from './overview'
import { SelectCards } from './selectCards'
import { PerformPower } from './performPower'
import { getBoardEffect } from '../../helpers/getBoardEffect'
import { sanitizeCards } from '../../helpers/sanitizeCards'
import { isGameOver } from '../../helpers/isGameOver'
import { SecretHitlerGame } from '../../interfaces/game'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {}

export const GameView: React.SFC<Props> = () => {
  const { game, player, updateGame, endGame } = React.useContext(
    SecretHitlerGameContext
  )
  const [isMyTurn, setIsMyTurn] = React.useState(false)

  // Check if a president needs to perform some action
  const fascists = game.playedCards.filter(c => c === 'fascist')
  const power = getBoardEffect(game.players, fascists.length)
  if (power && game.performPower && game.performPower.id === player.id) {
    return <PerformPower power={power} />
  }

  // If we are in the current government, show the card screen
  if (
    game.government &&
    (game.government.president.id === player.id ||
      game.government.chancellor.id === player.id)
  ) {
    return (
      <SelectCards
        government={game.government}
        discard={(cards, discarded, veto = null) => {
          if (!game.government) return
          if (cards.length === 2) {
            updateGame({
              discardedCards: game.discardedCards.concat(discarded),
              government: {
                ...game.government,
                cards,
                veto,
              },
            })
          } else if (cards.length === 1) {
            const discardedCards = game.discardedCards.concat(discarded)
            const playedCards = game.playedCards.concat(cards[0])
            const hasEffect = !!getBoardEffect(game.players, playedCards)

            if (game.government.veto && veto) {
              updateGame(
                sanitizeCards({
                  ...game,
                  previousGovernment: null,
                  government: null,
                  performPower: null,
                  message: 'both players decided to veto',
                  discardedCards: game.discardedCards
                    .concat(discarded)
                    .concat(cards),
                })
              )
            } else {
              const updatedGame = sanitizeCards({
                ...game,
                discardedCards: discardedCards,
                playedCards: playedCards,
                performPower:
                  hasEffect && cards[0] === 'fascist'
                    ? game.government.president
                    : null,
                government: null,
                message: `${game.government.chancellor.name} played a ${
                  cards[0]
                }`,
                previousGovernment: {
                  president: game.government.president,
                  chancellor: game.government.chancellor,
                },
              })

              const gameOver = isGameOver(updatedGame)
              if (gameOver) {
                endGame(gameOver, `A ${cards[0]} was played, ${gameOver}s win!`)
              } else {
                updateGame(updatedGame)
              }
            }
          }
        }}
      />
    )
  }

  if (!game.government && isMyTurn) {
    return (
      <MyTurn
        cancel={() => setIsMyTurn(false)}
        proceed={government => {
          if (!government) {
            setIsMyTurn(false)

            if (game.chaos + 1 === 3) {
              const nextGame: SecretHitlerGame = {
                ...game,
                playedCards: game.playedCards.concat(game.remainingCards[0]),
                remainingCards: game.remainingCards.slice(1),
                chaos: 0,
              }
              const gameOver = isGameOver(nextGame)

              if (gameOver) {
                endGame(
                  gameOver,
                  `The random card ended the game, ${gameOver}s win!`
                )
              } else {
                updateGame(nextGame)
              }
            } else {
              updateGame({
                ...game,
                chaos: game.chaos + 1,
              })
            }
          } else if (
            government.chancellor.role.isHitler &&
            fascists.length >= 3
          ) {
            endGame(
              'fascist',
              `${
                government.chancellor.name
              } is hitler and was elected chancellor, fascists win!`
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
            setIsMyTurn(false)
          }
        }}
      />
    )
  }

  return <Overview myTurn={() => setIsMyTurn(true)} />
}
