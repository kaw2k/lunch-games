import * as React from 'react'

interface Props extends React.ButtonHTMLAttributes<any> {
  confirm?: boolean | string
  theme?: 'action' | 'inline'
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
      theme = 'action',
      className = '',
      ...props
    } = this.props
    return (
      <button
        {...props}
        className={`${className} ${theme}`}
        onClick={this.onClick}>
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
          }

          .action {
            border: 0;
            padding: 1em;
          }

          .inline {
            padding: 0.3em 0.5em;
            border: 1px solid black;
            border-radius: 3px;
          }

          button:disabled {
            opacity: 0.25;
          }
        `}</style>
      </button>
    )
  }
}
