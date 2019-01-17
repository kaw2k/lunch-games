import * as React from 'react'
import { MyTurn } from './myTurn'
import { Overview } from './overview'
import { SelectCards } from './selectCards'
import { getBoardEffect } from '../../helpers/getBoardEffect'
import { SecretHitlerGameContext } from '../../../helpers/contexts'
import { Kill } from './performPower/kill'
import { ChoosePresident } from './performPower/choosePresident'
import { InspectCards } from './performPower/inspectCards'
import { InspectRole } from './performPower/inspectRole'
import { ViewRole } from './viewRole'
import { EndGame } from './endGame'

interface Props {}

export const GameView: React.SFC<Props> = () => {
  const { game, player } = React.useContext(SecretHitlerGameContext)
  const [isMyTurn, setIsMyTurn] = React.useState(false)
  const [viewRole, setViewRole] = React.useState(false)
  const [viewEndGame, setViewEndGame] = React.useState(false)

  const fascists = game.playedCards.filter(c => c === 'fascist')
  const power = getBoardEffect(game.players, fascists.length)

  // Check if a president needs to perform some action
  if (power && game.performPower && game.performPower.id === player.id) {
    if (power === 'kill') {
      return <Kill />
    } else if (power === 'choose president') {
      return <ChoosePresident />
    } else if (power === 'inspect cards') {
      return <InspectCards />
    } else if (power === 'inspect role') {
      return <InspectRole />
    }
  }

  if (viewEndGame) {
    return <EndGame cancel={() => setViewEndGame(false)} />
  }

  if (viewRole) {
    return <ViewRole cancel={() => setViewRole(false)} />
  }

  // If we are in the current government, show the card screen
  if (
    game.government &&
    (game.government.president.id === player.id ||
      game.government.chancellor.id === player.id)
  ) {
    return <SelectCards government={game.government} />
  }

  if (!game.government && isMyTurn) {
    return <MyTurn cancel={() => setIsMyTurn(false)} />
  }

  return (
    <Overview
      myTurn={() => setIsMyTurn(true)}
      viewEndGame={() => setViewEndGame(true)}
      viewRole={() => setViewRole(true)}
    />
  )
}
