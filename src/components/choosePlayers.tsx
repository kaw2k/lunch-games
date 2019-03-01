import * as React from 'react'
import cx from 'classnames'
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
import { makeStyles } from '@material-ui/styles'

type Children<P> = (props: {
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

  onChange?: (id: PlayerId[]) => void

  columns?: 1 | 2

  // Number of players to select
  numToSelect?: number
  // Enable fewer or more people to be selected
  notExact?: boolean

  // Setting this removes the player from the list
  removePlayer?: boolean | Player
  // The list of players to filter over
  players: P[] | Hash<P>

  // A way to choose what the players look like
  children?: Children<P>

  disabled?: boolean
}

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  oneColumn: {
    '& > *': {
      flex: '1 1 100%',
    },
  },
  twoColumn: {
    '& > *': {
      flex: '1 1 50%',
    },
  },
})

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
  disabled,
  notExact,
  onChange,
  columns = 1,
}: Props<P>): React.ReactElement {
  const classes = useStyles()
  const [selected, updateSelected] = useSelectState<PlayerId>([], numToSelect)
  const { player: localPlayer } = React.useContext(RoomContext)
  const shouldRemovePlayer = !!removePlayer
  const removePlayerId =
    typeof removePlayer === 'object' ? removePlayer.id : localPlayer.id

  const defaultChildren: Children<P> = ({
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

  React.useEffect(() => {
    if (onChange) onChange(selected)
  }, [selected])

  return (
    <>
      {title && (
        <Typography gutterBottom variant="h2">
          {title}
        </Typography>
      )}
      {description && (
        <Typography gutterBottom component="em">
          {description}
        </Typography>
      )}

      <div
        className={cx(classes.list, {
          [classes.oneColumn]: columns === 1,
          [classes.twoColumn]: columns === 2,
        })}>
        {(isArray(players) ? players : values(players))
          .filter(p => (shouldRemovePlayer ? p.id !== removePlayerId : true))
          .map(p =>
            (children || defaultChildren)({
              selected: !!selected.find(id => id === p.id),
              player: p,
              onClick: () => updateSelected(p.id),
            })
          )}
      </div>

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
          disabled={disabled || (!notExact && selected.length !== numToSelect)}
          confirm={
            notExact && selected.length !== numToSelect && 'Are you sure?'
          }
          onClick={() => {
            if (!notExact && selected.length === numToSelect) {
              onDone(selected)
            }
          }}>
          {doneText}
        </Button>
      </ActionRow>
    </>
  )
}
