import * as React from 'react'
import cx from 'classnames'
import { Colors } from '../../helpers/colors'
import { Icon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getColorFromString } from '../../helpers/getColorFromString'

interface Classes {
  root: string
  imageContainer: string
  image: string
}

export interface Props {
  text?: string
  image?: string | null
  className?: string
  selected?: boolean | number
  color?: Colors
  onClick?: () => void
  disabled?: boolean
  dim?: boolean
  badge?: string | number | boolean | null
  classes?: Partial<Classes>
}

const useStyles = makeStyles({
  root: {
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    'box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.1)',
    transition: '0.3s ease-in-out opacity',
  },

  imageContainer: {
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      content: "''",
      display: 'block',
      paddingTop: '100%',
    },
  },

  colorBlock: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },

  badgeWrapper: {
    position: 'absolute',
    zIndex: 3,
    background: 'rgba(0,0,0,0.6)',
    color: 'white',
    transform: 'rotate(45deg)',
    height: '70px',
    width: '70px',
    top: '-35px',
    left: '-35px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  badge: {
    transform: 'rotate(-45deg)',
    position: 'relative',
    right: '5px',
  },
  badgeText: {
    right: '8px',
  },

  img: {
    width: '100%',
    objectFit: 'cover',
    position: 'relative',
    zIndex: 1,
  },

  content: {
    background: 'white',
    padding: '.5em',
    textAlign: 'center',
  },

  inner: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'stretch',
  },

  dim: {
    opacity: 0.3,
  },

  selectedContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    transition: '.3s ease-in-out all',
    color: 'transparent',
    display: 'flex',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selected: {
    background: 'rgba(76, 175, 80, 0.8)',
    color: 'white',
  },
})

export const Selectable: React.SFC<Props> = ({
  text,
  image,
  selected,
  onClick,
  disabled,
  badge,
  dim,
  className,
  classes: _classes,
}) => {
  const classes = useStyles()
  const passedInClasses = (_classes || {}) as Classes

  const clickable =
    onClick && !disabled
      ? {
          onClick,
          disabled,
          tabIndex: 0,
          role: 'button',
          onKeyPress: (e: any) => e.which === 13 && onClick(),
        }
      : {}

  return (
    <div
      {...clickable}
      style={{
        cursor: onClick ? 'pointer' : 'inherit',
      }}
      className={cx(className, classes.root, {
        [classes.dim]: disabled || dim,
        [passedInClasses.root]: passedInClasses.root,
      })}>
      <div
        className={cx(classes.imageContainer, {
          [passedInClasses.imageContainer]: passedInClasses.imageContainer,
        })}>
        <div className={classes.inner}>
          {image && (
            <img
              className={cx(classes.img, {
                [passedInClasses.image]: passedInClasses.image,
              })}
              src={image}
            />
          )}
          {badge && (
            <div className={classes.badgeWrapper}>
              {typeof badge === 'number' ? (
                <Typography
                  variant="h1"
                  color="inherit"
                  className={cx(classes.badge, classes.badgeText)}>
                  {badge}
                </Typography>
              ) : (
                <Icon
                  fontSize="small"
                  color="inherit"
                  className={classes.badge}>
                  {badge}
                </Icon>
              )}
            </div>
          )}

          <div
            className={cx(classes.selectedContainer, {
              [classes.selected]: selected,
            })}>
            {typeof selected === 'number' ? (
              <Typography variant="h1" color="inherit">
                {selected}
              </Typography>
            ) : (
              <Icon fontSize="large" color="inherit">
                check
              </Icon>
            )}
          </div>

          <div
            className={classes.colorBlock}
            style={{ backgroundColor: getColorFromString(text || '') }}
          />
        </div>
      </div>

      {text && <Typography className={classes.content}>{text}</Typography>}
    </div>
  )
}
