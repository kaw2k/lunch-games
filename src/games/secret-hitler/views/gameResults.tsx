import * as React from 'react'
import { SecretHitlerResults } from '../interfaces/game'
import { Typography } from '@material-ui/core'
import { values } from 'ramda'
import { useCommonStyles } from '../../../helpers/commonStyles'
import { Profile } from '../../../components/profile'
import { playerName } from '../../../components/playerName'

export const Results: React.SFC<{
  done: () => void
  lobby: SecretHitlerResults
}> = ({ done, lobby }) => {
  const classes = useCommonStyles()

  const players = values(lobby.players)

  const good = players.filter(p => p.role.party === 'liberal')
  const bad = players.filter(p => p.role.party === 'fascist')

  return (
    <>
      <Typography gutterBottom align="center" variant="h2">
        {lobby.victoryMessage}
      </Typography>

      <div className={classes.twoColumns}>
        <div>
          <Typography gutterBottom align="center" variant="h3">
            Good Team
          </Typography>
          {good.map(p => (
            <Profile image={p.profileImg} text={playerName(p)} />
          ))}
        </div>

        <div>
          <Typography gutterBottom align="center" variant="h3">
            Bad Team
          </Typography>
          {bad.map(p => (
            <Profile
              image={p.profileImg}
              text={playerName(p)}
              subtext={p.role.isHitler ? 'hitler' : ''}
            />
          ))}
        </div>
      </div>
    </>
  )
}
