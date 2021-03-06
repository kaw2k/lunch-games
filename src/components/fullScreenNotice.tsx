import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { Button } from './button'
import { useColor, BackgroundColor } from '../hooks/useColor';
import cx from 'classnames';

interface Props {
  onClick?: () => void,  
  color?: BackgroundColor
}

const useStyles = makeStyles({
  button: {
    width: '100%',
    height: '100%',
  },
  done: {
    position: 'fixed',
    top: '1em',
    bottom: '1em',
    right: '1em',
    left: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    margin: 0,
    zIndex: 10,
  },
})

export const FullScreenNotice: React.SFC<Props> = ({ children, onClick, color="green"}) => {
  const classes = useStyles()
  const backgroundColor = useColor(color)
  return (
    <div className={cx(classes.done, backgroundColor)}>
      {onClick ? (
        <Button onClick={onClick} className={classes.button} color={color}>
          {children}
        </Button>
      ) : (
        <Typography className={backgroundColor} align="center" variant="h2" color="inherit">
          {children}
        </Typography>
      )}
    </div>
  )

}
