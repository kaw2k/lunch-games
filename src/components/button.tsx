import * as React from 'react'

interface Props extends React.ButtonHTMLAttributes<any> {
  confirm?: boolean | string
  padded?: boolean
  color?: 'red' | 'black'
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
            background: transparent;
            flex: 0 0;
            cursor: pointer;
            border: 0;
            padding: ${padded ? '1em' : '0'};
            color: ${color};
          }

          button:disabled {
            opacity: 0.25;
          }
        `}</style>
      </button>
    )
  }
}
