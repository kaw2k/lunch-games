import * as React from 'react'
import { Button } from './button'

interface Props {
  text: string
  subtext?: string
  image?: string | null
  className?: string
  justify?: 'center' | 'flex-start' | 'flex-end'
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
}

export const Profile: React.SFC<Props> = ({
  text,
  subtext,
  image,
  className = '',
  justify,
  selected,
  onClick,
  disabled,
}) => {
  const inner = (
    <div className={`profile ${className}`}>
      {selected ? (
        <div className="profile-placeholder">&#10003;</div>
      ) : image ? (
        <img className="profile-img" src={image} />
      ) : (
        <div className="profile-placeholder">
          {text
            .trim()
            .split(' ')
            .map(word => word[0].toUpperCase())
            .join('')
            .slice(0, 2)}
        </div>
      )}
      <div>
        <h3>{text}</h3>
        {subtext && <em>{subtext}</em>}
      </div>

      <style jsx>{`
        .profile {
          display: flex;
          align-items: center;
          justify-content: ${justify};
        }

        img,
        .profile-placeholder {
          border-radius: 50%;
          height: 3rem;
          width: 3rem;
          object-fit: cover;
          line-height: 3rem;
          font-size: 1.25em;
          text-align: center;
          color: ${selected ? 'red' : 'black'};
          border: 1px solid ${selected ? 'red' : 'black'};
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

  return onClick ? (
    <Button style={{ display: 'block' }} disabled={disabled} onClick={onClick}>
      {inner}
    </Button>
  ) : (
    inner
  )
}
