import * as React from 'react'
import { NightViewProps } from '../../interfaces/nightViewInterfaces'
import { NightViewBase } from './nightActionViewBase'

export const NoNightViewBase: React.SFC<NightViewProps> = ({
  done,
  player,
  callByName,
}) => {
  return (
    <NightViewBase
      title="Bodyguard, wake up! Protect someone, they will not die tonight."
      player={player}
      done={done}
      callByName
      role="bodyguard"
    />
  )
}
