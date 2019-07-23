import cx from 'classnames'
import { colors, Color } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export type BackgroundColor =  'blue' | 'green' | 'red' | 'teal' | 'black' | 'inherit' | 'yellow' | null | false | undefined

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
  yellow: { ...makeColor(colors.yellow) },
  black: {
    color: 'black',
    border: '1px solid black',
  },
  inherit: {
    color: 'inherit',
  },
}))

export function useColor(color: BackgroundColor ){

    const classes = useStyles();

    return(
        cx({
            [classes.blue]: color === 'blue',
            [classes.red]: color === 'red',
            [classes.green]: color === 'green',
            [classes.teal]: color === 'teal',
            [classes.black]: color === 'black',
            [classes.inherit]: color === 'inherit',
            [classes.yellow]: color === 'yellow',
        })
    )

}
