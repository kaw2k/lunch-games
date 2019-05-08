import * as React from 'react'
import { MurderGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { values } from 'ramda'
import { shuffle } from '../../../../helpers/shuffle'
import { playerName } from '../../../../components/playerName'
import { PlayerMurder } from '../../interfaces/player'
import { assertNever } from '../../../../helpers/assertNever'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { Card } from '../../components/card'

interface Props {
  disableButton?: boolean
  button: string
  onDone: () => void
}

export const ViewRole: React.SFC<Props> = ({
  button,
  onDone,
  disableButton,
}) => {
  const { player, game } = React.useContext(MurderGameContext)
  const murderer = values(game.players).find(p => p.role === 'murderer')
  const accomplice = values(game.players).find(p => p.role === 'accomplice')
  const witness = values(game.players).find(p => p.role === 'witness')

  if (player.role === 'forensic scientist') {
    return (
      <>
        <Typography variant="h3">You are the forensic scientist</Typography>
        {/* TODO: Show the key evidence */}
        {murderer && (
          <Typography>{playerName(murderer)} is the murderer</Typography>
        )}
        {accomplice && (
          <Typography>{playerName(accomplice)} is the accomplice</Typography>
        )}
        {witness && (
          <Typography>{playerName(witness)} is the witness</Typography>
        )}
      </>
    )
  }

  if (player.role === 'investigator') {
    return (
      <>
        <Typography variant="h3">You are an investigator</Typography>
        <ViewCards player={player} />
      </>
    )
  }

  if (player.role === 'witness') {
    const murderer = values(game.players).find(p => p.role === 'murderer')
    const accomplice = values(game.players).find(p => p.role === 'accomplice')
    let baddies: PlayerMurder[] = []
    if (murderer) baddies = baddies.concat(murderer)
    if (accomplice) baddies = baddies.concat(accomplice)
    const names = shuffle(baddies)
      .map(p => playerName(p))
      .join(', ')

    return (
      <>
        <Typography variant="h3">You are the witness</Typography>
        <Typography>
          One of {names} is the murderer, the other is the accomplice.
        </Typography>
        <ViewCards player={player} />
      </>
    )
  }

  if (player.role === 'murderer') {
    const accomplice = values(game.players).find(p => p.role === 'accomplice')

    return (
      <>
        <Typography variant="h3">You are the murderer</Typography>
        {accomplice && (
          <Typography>{playerName(accomplice)} is your accomplice</Typography>
        )}
        <ViewCards player={player} />
      </>
    )
  }

  if (player.role === 'accomplice') {
    const murderer = values(game.players).find(p => p.role === 'accomplice')

    return (
      <>
        <Typography variant="h3">You are the accomplice</Typography>
        {murderer && (
          <>
            <Typography>{playerName(murderer)} is the murderer</Typography>
            <Typography>TODO: SHOW THEIR ITEMS</Typography>
          </>
        )}
        <ViewCards player={player} />
      </>
    )
  }

  return assertNever(player.role)
}

const ViewCards: React.SFC<{ player: PlayerMurder }> = ({ player }) => {
  const classes = useCommonStyles()

  if (player.role === 'forensic scientist') return null

  return (
    <>
      <Typography variant="h3">{playerName(player)}'s cards</Typography>
      <div className={classes.row}>
        {player.evidence.map(e => (
          <Card item={e} />
        ))}
      </div>

      <div className={classes.row}>
        {player.weapons.map(w => (
          <Card item={w} />
        ))}
      </div>
    </>
  )
}
