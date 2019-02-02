import * as React from 'react'
import { BoardEffects, Party } from '../interfaces/game'
import { Icon } from './icon'
import { Asset } from './asset'

export const Card: React.SFC<{
  type?: BoardEffects | null
  party: Party
  played?: boolean
}> = ({ type, party, played }) => {
  return (
    <div className="placeholder">
      {type === 'choose president' && <Icon icon="check" />}
      {type === 'kill' && <Icon icon="kill" />}
      {type === 'inspect role' && <Icon icon="inspect" />}
      {type === 'inspect cards' && <Icon icon="inspect" />}

      <Asset
        className="card"
        asset={party === 'fascist' ? 'cardFail' : 'cardSuccess'}
      />

      <style jsx>{`
        .placeholder {
          position: relative;
        }
        .card {
          width: 100%;
          opacity: ${played ? '1' : '.1'};
        }
        .icon {
          width: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
