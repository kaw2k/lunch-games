import * as React from 'react'
import { Dialog, withMobileDialog } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'

interface Props extends DialogProps {}

export const ResponsiveDialog = withMobileDialog<Props>({ breakpoint: 'xs' })(
  props => {
    return <Dialog {...props} />
  }
)
