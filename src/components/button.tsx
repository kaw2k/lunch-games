import * as React from 'react'
import cx from 'classnames'
import MButton, { ButtonProps } from '@material-ui/core/Button'
import { Omit } from '@material-ui/core'
import { useColor, BackgroundColor } from '../hooks/useColor'

export interface Props extends Omit<ButtonProps, 'color' | 'variant'> {
  confirm?: string | boolean
  color?: BackgroundColor
}

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

  const backgroundColor = useColor(color)

  return (
    <MButton
      {...props}
      fullWidth={fullWidth}
      size={size}
      className={cx(className, backgroundColor)}
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
