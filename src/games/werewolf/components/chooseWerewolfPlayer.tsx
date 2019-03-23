import * as React from 'react'
import { Choose, Props as ChooseProps } from '../../../components/choose'
import { PlayerWerewolf } from '../interfaces/player'
import { WerewolfProfile } from './werewolfProfile'
import { Omit } from 'ramda'

interface Props
  extends Omit<
  ChooseProps<PlayerWerewolf>,
  'renderItem' | 'items' | 'columns'
  > {
  players: PlayerWerewolf[]
}

export const ChooseWerewolfPlayer: React.SFC<Props> = ({
  players,
  ...props
}) => {
  return (
    <Choose
      columns={2}
      items={players}
      renderItem={({ item, onClick, selected }) => (
        <WerewolfProfile
          key={item.id}
          player={item}
          onClick={onClick}
          selected={selected}
        />
      )}
      {...props}
    />
  )
}
