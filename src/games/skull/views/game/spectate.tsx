import * as React from 'react'
import { SkullGame } from '../../interfaces/game'
import { SkullGameContext } from '../../../../helpers/contexts'

interface Props {
  game: SkullGame
  endGame: SkullGameContext['endGame']
}

export const Spectate: React.SFC<Props> = ({ game, endGame }) => {
  return <div>spectating...</div>
}
