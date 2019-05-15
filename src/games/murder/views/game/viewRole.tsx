import * as React from 'react'
import { MurderGameContext } from '../../../../helpers/contexts'
import { Typography } from '@material-ui/core'
import { values, includes } from 'ramda'
import { shuffle } from '../../../../helpers/shuffle'
import { playerName } from '../../../../components/playerName'
import { PlayerMurder } from '../../interfaces/player'
import { assertNever } from '../../../../helpers/assertNever'
import { useCommonStyles } from '../../../../helpers/commonStyles'
import { Card } from '../../components/card'
import { WeaponId, EvidenceId } from '../../../../helpers/id'
import { useSelectState } from '../../../../hooks/useSelectState'
import { Button } from '../../../../components/button'
import without from 'ramda/es/without'
import { Evidence, Weapon } from '../../interfaces/game'

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
  const classes = useCommonStyles()
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

  if (!player.murderItems) {
    return <SelectCards onReady={() => alert('done')} />
  }

  if (player.role === 'investigator') {
    return (
      <>
        <Typography variant="h3">You are an investigator</Typography>
        <SetupSelectCards player={player} />
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
        <SetupSelectCards player={player} />
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
            {murderer.murderItems ? (
              <>
                <Typography>Their weapon and evidence are:</Typography>
                <div className={classes.row}>
                  <Card item={murderer.murderItems.evidence} />
                  <Card item={murderer.murderItems.weapon} />
                </div>
              </>
            ) : (
              <Typography>
                They have not selected their items yet. You can view them later
                in the game.
              </Typography>
            )}
          </>
        )}
      </>
    )
  }

  return assertNever(player.role)
}

const ViewCards: React.SFC<{
  player: PlayerMurder
}> = ({ player }) => {
  const { player: activePlayer, updateGamePlayer } = React.useContext(
    MurderGameContext
  )
  const classes = useCommonStyles()

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        {playerName(player)}'s cards
      </Typography>

      <div className={classes.row}>
        {player.evidence.map(e => {
          const selected = includes(e.id, activePlayer.markedEvidences)

          return (
            <Card
              item={e}
              key={e.id}
              onClick={() => {
                updateGamePlayer({
                  ...activePlayer,
                  markedEvidences: selected
                    ? without([e.id], activePlayer.markedEvidences)
                    : activePlayer.markedEvidences.concat(e.id),
                })
              }}
              selected={selected}
            />
          )
        })}
      </div>

      <div className={classes.row}>
        {player.weapons.map(w => {
          const selected = includes(w.id, activePlayer.markedWeapons)

          return (
            <Card
              item={w}
              key={w.id}
              onClick={() =>
                updateGamePlayer({
                  ...activePlayer,
                  markedWeapons: selected
                    ? without([w.id], activePlayer.markedWeapons)
                    : activePlayer.markedWeapons.concat(w.id),
                })
              }
              selected={selected}
            />
          )
        })}
      </div>
    </>
  )
}

const SetupSelectCards: React.SFC<{
  player: PlayerMurder
  onSelected?: (items: { evidence: Evidence; weapon: Weapon }) => void
}> = ({ player, onSelected }) => {
  const classes = useCommonStyles()

  const [selectedEvidence, setSelectedEvidence] = useSelectState<Evidence>([])
  const [selectedWeapon, setSelectedWeapon] = useSelectState<Weapon>([])

  if (player.role === 'forensic scientist') return null

  const ready = selectedEvidence[0] && selectedWeapon[0]

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        {playerName(player)}'s cards
      </Typography>

      <div className={classes.row}>
        {player.evidence.map(evidence => (
          <Card
            item={evidence}
            key={evidence.id}
            onClick={onSelected && (() => setSelectedEvidence(evidence))}
            selected={includes(evidence, selectedEvidence)}
          />
        ))}
      </div>

      <div className={classes.row}>
        {player.weapons.map(weapon => (
          <Card
            key={weapon.id}
            item={weapon}
            onClick={onSelected && (() => setSelectedWeapon(weapon))}
            selected={includes(weapon, selectedWeapon)}
          />
        ))}
      </div>

      {onSelected && (
        <Button
          onClick={() => {
            onSelected({
              evidence: selectedEvidence[0],
              weapon: selectedWeapon[0],
            })
          }}
          color={ready ? 'green' : 'red'}
          fullWidth
          disabled={!ready}>
          {ready ? 'done... view role' : 'select items'}
        </Button>
      )}
    </>
  )
}

export const SelectCards: React.SFC<{
  onReady: (murderItems: { weapon: WeaponId; evidence: EvidenceId }) => void
}> = ({ onReady }) => {
  const { game, player, updateGamePlayer } = React.useContext(MurderGameContext)

  if (player.role === 'forensic scientist') return null

  const otherPlayers = values(game.players).filter(
    p => p.id !== player.id && p.role !== 'forensic scientist'
  )

  return (
    <>
      <Typography variant="h2">To see your role...</Typography>
      <Typography>
        In order to see your role you must select what items you would use for
        murder. You may or may not be the murderer. Regardless you will want to{' '}
        <strong>see what other players have</strong> to blend in with them.
      </Typography>

      <SetupSelectCards
        player={player}
        onSelected={murderItems =>
          updateGamePlayer({
            ...player,
            murderItems,
          })
        }
      />

      <Typography gutterBottom>
        If you want you may mark other players items for your own reference.
        This can help you keep track of relevant items people have.
      </Typography>

      {otherPlayers.map(p => (
        <ViewCards player={p} key={p.id} />
      ))}
    </>
  )
}
