import * as React from 'react'

interface Props {
  flow?: 'horizontal' | 'vertical'
  justify?: 'center' | 'start' | 'end' | 'between' | 'around'
}

export const Grid: React.SFC<Props> = ({
  children,
  flow = '',
  justify = '',
}) => (
  <div className={`grid ${flow} ${justify}`}>
    {children}

    <style jsx>{`
      .grid {
        display: flex;
      }

      .horizontal {
        flex-flow: row;
      }

      .vertical {
        flex-flow: column;
      }

      .between {
        justify-content: space-between;
      }

      .around {
        justify-content: space-around;
      }

      .center {
        justify-content: center;
      }

      .start {
        justify-content: flex-start;
      }

      .end {
        justify-content: flex-end;
      }
    `}</style>
  </div>
)
