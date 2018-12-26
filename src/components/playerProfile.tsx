import * as React from 'react'
import { Player } from '../interfaces/player'

interface Props {
  player: Player
  subtext?: string
  className?: string
  justify?: 'center' | 'flex-start' | 'flex-end'
  highlight?: boolean
}

export const PlayerProfile: React.SFC<Props> = ({
  player,
  subtext,
  className = '',
  justify,
  highlight,
}) => (
  <div
    className={`profile ${className} ${highlight && 'highlight'}`}
    style={{ justifyContent: justify }}>
    {player.profileImg ? (
      <img className="profile-img" src={player.profileImg} />
    ) : (
      <div className="profile-placeholder">
        {(player.name || player.id)
          .trim()
          .split(' ')
          .map(word => word[0].toUpperCase())
          .join('')
          .slice(0, 2)}
      </div>
    )}
    <div>
      <h3>{player.name || player.id}</h3>
      {subtext && <em>{subtext}</em>}
    </div>

    <style jsx>{`
      .profile {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      img,
      .profile-placeholder {
        border-radius: 50%;
        height: 3rem;
        width: 3rem;
        object-fit: cover;
      }

      .profile-placeholder {
        line-height: 3rem;
        border: 1px solid black;
        font-size: 1.25em;
        text-align: center;
      }

      .highlight {
        color: red;
      }

      h3 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      em {
        opacity: 0.5;
        font-size: 0.75em;
      }

      .profile > * + * {
        margin-left: 0.5em;
      }
    `}</style>
  </div>
)
