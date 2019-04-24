import * as React from 'react'
import { AvalonGameContext } from '../../../../helpers/contexts'
import { Choose } from '../../../../components/choose'
import { PlayerCard } from '../../../../components/card/player'

export const ChooseMission: React.SFC<{ endTurn: () => void }> = ({
  endTurn,
}) => {
  const {
    player,
    game,
    updateGame,
    endGame,
    failsNeeded,
    playersNeeded,
  } = React.useContext(AvalonGameContext)

  return (
    <Choose
      onCancel={endTurn}
      title={`Choose your mission with ${playersNeeded} people, it needs ${failsNeeded} fail. You may choose to not put yourself on the mission if you wish.`}
      numToSelect={playersNeeded}
      renderItem={({ item, ...props }) => (
        <PlayerCard player={item} key={item.id} {...props} />
      )}
      items={game.players}
      altText="doesn't go"
      onAlt={async () => {
        const nextChaos = game.chaos + 1

        if (nextChaos === 5) {
          return endGame(
            'bad',
            `Ya'll couldn't decide on a mission so the bad guys win.`
          )
        }

        if (nextChaos === 4) {
          await updateGame({
            chaos: nextChaos,
            message: `If this mission doesn't go, bad guys win.`,
          })
        }

        await updateGame({ chaos: nextChaos })
        endTurn()
      }}
      doneText="goes"
      onDone={async players => {
        await updateGame({
          chaos: 0,
          currentMission: { owner: player.id, players: players.map(p => p.id) },
        })
        endTurn()
      }}
    />
  )
}
