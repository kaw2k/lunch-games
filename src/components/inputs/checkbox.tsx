import * as React from 'react'
import { Typography, Checkbox as MUICheckbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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

export const Checkbox: React.SFC<{
  id: string
  title: string
  description: string
  value: boolean
  onChange: (val: boolean) => string
}> = ({ description, id, onChange, title, value }) => {
  const classes = useStyles()

  return (
    <label className={classes.label} htmlFor={id}>
      <MUICheckbox
        id={id}
        type="checkbox"
        checked={value}
        onChange={e => {
          onChange(e.target.checked)
        }}
      />
      <div className={classes.text}>
        <Typography gutterBottom className={classes.title} variant="h4">
          {title}
        </Typography>
        <Typography component="span" inline>
          {description}
        </Typography>
      </div>
    </label>
  )
}
