import * as React from 'react'
import { AvalonGameContext } from '../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import values from 'ramda/es/values'
import includes from 'ramda/es/includes'

export const ChooseTarget: React.SFC<{ onDone: (string: string) => void }> = ({
  onDone,
}) => {
  const { game, player, updateGame } = React.useContext(AvalonGameContext)

  const missionPlayers = game.currentMission!.players
  return (
    <ChoosePlayers
      title="Do you dare use exaclibur? Chose carefully you don't want to flip a vote you don't want flipped."
      players={values(game.players).filter(
        p => p.id !== player.id && includes(p.id, missionPlayers)
      )}
      doneText="flip vote"
      cancelText="pass"
      onCancel={() => {
        updateGame({
          currentMission: { ...game.currentMission!, hasSwitched: true },
        })
      }}
      onDone={async ([selectedPlayer]) => {
        onDone(selectedPlayer.id)
      }}
    />
  )
}
