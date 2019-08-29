import * as React from 'react'
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio as MUIRadio,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  label: {},
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
  radioGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
})

export const Radio: React.SFC<{
  id: string
  title: string
  description: string
  value: any
  onChange: (val: any) => void
  options: { value: any; label: string }[]
}> = ({ description, id, onChange, title, value, options }) => {
  const classes = useStyles()

  return (
    <label className={classes.label} htmlFor={id}>
      <div className={classes.text}>
        <Typography gutterBottom className={classes.title} variant="h4">
          {title}
        </Typography>
        <Typography component="span" display="inline">
          {description}
        </Typography>
      </div>
      <RadioGroup
        className={classes.radioGroup}
        value={value}
        onChange={(e, val) => onChange(val)}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<MUIRadio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </label>
  )
}
