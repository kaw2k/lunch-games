import { makeStyles } from '@material-ui/styles'

export const useCommonStyles = makeStyles({
  row: {
    display: 'flex',
  },

  padded: {
    padding: '1em',
  },

  spacingTop: {
    marginTop: '1em',
  },

  spacingBottom: {
    marginBottom: '1em',
  },

  pullRight: {
    marginLeft: 'auto',
  },

  buttonReset: {
    border: 'none',
    background: 'transparent',
  },

  twoColumns: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: '50%',
    },
  },

  dim: {
    opacity: 0.25,
  },

  raise: {
    position: 'relative',
    zIndex: 20,
  },

  shelf: {
    display: 'flex',
    overflowX: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
    '& > * + *': {
      marginLeft: '1em',
      flex: '0 0 auto',
    },
  },
})
