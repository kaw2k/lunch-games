import * as React from 'react'
import values from 'ramda/es/values'
import { Party, Mission } from '../../interfaces/game'
import { Button } from '../../../../components/button'
import { ActionRow } from '../../../../components/actionRow'
import { Profile } from '../../../../components/profile'
import { AvalonGameContext } from '../../../../helpers/contexts'
import { count } from '../../../../helpers/count'
import { isGameOver } from '../../helpers/isGameOver'
import { Typography } from '@material-ui/core'

export const GoOnMission: React.SFC<{ mission: Mission }> = ({ mission }) => {
  // ======================
  // HOOKS
  // ======================
  const {
    player,
    game,
    updateGamePlayer,
    endGame,
    updateGame,
    failsNeeded,
    playersNeeded,
  } = React.useContext(AvalonGameContext)
  const [card, setCard] = React.useState<Party | null>(null)
  const [error, setError] = React.useState<string>('')

  // ======================
  // CALLBACKS
  // ======================
  function playCard(card: Party) {
    updateGamePlayer({ ...player, missionVote: card })
  }

  function cancel() {
    updateGame({
      currentMission: null,
    })
  }

  async function flipCards() {
    // Collect all the cards
    const cards = mission.players.reduce<Party[]>((memo, pid) => {
      const card = game.players[pid].missionVote
      return card ? memo.concat(card) : memo
    }, [])
    const numBad = count(cards, c => c === 'bad')
    const numGood = count(cards, c => c === 'good')
    const result: Party = numBad >= failsNeeded ? 'bad' : 'good'

    // Check if game is over
    const isAssassinInGame = !!game.roles.find(r => r === 'assassin')
    const gameOver = isGameOver(game.missionResults.concat(result))
    // We only end the game if bad guys win. If good guys win
    // then the bad people (if assassin is in the game) get a
    // chance to kill merlin
    if (gameOver === 'bad' || (gameOver === 'good' && !isAssassinInGame)) {
      return endGame(gameOver, `The ${gameOver} team win!`)
    }

    updateGame({
      // Clear the mission
      currentMission: null,
      // Update the board
      missionResults: game.missionResults.concat(result),
      // Alert the game with a message
      message: gameOver
        ? `mission succeeded and the good team wins. good team stay quite while the bad team tries to kill merlin`
        : `mission ${
            result === 'bad' ? 'failed' : 'succeeded'
          } with ${numGood} successes and ${numBad} fails`,
    })

    // Reset all the players
    values(game.players).forEach(p => {
      updateGamePlayer({
        ...p,
        // Remove the cards from the players
        missionVote: null,
        // Assign lady of the lake
        ladyOfTheLake:
          !gameOver &&
          game.ladyOfTheLake &&
          game.nextLadyOfTheLake === p.id &&
          game.missionResults.length >= 1,
      })
    })
  }

  // ======================
  // VIEWS
  // ======================
  const isOwner = mission.owner === player.id
  const isInMission = !!mission.players.find(id => player.id === id)
  const hasPlayedCard = !!player.missionVote
  const allCardsPlayed = mission.players.reduce(
    (memo, id) => memo && !!game.players[id].missionVote,
    true
  )

  if (isOwner && (hasPlayedCard || !isInMission)) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          Waiting for the others to play their cards
        </Typography>
        <ActionRow fixed>
          <Button confirm onClick={cancel}>
            cancel
          </Button>
          <Button color="green" disabled={!allCardsPlayed} onClick={flipCards}>
            flip cards
          </Button>
        </ActionRow>
      </>
    )
  }

  if (hasPlayedCard) {
    return (
      <>
        <Typography gutterBottom variant="h2">
          Waiting for the others to play their cards
        </Typography>
      </>
    )
  }

  return (
    <>
      <Typography gutterBottom variant="h2">
        Good players may only pass missions. Bad players may choose to fail or
        pass a mission
      </Typography>
      <Typography gutterBottom variant="h2">
        This mission has {playersNeeded} people on it and requires {failsNeeded}{' '}
        to fail the mission. Select the card you wish to play.
      </Typography>

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

      {error && (
        <Typography
          align="center"
          component="em"
          color="error"
          className="error">
          {error}
        </Typography>
      )}

      <ActionRow fixed>
        <Button confirm onClick={cancel}>
          cancel
        </Button>
        <Button
          color="green"
          disabled={!card}
          onClick={() => {
            if (!card) return

            if (player.party === 'good' && card === 'bad') {
              setError('Good players can only pass missions')
            } else {
              playCard(card)
            }
          }}>
          play card
        </Button>
      </ActionRow>
    </>
  )
}
