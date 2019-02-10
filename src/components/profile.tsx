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

interface Props {
  text: string
  subtext?: string
  profileText?: string | number
  image?: string | null
  className?: string
  selected?: boolean
  color?: Colors
  onClick?: () => void
  disabled?: boolean
}

export const Profile: React.SFC<Props> = ({
  text,
  subtext,
  image,
  profileText,
  selected,
  onClick,
  disabled,
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
      button={!!onClick}
      onClick={onClick}
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
