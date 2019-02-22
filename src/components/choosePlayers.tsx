import * as React from 'react'
import { PlayerId, Player } from '../interfaces/player'
import { Profile } from './profile'
import { ActionRow } from './actionRow'
import { Button, Props as ButtonProps } from './button'
import { Hash } from '../interfaces/hash'
import { isArray } from 'util'
import values from 'ramda/es/values'
import { useSelectState } from '../hooks/useSelectState'
import { Typography } from '@material-ui/core'
import { RoomContext } from '../helpers/contexts'

type Render<P> = (props: {
  selected: boolean
  onClick: () => void
  player: P
}) => React.ReactNode

interface Props<P extends Player> {
  title?: string
  description?: string

  onDone: (id: PlayerId[]) => void
  doneText: string
  doneProps?:
    | Partial<ButtonProps>
    | ((disabled: boolean) => Partial<ButtonProps>)

  onAlt?: () => void
  altText?: string
  altProps?: Partial<ButtonProps>

  onCancel?: () => void
  cancelText?: string
  cancelProps?: Partial<ButtonProps>

  // Number of players to select
  numToSelect?: number
  // Setting this removes the player from the list
  removePlayer?: boolean | Player
  // The list of players to filter over
  players: P[] | Hash<P>

  children?: Render<P>
}

export function ChoosePlayers<P extends Player>({
  onDone,
  doneText,
  doneProps = {},
  onAlt,
  altText,
  altProps = {},
  onCancel,
  cancelText,
  cancelProps = {},
  players,
  removePlayer,
  title,
  description,
  numToSelect = 1,
  children,
}: Props<P>): React.ReactElement {
  const [selected, updateSelected] = useSelectState<PlayerId>([], numToSelect)
  const { player: localPlayer } = React.useContext(RoomContext)
  const shouldRemovePlayer = !!removePlayer
  const removePlayerId =
    typeof removePlayer === 'object' ? removePlayer.id : localPlayer.id

  const defaultChildren: Render<P> = ({
    player,
    selected: isSelected,
    onClick,
  }) => (
    <Profile
      key={player.id}
      text={player.name || player.id}
      image={player.profileImg}
      selected={isSelected}
      onClick={onClick}
    />
  )

  return (
    <>
      {title && (
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
      )}
      {description && <Typography component="em">{description}</Typography>}

      {(isArray(players) ? players : values(players))
        .filter(p => (shouldRemovePlayer ? p.id !== removePlayerId : true))
        .map(p =>
          (children || defaultChildren)({
            selected: !!selected.find(id => id === p.id),
            player: p,
            onClick: () => updateSelected(p.id),
          })
        )}

      <ActionRow fixed>
        {onAlt && altText && (
          <Button color="red" onClick={onAlt} {...altProps}>
            {altText}
          </Button>
        )}

        {onCancel && (
          <Button onClick={onCancel} {...cancelProps}>
            {cancelText || 'cancel'}
          </Button>
        )}

        <Button
          color="green"
          {...(typeof doneProps === 'function'
            ? doneProps(selected.length !== numToSelect)
            : doneProps)}
          disabled={selected.length !== numToSelect}
          onClick={() => {
            if (selected.length === numToSelect) {
              onDone(selected)
            }
          }}>
          {doneText}
        </Button>
      </ActionRow>
    </>
  )
}
