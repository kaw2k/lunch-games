import * as React from 'react'
import { Colors } from '../helpers/colors'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Icon,
} from '@material-ui/core'
import value from '*.svg'
import { ListItemProps } from '@material-ui/core/ListItem'

export interface Props {
  text: string
  subtext?: React.ReactNode
  profileText?: string | number
  image?: string | null
  className?: string
  selected?: boolean
  color?: Colors
  onClick?: () => void
  disabled?: boolean
  alignItems?: ListItemProps['alignItems']
}

export const Profile: React.SFC<Props> = ({
  text,
  subtext,
  image,
  profileText,
  selected,
  onClick,
  disabled,
  alignItems,
  className,
}) => {
  const icon = <Icon>check</Icon>
  const initials = ((profileText || '').toString() || text)
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('')
    .slice(0, 2)

  return (
    <ListItem
      key={value}
      alignItems={alignItems}
      button={!!onClick}
      onClick={onClick}
      className={className}
      disabled={disabled}>
      <ListItemAvatar>
        <Avatar src={selected ? '' : image || ''}>
          {selected ? icon : initials}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={text} secondary={subtext} />
    </ListItem>
  )
}
