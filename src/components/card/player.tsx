import * as React from 'react'
import { Card, Props as CardProps } from '.'
import { Player } from '../../interfaces/player'
import { playerName } from '../playerName'

export interface Props extends Partial<CardProps> {
  player: Player
}

export const PlayerCard: React.SFC<Props> = ({ player, ...props }) => {
  return <Card image={player.profileImg} text={playerName(player)} {...props} />
}
