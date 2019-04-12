import * as React from 'react'
import { Choose, Props as ChooseProps } from '../../../components/choose'
import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfPlayerCard } from './werewolfPlayerCard'
import { Omit } from 'ramda'

type ChooseWerewolfProps = ChooseProps<PlayerWerewolf>
type Render = ChooseWerewolfProps['renderItem']

const defaultRenderPlayer: Render = ({ item, onClick, selected }) => (
  <WerewolfPlayerCard
    key={item.id}
    player={item}
    onClick={onClick}
    selected={selected}
  />
)

interface Props extends Omit<ChooseWerewolfProps, 'renderItem' | 'items'> {
  renderPlayer?: Render
  players: PlayerWerewolf[]
}

export const ChooseWerewolfPlayer: React.SFC<Props> = ({
  players,
  renderPlayer = defaultRenderPlayer,
  ...props
}) => {
  return <Choose items={players} renderItem={renderPlayer} {...props} />
}
