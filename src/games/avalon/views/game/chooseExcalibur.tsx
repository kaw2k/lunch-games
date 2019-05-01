import * as React from 'react'
import { AvalonGameContext } from '../../../../helpers/contexts'
import { ChoosePlayers } from '../../../../components/choosePlayers'
import values from 'ramda/es/values'
import includes from 'ramda/es/includes'

export const ChooseExcalibur: React.SFC<{}> = () => {
  const { game, updateGame } = React.useContext(AvalonGameContext)

  const missionPlayers = game.currentMission!.players

  return (
    <ChoosePlayers
      title="Choose your wielder of Excalibur. It should've been agreed to with the vote on your mission."
      players={values(game.players).filter(
        p =>
          p.id !== game.currentMission!.owner && includes(p.id, missionPlayers)
      )}
      doneText="bestow"
      onDone={async ([selectedPlayer]) => {
        updateGame({
          currentMission: {
            ...game.currentMission!,
            excaliburWielder: selectedPlayer.id,
          },
        })
      }}
    />
  )
}
