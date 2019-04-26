import * as React from 'react'
import { ActionRow } from './actionRow'
import { Button, Props as ButtonProps } from './button'
import { Hash } from '../interfaces/hash'
import { isArray } from 'util'
import { useSelectState } from '../hooks/useSelectState'
import { Typography } from '@material-ui/core'
import { equals, values } from 'ramda'
import { Grid } from './grid'

export interface Props<Item> {
  title?: string
  description?: string
  numToSelect?: number // Number of items to select
  notExact?: boolean // Enable fewer items to be selected
  disabled?: boolean

  onChange?: (items: Item[]) => void

  onDone?: (item: Item[]) => void
  doneText?: string
  doneProps?:
    | Partial<ButtonProps>
    | ((disabled: boolean) => Partial<ButtonProps>)

  onAlt?: () => void
  altText?: string
  altProps?: Partial<ButtonProps>

  onCancel?: () => void
  cancelText?: string
  cancelProps?: Partial<ButtonProps>

  items: Item[] | Hash<Item>
  defaultItems?: Item[] | Hash<Item>
  renderItem: (props: {
    selected: boolean
    onClick: () => void
    item: Item
  }) => React.ReactNode
}

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
  defaultItems = [],
  renderItem,
  title,
  description,
  numToSelect = 1,
  disabled,
  notExact,
  onChange,
}: Props<Item>): React.ReactElement {
  const [selected, updateSelected] = useSelectState<Item>(
    isArray(defaultItems) ? defaultItems : values(defaultItems),
    numToSelect
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

      <Grid>
        {(isArray(items) ? items : values(items)).map(item =>
          renderItem({
            item,
            selected: !!selected.find(equals(item)),
            onClick: () => updateSelected(item),
          })
        )}
      </Grid>

      {(onAlt || onDone || onCancel) && (
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

          {onDone && (
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
              {doneText || 'done'}
            </Button>
          )}
        </ActionRow>
      )}
    </>
  )
}
