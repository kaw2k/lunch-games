import * as React from 'react'
import cx from 'classnames'
import MButton, { ButtonProps } from '@material-ui/core/Button'
import { colors, Color, Omit } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface Props extends Omit<ButtonProps, 'color' | 'variant'> {
  confirm?: string | boolean
  color?: 'blue' | 'green' | 'red' | 'teal' | 'black' | 'inherit' | null | false
}

function makeColor(color: Color) {
  return {
    color: 'white',
    background: color[400],
    border: `1px solid ${color[400]}`,
    transition: 'all 0.3s linear',
    '&:hover': {
      backgroundColor: color[300],
      border: `1px solid ${color[300]}`,
    },
    '&:active': {
      backgroundColor: color[500],
      border: `1px solid ${color[500]}`,
    },
    '&:disabled': {
      color: 'white',
      opacity: 0.25,
    },
  }
}

const useStyles = makeStyles(theme => ({
  blue: { ...makeColor(colors.blue) },
  green: { ...makeColor(colors.green) },
  red: { ...makeColor(colors.red) },
  teal: { ...makeColor(colors.teal) },
  black: {
    color: 'black',
    border: '1px solid black',
  },
  inherit: {
    color: 'inherit',
  },
}))

export const Button: React.SFC<Props> = ({
  onClick,
  confirm,
  children,
  className,
  color,
  size = 'large' as ButtonProps['size'],
  fullWidth = true,
  ...props
}) => {
  const [timer, setTimer] = React.useState<NodeJS.Timeout | undefined>(
    undefined
  )
  const classes = useStyles()

  return (
    <MButton
      {...props}
      fullWidth={fullWidth}
      size={size}
      className={cx(className, {
        [classes.blue]: color === 'blue',
        [classes.red]: color === 'red',
        [classes.green]: color === 'green',
        [classes.teal]: color === 'teal',
        [classes.black]: color === 'black',
        [classes.inherit]: color === 'inherit',
      })}
      onClick={e => {
        if (onClick && confirm && !timer) {
          setTimer(
            setTimeout(() => {
              clearTimeout(timer)
              setTimer(undefined)
            }, 3000)
          )
        } else if (onClick && confirm && timer) {
          clearTimeout(timer)
          setTimer(undefined)
          onClick(e)
        } else if (onClick) {
          onClick(e)
        }
      }}>
      {timer ? (
        <React.Fragment>
          {typeof confirm === 'string' ? confirm : `confirm: ${children}`}
        </React.Fragment>
      ) : (
        children
      )}
    </MButton>
  )
}
