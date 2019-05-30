import * as React from 'react'
import { Typography } from '@material-ui/core'
import { includes, values } from 'ramda'
import { playerName } from '../../../../components/playerName'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { Card } from '../../components/card'
import { useSelectState } from '../../../../hooks/useSelectState'
import { Button } from '../../../../components/button'
import { Evidence, Weapon } from '../../interfaces/game'
import { MurderGameContext } from '../../../../helpers/contexts'
import { PlayerCards } from '../../components/playerCards'

export const SetupSelectCards: React.SFC<{}> = ({}) => {
  const { game, player, updateGamePlayer } = React.useContext(MurderGameContext)
  const classes = useCommonStyles()

  const [selectedEvidence, setSelectedEvidence] = useSelectState<Evidence>([])
  const [selectedWeapon, setSelectedWeapon] = useSelectState<Weapon>([])

  if (player.role === 'forensic scientist') return null

  const ready = selectedEvidence[0] && selectedWeapon[0]

  const otherPlayers = values(game.players).filter(
    p => p.role !== 'forensic scientist' && p.id !== player.id
  )

  return (
    <>
      <Typography gutterBottom>
        To view your role you must first select what cards you would use{' '}
        <em>if you were the murderer.</em> You may not be the murderer, you will
        find out on the next screen.
      </Typography>

      <Typography variant="h2" gutterBottom align="center">
        Your cards
      </Typography>

      <div className={classes.row}>
        {player.evidence.map(evidence => (
          <Card
            item={evidence}
            key={evidence.id}
            onClick={() => setSelectedEvidence(evidence)}
            selected={includes(evidence, selectedEvidence)}
          />
        ))}
      </div>

      <div className={classes.row}>
        {player.weapons.map(weapon => (
          <Card
            key={weapon.id}
            item={weapon}
            onClick={() => setSelectedWeapon(weapon)}
            selected={includes(weapon, selectedWeapon)}
          />
        ))}
      </div>

      <Button
        onClick={() => {
          updateGamePlayer({
            ...player,
            murderItems: {
              evidence: selectedEvidence[0],
              weapon: selectedWeapon[0],
            },
          })
        }}
        color={ready ? 'green' : 'red'}
        fullWidth
        disabled={!ready}>
        {ready ? 'done... view role' : 'select items'}
      </Button>

      {otherPlayers.map(p => (
        <PlayerCards key={p.id} player={p} />
      ))}
    </>
  )
}
