import * as React from 'react'
import cx from 'classnames'
import { Party, Government } from '../../interfaces/game'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { ActionRow } from '../../../components/actionRow'
import { remove } from 'ramda'
import includes from 'ramda/es/includes'
import indexOf from 'ramda/es/indexOf'
import contains from 'ramda/es/contains'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { isGameOver } from '../../helpers/isGameOver'
import { sanitizeCards } from '../../helpers/sanitizeCards'
import { getBoardEffect } from '../../helpers/getBoardEffect'

import { RED, TEAL } from '../../../helpers/colors'
import { Asset } from '../../components/asset'

interface Props {
  government: Government
}

export const SelectCards: React.SFC<Props> = ({ government }) => {
  const { player, game, updateGame, endGame } = React.useContext(
    SecretHitlerGameContext
  )
  const [cardIndices, setCardIndices] = React.useState<number[]>([])
  const [chancellorViewCards, setViewCards] = React.useState<boolean>(false)
  const fascists = game.playedCards.filter(c => c === 'fascist').length

  const [selected, discarded] = government.cards.reduce<[Party[], Party[]]>(
    ([s, d], party, i) => {
      if (contains(i, cardIndices)) {
        return [[...s, party], d]
      } else {
        return [s, [...d, party]]
      }
    },
    [[], []]
  )

  function discard(
    cards: Party[],
    discard: Party[],
    veto: boolean | null = null
  ) {
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
            discardedCards: game.discardedCards.concat(discarded).concat(cards),
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
          message: `${game.government.chancellor.name ||
            game.government.chancellor.id} played a ${cards[0]}`,
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
  }

  function updateCards(i: number) {
    if (includes(i, cardIndices)) {
      setCardIndices(remove(indexOf(i, cardIndices), 1, cardIndices))
    } else {
      setCardIndices([i, ...cardIndices].slice(0, government.cards.length - 1))
    }
  }

  const disabled =
    (government.cards.length === 3 && selected.length !== 2) ||
    (government.cards.length === 2 && selected.length !== 1)

  if (player.id === government.president.id && government.cards.length !== 3) {
    return (
      <Layout padded>
        <h1>
          Waiting for {government.chancellor.name || government.chancellor.id}{' '}
          to play
        </h1>
        <p>
          Your done with your part, you are not allowed to speak until the cards
          are fully played
        </p>
      </Layout>
    )
  }

  if (player.id === government.chancellor.id && government.cards.length !== 2) {
    return (
      <Layout padded>
        <h1>
          Waiting for {government.president.name || government.president.id} to
          play
        </h1>
        <p>
          When the president is done selecting which cards they want to play you
          will get a button to view them, and then play one.
        </p>
      </Layout>
    )
  }

  if (player.id === government.chancellor.id && !chancellorViewCards) {
    return (
      <Layout padded>
        <h1>
          {government.president.name || government.president.id} has passed you
          cards, are you ready?
        </h1>
        <ActionRow>
          <Button padded onClick={() => setViewCards(true)}>
            yes
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  return (
    <Layout padded>
      {government.cards.length === 3 && (
        <React.Fragment>
          <h1>Which two cards do you want to pass to the chancellor?</h1>
          <p>Select both of them and then press "pass".</p>
          {fascists === 5 && (
            <p>
              To veto, select a card and press veto. The remaining two cards
              will be sent to your chancellor, they can veto the same way.
            </p>
          )}
        </React.Fragment>
      )}
      {government.cards.length === 2 && (
        <React.Fragment>
          <h1>Which card would you like to play?</h1>
          <p>Select the card you want to play and press "play".</p>
          {fascists === 5 && (
            <p>
              To veto, select a card and press veto. The remaining two cards
              will be sent to your chancellor, they can veto the same way.
            </p>
          )}
        </React.Fragment>
      )}

      <div className="row">
        {government.cards.map((card, i) => (
          <button
            className={cx('card', {
              blue: card === 'liberal',
              red: card === 'fascist',
            })}
            key={i}
            onClick={() => updateCards(i)}>
            <Asset asset={card === 'fascist' ? 'cardFail' : 'cardSuccess'} />
            {contains(i, cardIndices) && (
              <div className="checked">&#10003;</div>
            )}
          </button>
        ))}
      </div>

      <ActionRow fixed>
        {fascists === 5 && (
          <Button
            padded
            disabled={disabled}
            onClick={() => {
              if (disabled) return
              discard(selected, discarded, true)
            }}>
            veto
          </Button>
        )}
        <Button
          disabled={disabled}
          padded
          color="green"
          onClick={() => {
            if (disabled) return
            discard(selected, discarded)
          }}>
          {government.cards.length === 3 ? 'pass' : 'play'}
        </Button>
      </ActionRow>

      <style jsx>{`
        .card {
          flex: 0 1 20%;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: center;
        }

        .red {
          color: ${RED};
        }

        .blue {
          color: ${TEAL};
        }

        .row {
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
        }

        .card img {
          width: 100%;
        }

        .checked {
          font-size: 2em;
          font-weight: 400;
        }
      `}</style>
    </Layout>
  )
}
