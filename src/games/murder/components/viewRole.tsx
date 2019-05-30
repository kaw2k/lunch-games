import * as React from 'react'
import { MurderGameContext } from '../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { values } from 'ramda'
import { shuffle } from '../../../helpers/shuffle'
import { playerName } from '../../../components/playerName'
import { PlayerMurder } from '../interfaces/player'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { Card } from './card'
import { Button } from '../../../components/button'
import { getRoleImage } from '../interfaces/game'

const MurderItems: React.SFC<{
  player: PlayerMurder
}> = ({ player }) => {
  const classes = useCommonStyles()

  if (!player.murderItems) {
    return (
      <Typography>
        They have not selected their items yet. You can view them later in the
        game.
      </Typography>
    )
  }

  return (
    <>
      <Typography>Their weapon and evidence are:</Typography>
      <div className={classes.row}>
        <Card item={player.murderItems.evidence} />
        <Card item={player.murderItems.weapon} />
      </div>
    </>
  )
}

export const ViewInvestigator: React.SFC<{}> = ({}) => {
  return <img src={getRoleImage('investigator')} />
}

export const ViewWitness: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(MurderGameContext)
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
      <img src={getRoleImage('witness')} />
      <Typography>
        One of <strong>{names}</strong> is the murderer, the other is the
        accomplice.
      </Typography>
    </>
  )
}

export const ViewMurderer: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(MurderGameContext)
  const accomplice = values(game.players).find(p => p.role === 'accomplice')

  return (
    <>
      <img src={getRoleImage('murderer')} />
      {accomplice && (
        <>
          <Typography>
            <strong>{playerName(accomplice)}</strong> is your accomplice
          </Typography>
          <MurderItems player={accomplice} />
        </>
      )}
    </>
  )
}

export const ViewAccomplice: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(MurderGameContext)
  const murderer = values(game.players).find(p => p.role === 'accomplice')

  return (
    <>
      <img src={getRoleImage('accomplice')} />
      {murderer && (
        <>
          <Typography>
            <strong>{playerName(murderer)}</strong> is the murderer
          </Typography>
          <MurderItems player={murderer} />
        </>
      )}
    </>
  )
}

export const ViewScientist: React.SFC<{}> = ({}) => {
  const { game } = React.useContext(MurderGameContext)
  const murderer = values(game.players).find(p => p.role === 'murderer')
  const accomplice = values(game.players).find(p => p.role === 'accomplice')
  const witness = values(game.players).find(p => p.role === 'witness')

  return (
    <>
      <img src={getRoleImage('forensic scientist')} />
      {murderer && (
        <>
          <Typography>
            <strong>{playerName(murderer)}</strong> is the murderer
          </Typography>
          <MurderItems player={murderer} />
        </>
      )}
      {accomplice && (
        <Typography>
          <strong>{playerName(accomplice)}</strong> is the accomplice
        </Typography>
      )}
      {witness && (
        <Typography>
          <strong>{playerName(witness)}</strong> is the witness
        </Typography>
      )}
    </>
  )
}

export const ViewRole: React.SFC<{
  disableButton?: boolean
  button: string
  onDone: () => void
}> = ({ button, onDone, disableButton }) => {
  const { player } = React.useContext(MurderGameContext)

  return (
    <>
      {player.role === 'forensic scientist' && <ViewScientist />}
      {player.role === 'witness' && <ViewWitness />}
      {player.role === 'murderer' && <ViewMurderer />}
      {player.role === 'accomplice' && <ViewAccomplice />}
      {player.role === 'investigator' && <ViewInvestigator />}

      <Button disabled={disableButton} onClick={onDone} color="blue">
        {button}
      </Button>
    </>
  )
}
