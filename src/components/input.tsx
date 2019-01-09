import * as React from 'react'

interface Props {
  onSubmit?: (value: any) => void
  onChange?: (value: any) => void
  label: string
  id: string
  className?: string
  type?: 'text' | 'tel' | 'checkbox' | 'file'
  value?: any
  checked?: any
  placeholder?: string
  autoFocus?: boolean
}

export const Input: React.SFC<Props> = ({
  value,
  className,
  onChange,
  onSubmit,
  label,
  type,
  checked,
  placeholder,
  id,
  autoFocus,
}) => (
  <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={false}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      checked={checked}
      onChange={e => onChange && onChange(e)}
      onKeyPress={e => e.key === 'Enter' && onSubmit && onSubmit(e)}
      autoFocus={autoFocus}
    />

    <style jsx>{`
      input,
      label {
        display: block;
        width: 100%;
        font-size: 1em;
      }

      label {
        margin-bottom: 0.5em;
      }

      input {
        border: 1px solid black;
        border-radius: 3px;
        padding: 1em;
      }
    `}</style>
  </div>
)
