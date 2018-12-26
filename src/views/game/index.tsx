import * as React from 'react'
import { MyTurn } from './myTurn'
import { Overview } from './overview'
import { SelectCards } from './selectCards'
import { sanitizeCards, getBoardEffect, isGameOver } from '../../helpers/game'
import { PerformPower } from './performPower'
import { GameContext } from '../../helpers/contexts'

interface Props {}

export const GameView: React.SFC<Props> = () => {
  const { game, player, updateGame, endGame } = React.useContext(GameContext)
  const [isMyTurn, setIsMyTurn] = React.useState(false)

  // Check if a president needs to perform some action
  const fascists = game.playedCards.filter(c => c === 'fascist')
  const power = getBoardEffect(game.players.length, fascists.length)
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
        discard={(discard, remaining, veto = null) => {
          if (!game.government) return
          if (remaining.length === 2) {
            updateGame({
              discardedCards: game.discardedCards.concat(discard),
              government: {
                ...game.government,
                cards: remaining,
                veto,
              },
            })
          } else if (remaining.length === 1) {
            const discardedCards = game.discardedCards.concat(discard)
            const playedCards = game.playedCards.concat(remaining[0])
            const hasEffect = !!getBoardEffect(game.players, playedCards)

            if (game.government.veto && veto) {
              updateGame(
                sanitizeCards({
                  ...game,
                  previousGovernment: null,
                  government: null,
                  performPower: null,
                  discardedCards: game.discardedCards
                    .concat(discard)
                    .concat(playedCards),
                })
              )
            } else {
              const updatedGame = sanitizeCards({
                ...game,
                discardedCards: discardedCards,
                playedCards: playedCards,
                performPower:
                  hasEffect && remaining[0] === 'fascist'
                    ? game.government.president
                    : null,
                government: null,
                previousGovernment: {
                  president: game.government.president,
                  chancellor: game.government.chancellor,
                },
              })

              if (isGameOver(updatedGame)) {
                endGame(isGameOver(updatedGame))
              } else {
                updateGame(updatedGame)
              }
            }
          }
        }}
      />
    )
  }

  if (isMyTurn) {
    return (
      <MyTurn
        cancel={() => setIsMyTurn(false)}
        proceed={government => {
          if (!government) {
            setIsMyTurn(false)

            if (game.chaos + 1 === 3) {
              updateGame({
                ...game,
                playedCards: game.playedCards.concat(game.remainingCards[0]),
                remainingCards: game.remainingCards.slice(1),
                chaos: 0,
              })
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
            endGame('fascist')
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
