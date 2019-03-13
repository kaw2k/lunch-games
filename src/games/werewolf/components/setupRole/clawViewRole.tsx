import * as React from 'react'
import { WerewolfGameContext } from '../../../../helpers/contexts'
import { ViewAllies } from '../viewRole/allies'
import values from 'ramda/es/values'
import { isWerewolf } from '../../helpers/isWerewolf'
import { Typography } from '@material-ui/core'
import { getCard } from '../../interfaces/card/cards'

interface Props {}

export const ClawViewRole: React.SFC<Props> = ({}) => {
  const { player, game } = React.useContext(WerewolfGameContext)

  const isAlreadyAWerewolf = getCard(player.role).team === 'werewolves'
  const hasClaw = player.artifacts.find(a => a.type === 'claw of the werewolf')
  const isActive = game.options.werewolfArtifactAlwaysActive

  if (!(isActive && hasClaw) || isAlreadyAWerewolf) {
    return null
  }

  return (
    <>
      <Typography variant="h2">You are also a werewolf</Typography>
      <Typography gutterBottom>
        You have claw of the werewolf and the moderator set it to be active by
        default. You maintain your initial role while also being a werewolf.
        Here are your allies:
      </Typography>
      <ViewAllies
        showRole
        allies={values(game.players).filter(
          p => p.id !== player.id && isWerewolf(p, game)
        )}
      />
    </>
  )
}
