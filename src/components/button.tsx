import * as React from 'react'
import { getColor, Colors } from '../helpers/colors'

interface Props extends React.ButtonHTMLAttributes<any> {
  confirm?: boolean | string
  padded?: boolean
  color?: Colors
}
interface State {
  confirmTimer?: any
}

export class Button extends React.Component<Props, State> {
  state: State = {
    confirmTimer: null,
  }

  onClick = (e: any) => {
    const propsOnClick = this.props.onClick

    if (propsOnClick && this.props.confirm && !this.state.confirmTimer) {
      this.setState({
        confirmTimer: setTimeout(() => {
          this.setState({ confirmTimer: clearTimeout(this.state.confirmTimer) })
        }, 3000),
      })
    } else if (propsOnClick && this.props.confirm && this.state.confirmTimer) {
      this.setState({ confirmTimer: clearTimeout(this.state.confirmTimer) })
      propsOnClick(e)
    } else if (propsOnClick) {
      propsOnClick(e)
    }
  }

  render() {
    const {
      confirm,
      children,
      padded = false,
      className = '',
      color = 'black',
      ...props
    } = this.props
    return (
      <button {...props} className={className} onClick={this.onClick}>
        {this.state.confirmTimer ? (
          <React.Fragment>
            {typeof confirm === 'string' ? confirm : `confirm: ${children}`}
          </React.Fragment>
        ) : (
          children
        )}

        <style jsx>{`
          button {
            font-size: 1em;
            flex: 0 0;
            cursor: pointer;
            padding: ${padded ? '1em' : '0'};
            text-transform: uppercase;
            font-weight: 500;

            color: ${color === 'black' ? 'black' : 'white'};
            border: 1px solid ${getColor(color)};
            background-color: ${color === 'black' ? 'white' : getColor(color)};
          }

          button:disabled {
            opacity: 0.25;
          }
        `}</style>
      </button>
    )
  }
}
