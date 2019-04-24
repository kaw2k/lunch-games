import * as React from 'react'
import { Player } from '../interfaces/player'
import { Hash } from '../interfaces/hash'
import { Omit } from '@material-ui/core'
import { Choose, Props as ChooseProps } from '../components/choose'
import { PlayerCard } from './card/player'

type ChoosePlayerProps = ChooseProps<Player>
type Render = ChoosePlayerProps['renderItem']

const defaultRenderPlayer: Render = ({ item, onClick, selected }) => (
  <PlayerCard
    key={item.id}
    player={item}
    onClick={onClick}
    selected={selected}
  />
)

interface Props extends Omit<ChoosePlayerProps, 'renderItem' | 'items'> {
  renderPlayer?: Render
  players: Player[] | Hash<Player>
}

export const ChoosePlayers: React.SFC<Props> = ({
  players,
  renderPlayer = defaultRenderPlayer,
  ...props
}) => {
  return <Choose items={players} renderItem={renderPlayer} {...props} />
}
