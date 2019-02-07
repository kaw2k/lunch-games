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
  return (
    <ListItem
      key={value}
      button={!!onClick}
      onClick={onClick}
      disabled={disabled}>
      <ListItemAvatar>
        <Avatar>
          {profileText !== undefined ? (
            <div className="profile-placeholder">
              {profileText
                .toString()
                .trim()
                .slice(0, 2)}
            </div>
          ) : selected ? (
            <Icon>check</Icon>
          ) : image ? (
            <img className="profile-img" src={image} />
          ) : (
            <div className="profile-placeholder">
              {text
                .trim()
                .split(' ')
                .map(word => word[0].toUpperCase())
                .join('')
                .slice(0, 2)}
            </div>
          )}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={text} secondary={subtext} />
    </ListItem>
  )
}
