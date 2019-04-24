import * as React from 'react'
import { WerewolfGameContext } from '../../../../../helpers/contexts'
import values from 'ramda/es/values'
import { WerewolfPlayerCard } from '../../../components/werewolfPlayerCard'
import { useCommonStyles } from '../../../../../helpers/commonStyles'
import { sortBy } from 'ramda'
import { makeStyles } from '@material-ui/styles'
import { Sasquatch } from '../../../interfaces/card/sasquatch'
import { isRole } from '../../../interfaces/card/cards'
import { Typography } from '@material-ui/core'
import { ArtifactView } from '../../../components/artifact/artifactView'
import { ActionRow } from '../../../../../components/actionRow'
import { Button } from '../../../../../components/button'
import { PlayerId } from '../../../../../interfaces/player'

interface Props {}

const useStyles = makeStyles({
  selectedPlayer: {
    width: '200px',
    margin: '0 auto 2em',
  },
})

export const WerewolfSpectateGame: React.SFC<Props> = ({}) => {
  const { game } = React.useContext(WerewolfGameContext)
  const [selectedPlayer, setSelectedPlayer] = React.useState<PlayerId | null>(
    null
  )

  const classes = { ...useStyles(), ...useCommonStyles() }

  if (selectedPlayer) {
    const player = game.players[selectedPlayer]

    return (
      <>
        <WerewolfPlayerCard
          className={classes.selectedPlayer}
          player={player}
          showLiving
          showRole
        />

        <Typography>
          {player.role}
          {player.secondaryRole && ` / ${player.secondaryRole}`}
          {isRole(player, Sasquatch.role) &&
            (player.sasquatchWakesUp ? ` (werewolf)` : ` (villager)`)}
        </Typography>

        {player.artifacts.map(artifactState => (
          <ArtifactView
            showPlay
            artifactState={artifactState}
            player={player}
          />
        ))}

        <ActionRow fixed>
          <Button onClick={() => setSelectedPlayer(null)}>back</Button>
        </ActionRow>
      </>
    )
  }

  return (
    <>
      <div className={classes.twoColumns}>
        {sortBy(p => !p.alive, values(game.players)).map(player => (
          <WerewolfPlayerCard
            showRole
            showLiving
            key={player.id}
            player={player}
            onClick={() => setSelectedPlayer(player.id)}
          />
        ))}
      </div>
    </>
  )
}
