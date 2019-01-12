import * as React from 'react'
import { Party, Mission } from '../../interfaces/game'
import { Layout } from '../../../components/layout'
import { Button } from '../../../components/button'
import { ActionRow } from '../../../components/actionRow'
import { Profile } from '../../../components/profile'
import { AvalonGameContext } from '../../../helpers/contexts'
import { getBoardEffect } from '../../helpers/getBoardEffect'

interface Props {
  playCard: (card: Party) => void
  flipCards: () => void
  mission: Mission
}

export const ChooseCards: React.SFC<Props> = ({
  playCard,
  flipCards,
  mission,
}) => {
  const { player, game } = React.useContext(AvalonGameContext)
  const [card, setCard] = React.useState<Party | null>(null)
  const { fail, people } = getBoardEffect(game.players, game.missionResults)

  const isOwner = mission.owner === player.id
  const isInMission = !!mission.players.find(id => player.id === id)
  const hasPlayedCard = !!player.missionVote
  const allCardsPlayed = mission.players.reduce(
    (memo, id) => memo && !!game.players[id].missionVote,
    true
  )

  console.log(isOwner, hasPlayedCard, isInMission)

  if (isOwner && (hasPlayedCard || !isInMission)) {
    return (
      <Layout padded>
        <h1>Waiting for the others to play their cards</h1>
        <ActionRow>
          <Button padded disabled={!allCardsPlayed} onClick={flipCards}>
            flip cards
          </Button>
        </ActionRow>
      </Layout>
    )
  }

  if (hasPlayedCard) {
    return (
      <Layout padded>
        <h1>Waiting for the others to play their cards</h1>
      </Layout>
    )
  }

  return (
    <Layout padded>
      <h1>
        This mission has {people} people on it and requires {fail} to fail the
        mission. Select the card you wish to play.
      </h1>

      <Profile
        text="fail"
        color="red"
        onClick={() => setCard('bad')}
        selected={card === 'bad'}
      />

      <Profile
        text="pass"
        color="blue"
        onClick={() => setCard('good')}
        selected={card === 'good'}
      />

      <ActionRow>
        <Button
          padded
          disabled={!card}
          onClick={() => {
            if (card) {
              playCard(card)
            }
          }}>
          play card
        </Button>
      </ActionRow>
    </Layout>
  )
}
