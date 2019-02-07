import * as React from 'react'
import { TextField } from '@material-ui/core'
import { TextFieldProps } from '@material-ui/core/TextField'

export const Input: React.SFC<TextFieldProps> = props => (
  <TextField
    fullWidth
    autoComplete="off"
    autoCorrect="off"
    autoCapitalize="off"
    spellCheck={false}
    margin="normal"
    {...props}
    variant="outlined"
    onKeyPress={e => e.key === 'Enter' && props.onSubmit && props.onSubmit(e)}
  />
)
