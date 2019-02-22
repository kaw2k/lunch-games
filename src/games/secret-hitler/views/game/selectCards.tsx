import * as React from 'react'
import cx from 'classnames'
import { Party, Government } from '../../interfaces/game'
import { Button } from '../../../../components/button'
import { ActionRow } from '../../../../components/actionRow'
import { remove } from 'ramda'
import includes from 'ramda/es/includes'
import indexOf from 'ramda/es/indexOf'
import contains from 'ramda/es/contains'
import { SecretHitlerGameContext } from '../../../../helpers/contexts'
import { isGameOver } from '../../helpers/isGameOver'
import { sanitizeCards } from '../../helpers/sanitizeCards'
import { getBoardEffect } from '../../helpers/getBoardEffect'

import { Asset } from '../../components/asset'
import { Typography, Icon } from '@material-ui/core'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { makeStyles } from '@material-ui/styles'
import { shuffle } from '../../../../helpers/shuffle'

interface Props {
  government: Government
}

const useStyles = makeStyles({
  cardRow: {
    alignItems: 'flex-start',
    padding: '1em',
    justifyContent: 'center',

    '& > * ': {
      flex: '0 0 30%',
    },
  },
})

export const SelectCards: React.SFC<Props> = ({ government }) => {
  const classes = { ...useCommonStyles(), ...useStyles() }
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

  function cancel() {
    updateGame({
      government: null,
      discardedCards: [],
      remainingCards: shuffle([
        ...government.cards,
        ...game.discardedCards,
        ...game.remainingCards,
      ]),
    })
  }

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
      <>
        <Typography variant="h2">
          Waiting for {government.chancellor.name || government.chancellor.id}{' '}
          to play
        </Typography>
        <Typography>
          Your done with your part, you are not allowed to speak until the cards
          are fully played
        </Typography>
      </>
    )
  }

  if (player.id === government.chancellor.id && government.cards.length !== 2) {
    return (
      <>
        <Typography variant="h2">
          Waiting for {government.president.name || government.president.id} to
          play
        </Typography>
        <Typography>
          When the president is done selecting which cards they want to play you
          will get a button to view them, and then play one.
        </Typography>
      </>
    )
  }

  if (player.id === government.chancellor.id && !chancellorViewCards) {
    return (
      <>
        <Typography variant="h2">
          {government.president.name || government.president.id} has passed you
          cards, are you ready?
        </Typography>
        <ActionRow fixed>
          <Button color="green" onClick={() => setViewCards(true)}>
            yes
          </Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      {government.cards.length === 3 && (
        <React.Fragment>
          <Typography variant="h2">
            Which two cards do you want to pass to the chancellor?
          </Typography>
          <Typography>Select both of them and then press "pass".</Typography>
          {fascists === 5 && (
            <Typography>
              To veto, select a card and press veto. The remaining two cards
              will be sent to your chancellor, they can veto the same way.
            </Typography>
          )}
        </React.Fragment>
      )}
      {government.cards.length === 2 && (
        <React.Fragment>
          <Typography variant="h2">
            Which card would you like to play?
          </Typography>
          <Typography>
            Select the card you want to play and press "play".
          </Typography>
          {fascists === 5 && (
            <Typography>
              To veto, select a card and press veto. The remaining two cards
              will be sent to your chancellor, they can veto the same way.
            </Typography>
          )}
        </React.Fragment>
      )}

      <div className={cx(classes.row, classes.cardRow)}>
        {government.cards.map((card, i) => (
          <button
            className={classes.buttonReset}
            key={i}
            onClick={() => updateCards(i)}>
            <Asset asset={card === 'fascist' ? 'cardFail' : 'cardSuccess'} />
            {contains(i, cardIndices) && <Icon>checked</Icon>}
          </button>
        ))}
      </div>

      <ActionRow fixed>
        {fascists === 5 && (
          <Button
            disabled={disabled}
            onClick={() => {
              if (disabled) return
              discard(selected, discarded, true)
            }}>
            veto
          </Button>
        )}
        {government.cards.length === 3 && (
          <Button confirm onClick={cancel}>
            cancel
          </Button>
        )}
        <Button
          disabled={disabled}
          color="green"
          onClick={() => {
            if (disabled) return
            discard(selected, discarded)
          }}>
          {government.cards.length === 3 ? 'pass' : 'play'}
        </Button>
      </ActionRow>
    </>
  )
}
