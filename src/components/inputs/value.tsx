import * as React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Input } from '../input'

const useStyles = makeStyles({
  label: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: '.5em',
  },
  input: {
    width: '55px',
    marginRight: '1em',
    flex: '0 0 auto',
  },
  section: {
    marginTop: '2em',
    marginBottom: '.5em',
  },
})

export const Value: React.SFC<{
  title: string
  id: string
  description: string
  value: number
  onChange: (val: number) => void
}> = ({ title, onChange, description, id, value }) => {
  const classes = useStyles()

  return (
    <label className={classes.label} htmlFor={id}>
      <Input
        id={id}
        value={value}
        type="tel"
        className={classes.input}
        onChange={e =>
          onChange(parseInt(e.target.value.replace(/\D/g, '') || '0', 10))
        }
      />
      <div className={classes.text}>
        <Typography gutterBottom className={classes.title} variant="h4">
          {title}
        </Typography>
        <Typography component="span" display="inline">
          {description}
        </Typography>
      </div>
    </label>
  )
}
