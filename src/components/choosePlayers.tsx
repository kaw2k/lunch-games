import * as React from 'react'
import { PlayerId, Player } from '../interfaces/player'
import { Layout } from './layout'
import { Profile } from './profile'
import { ActionRow } from './actionRow'
import { Button } from './button'
import { Hash } from '../interfaces/hash'
import { isArray } from 'util'
import values from 'ramda/es/values'
import { useSelectState } from '../hooks/useSelectState'

export const ChoosePlayers: React.SFC<{
  title: string

  doneButton: string
  done: (id: PlayerId[]) => void

  altButton?: string
  alt?: () => void

  cancel?: () => void

  // Number of players to select
  numToSelect?: number
  // Setting this removes the player from the list
  removePlayer?: Player
  // The list of players to filter over
  players: Player[] | Hash<Player>
}> = ({
  done,
  players,
  removePlayer,
  doneButton,
  title,
  numToSelect = 1,
  alt,
  altButton,
  cancel,
}) => {
  const [selected, updateSelected] = useSelectState<PlayerId>([], numToSelect)

  return (
    <Layout padded>
      <h1>{title}</h1>

      {(isArray(players) ? players : values(players))
        .filter(p => (removePlayer ? p.id !== removePlayer.id : true))
        .map(p => (
          <Profile
            key={p.id}
            text={p.name}
            image={p.profileImg}
            selected={!!selected.find(id => id === p.id)}
            onClick={() => updateSelected(p.id)}
          />
        ))}

      <ActionRow>
        {cancel && (
          <Button padded onClick={cancel}>
            cancel
          </Button>
        )}

        {alt && altButton && (
          <Button padded onClick={alt}>
            {altButton}
          </Button>
        )}
        <Button
          padded
          disabled={selected.length !== numToSelect}
          onClick={() => {
            if (selected.length === numToSelect) {
              done(selected)
            }
          }}>
          {doneButton}
        </Button>
      </ActionRow>
    </Layout>
  )
}
