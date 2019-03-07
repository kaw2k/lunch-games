import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import { values } from 'ramda'
import { WerewolfProfile } from '../../../components/werewolfProfile'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { PlayerId } from '../../../../../interfaces/player'
import { startNight } from '../../../helpers/gameEngine'
import { NightModerator } from './night'
import { DayPlayer } from './day'

interface Props {}

type View = { type: 'day player'; player: PlayerId } | { type: 'day' }

export const WerewolfModeratorGame: React.SFC<Props> = () => {
  const [view, setView] = React.useState<View>({ type: 'day' })
  const { game, updateGame, endGame } = React.useContext(WerewolfGameContext)
  const classes = useCommonStyles()

  React.useEffect(() => {
    // Only end the game when it is day
    if (game.victory && game.time === 'day') {
      endGame(game.victory.team, game.victory.message)
    }
  })

  // TODO: Make a dawn view instead of re-using night view
  if (game.time === 'night' || game.time === 'dawn') {
    return <NightModerator />
  }

  if (view.type === 'day player') {
    return (
      <DayPlayer
        player={game.players[view.player]}
        done={() => setView({ type: 'day' })}
      />
    )
  }

  return (
    <>
      <div className={classes.twoColumns}>
        {values(game.players).map(player => (
          <WerewolfProfile
            alignItems="flex-start"
            showRole
            showLiving
            key={player.id}
            player={player}
            onClick={() => setView({ type: 'day player', player: player.id })}
          />
        ))}
      </div>

      <ActionRow fixed>
        <Button
          color="green"
          confirm
          onClick={() => updateGame(startNight(game))}>
          start night
        </Button>
      </ActionRow>
    </>
  )
}
