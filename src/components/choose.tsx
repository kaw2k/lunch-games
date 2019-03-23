import * as React from 'react'
import cx from 'classnames'
import { ActionRow } from './actionRow'
import { Button, Props as ButtonProps } from './button'
import { Hash } from '../interfaces/hash'
import { isArray } from 'util'
import { useSelectState } from '../hooks/useSelectState'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { equals, values } from 'ramda'

export interface Props<Item> {
  title?: string
  description?: string
  numToSelect?: number // Number of items to select
  notExact?: boolean // Enable fewer items to be selected
  columns?: 1 | 2
  disabled?: boolean

  onChange?: (items: Item[]) => void

  onDone: (item: Item[]) => void
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

  items: Item[] | Hash<Item> // The list of item to filter over
  renderItem: (props: {
    selected: boolean
    onClick: () => void
    item: Item
  }) => React.ReactNode
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

export function Choose<Item>({
  onDone,
  doneText,
  doneProps = {},
  onAlt,
  altText,
  altProps = {},
  onCancel,
  cancelText,
  cancelProps = {},
  items,
  renderItem,
  title,
  description,
  numToSelect = 1,
  disabled,
  notExact,
  onChange,
  columns = 1,
}: Props<Item>): React.ReactElement {
  const classes = useStyles()
  const [selected, updateSelected] = useSelectState<Item>([], numToSelect)

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
        {(isArray(items) ? items : values(items)).map(item =>
          renderItem({
            item,
            selected: !!selected.find(equals(item)),
            onClick: () => updateSelected(item),
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
          disabled={
            disabled ||
            (!notExact && selected.length !== numToSelect) ||
            (notExact && selected.length > numToSelect)
          }
          confirm={
            notExact &&
            selected.length !== numToSelect &&
            `Are you sure? You can select ${numToSelect}`
          }
          onClick={() => {
            if (
              (!notExact && selected.length === numToSelect) ||
              (notExact && selected.length <= numToSelect)
            ) {
              onDone(selected)
            }
          }}>
          {doneText}
        </Button>
      </ActionRow>
    </>
  )
}
