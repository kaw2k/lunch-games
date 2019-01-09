import * as React from 'react'
import { Party, Government } from '../../interfaces/game'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { ActionRow } from '../../../components/actionRow'
import { remove } from 'ramda'
import includes from 'ramda/es/includes'
import indexOf from 'ramda/es/indexOf'
import contains from 'ramda/es/contains'
import { Profile } from '../../../components/profile'
import { SecretHitlerGameContext } from '../../../helpers/contexts'

interface Props {
  discard: (cards: Party[], discard: Party[], veto?: boolean | null) => void
  government: Government
}

export const SelectCards: React.SFC<Props> = ({ government, discard }) => {
  const { player, game } = React.useContext(SecretHitlerGameContext)
  const [cardIndices, setCardIndices] = React.useState<number[]>([])
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
      <Layout>
        <h1>Waiting for {government.chancellor.name} to play</h1>
      </Layout>
    )
  }

  if (player.id === government.chancellor.id && government.cards.length !== 2) {
    return (
      <Layout>
        <h1>Waiting for {government.president.name} to play</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      {government.cards.length === 3 && (
        <h1>Which two cards do you want to pass to the chancellor?</h1>
      )}
      {government.cards.length === 2 && (
        <h1>Which card would you like to play?</h1>
      )}

      {government.cards.map((card, i) => (
        <Profile
          key={i}
          text={card}
          onClick={() => updateCards(i)}
          selected={contains(i, cardIndices)}
        />
      ))}

      <ActionRow>
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
          onClick={() => {
            if (disabled) return
            discard(selected, discarded)
          }}>
          {government.cards.length === 3 ? 'pass' : 'play'}
        </Button>
      </ActionRow>
    </Layout>
  )
}
