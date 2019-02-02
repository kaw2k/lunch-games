import * as React from 'react'
import { AvalonGameContext } from '../../../helpers/contexts'
import { Overview } from './overview'
import { GoOnMission } from './goOnMission'
import { LadyOfTheLake } from './ladyOfTheLake'
import { ChooseMission } from './chooseMission'
import { isGameOver } from '../../helpers/isGameOver'
import { KillMerlin } from './killMerlin'
import { ViewRole } from './viewRole'
import { EndGame } from './endGame'

export const GameView: React.SFC<{}> = () => {
  const { game, player, endGame } = React.useContext(AvalonGameContext)
  const [viewRole, setViewRole] = React.useState(false)
  const [isMyTurn, setIsMyTurn] = React.useState(false)
  const [viewEndGame, setViewEndGame] = React.useState(false)
  const gameOver = isGameOver(game)

  if (gameOver && player.role === 'assassin') {
    return <KillMerlin />
  }

  if (viewEndGame) {
    return <EndGame cancel={() => setViewEndGame(false)} endGame={endGame} />
  }

  if (viewRole) {
    return <ViewRole cancel={() => setViewRole(false)} />
  }

  // Check if lady of the lake needs to happen TODO
  if (player.ladyOfTheLake) {
    return <LadyOfTheLake />
  }

  // If we are on the current mission, show the card screen
  if (
    game.currentMission &&
    (game.currentMission.owner === player.id ||
      game.currentMission.players.find(id => id === player.id))
  ) {
    return <GoOnMission mission={game.currentMission} />
  }

  // It is our turn, let the player choose their mission
  if (!game.currentMission && isMyTurn) {
    return <ChooseMission endTurn={() => setIsMyTurn(false)} />
  }

  // Nothing special, show the overview screen
  return (
    <Overview
      myTurn={() => setIsMyTurn(true)}
      viewRole={() => setViewRole(true)}
      viewEndGame={() => setViewEndGame(true)}
    />
  )
}
