import * as React from 'react'
import { Dialog, useTheme, useMediaQuery } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'

export const ResponsiveDialog: React.SFC<DialogProps> = props => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return <Dialog {...props} fullScreen={fullScreen} />
}
