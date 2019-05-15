import * as React from 'react'
import cx from 'classnames'
import { Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface Props {
  className?: string
  selected?: boolean | number
  selectedBackgroundColor?: 'green' | 'white'
  onClick?: () => void
  style?: React.CSSProperties
  disabled?: boolean
  dim?: boolean
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    transition: '0.3s ease-in-out opacity',
  },

  dim: {
    opacity: 0.3,
  },

  selectedContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    transition: '.3s ease-in-out all',
    display: 'flex',
    color: 'transparent',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedGreen: {
    background: 'rgba(76, 175, 80, 0.8)',
    color: 'white',
  },

  selectedWhite: {
    background: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(76, 175, 80)',
  },
})

export const Selectable: React.SFC<Props> = ({
  selected,
  onClick,
  disabled,
  dim,
  className,
  selectedBackgroundColor = 'green',
  children,
}) => {
  const classes = useStyles()

  const clickable =
    onClick && !disabled
      ? {
          onClick,
          disabled,
          tabIndex: 0,
          role: 'button',
          onKeyPress: (e: any) => e.which === 13 && onClick(),
        }
      : {}

  return (
    <div
      {...clickable}
      style={{
        cursor: onClick ? 'pointer' : 'inherit',
      }}
      className={cx(className, classes.root, {
        [classes.dim]: disabled || dim,
      })}>
      {children}

      <div
        className={cx(classes.selectedContainer, {
          [classes.selectedWhite]:
            selected && selectedBackgroundColor === 'white',
          [classes.selectedGreen]:
            selected && selectedBackgroundColor === 'green',
        })}>
        {typeof selected === 'number' ? (
          <Typography variant="h1" color="inherit">
            {selected}
          </Typography>
        ) : (
          <Icon fontSize="large" color="inherit">
            check
          </Icon>
        )}
      </div>
    </div>
  )
}
