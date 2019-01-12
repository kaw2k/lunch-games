import * as React from 'react'
import { AvalonGameContext } from '../../../helpers/contexts'
import { Overview } from './overview'
import { ChooseMission } from './chooseMission'
import { ChooseCards } from './chooseCards'
import { LadyOfTheLake } from './ladyOfTheLake'
import { Party } from '../../interfaces/game'
import { count } from '../../../helpers/count'
import { getBoardEffect } from '../../helpers/getBoardEffect'
import { isGameOver } from '../../helpers/isGameOver'
import values from 'ramda/es/values'

export const GameView: React.SFC<{}> = () => {
  const [isMyTurn, setIsMyTurn] = React.useState(false)
  const {
    game,
    player,
    updateGame,
    endGame,
    updateGamePlayer,
  } = React.useContext(AvalonGameContext)

  // Check if lady of the lake needs to happen TODO
  if (player.ladyOfTheLake) {
    return (
      <LadyOfTheLake
        done={async selectedPlayer => {
          updateGamePlayer({ ...player, ladyOfTheLake: false })
          updateGame({ nextLadyOfTheLake: selectedPlayer.id })
          alert(`${selectedPlayer.name} is ${selectedPlayer.party}`)
        }}
      />
    )
  }

  // If we are on the current mission, show the card screen
  if (
    game.currentMission &&
    (game.currentMission.owner === player.id ||
      game.currentMission.players.find(id => id === player.id))
  ) {
    return (
      <ChooseCards
        mission={game.currentMission}
        playCard={card => {
          updateGamePlayer({ ...player, missionVote: card })
        }}
        flipCards={async () => {
          const mission = game.currentMission
          if (!mission) return

          // Collect all the cards
          const cards = mission.players.reduce<Party[]>((memo, pid) => {
            const card = game.players[pid].missionVote
            return card ? memo.concat(card) : memo
          }, [])
          const numBad = count(cards, c => c === 'bad')
          const numGood = count(cards, c => c === 'good')
          const { fail } = getBoardEffect(game.players, game.missionResults)
          const result: Party = fail === numBad ? 'bad' : 'good'

          // Check if game is over
          const gameOver = isGameOver(game.missionResults.concat(result))
          if (gameOver) {
            return endGame(gameOver, `The ${gameOver} team win!`)
          }

          updateGame({
            // Clear the mission
            currentMission: null,
            // Update the board
            missionResults: game.missionResults.concat(result),
            // Alert the game with a message
            message: `The mission ${result}ed with ${numGood} successes and ${numBad} fails`,
          })

          // Reset all the players
          values(game.players).forEach(p => {
            updateGamePlayer({
              ...p,
              // Remove the cards from the players
              missionVote: null,
              // Assign lady of the lake
              ladyOfTheLake:
                game.ladyOfTheLake &&
                game.nextLadyOfTheLake === p.id &&
                game.missionResults.length >= 2,
            })
          })
        }}
      />
    )
  }

  // It is our turn, let the player choose their mission
  if (!game.currentMission && isMyTurn) {
    return (
      <ChooseMission
        cancel={() => setIsMyTurn(false)}
        fails={async () => {
          const nextChaos = game.chaos + 1

          if (nextChaos === 6) {
            return endGame(
              'bad',
              `Ya'll couldn't decide on a mission so the bad guys win.`
            )
          }

          if (nextChaos === 5) {
            await updateGame({
              chaos: nextChaos,
              message: `If this mission doesn't go, bad guys win.`,
            })
          }

          await updateGame({ chaos: nextChaos })
          setIsMyTurn(false)
        }}
        done={async players => {
          await updateGame({
            chaos: 0,
            currentMission: { owner: player.id, players },
          })
          setIsMyTurn(false)
        }}
      />
    )
  }

  // Nothing special, show the overview screen
  return <Overview myTurn={() => setIsMyTurn(true)} />
}
