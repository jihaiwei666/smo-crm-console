/**
 * Created by jiangyukun on 2017/8/29.
 */
import React from 'react'

interface InputWithSuffixProps {
  value: string
  onChange: (v) => void
  placeholder: string
  suffix: string
  disabled?: boolean
}

class InputWithSuffix extends React.Component<InputWithSuffixProps> {
  render() {
    return (
      <div className="input-have-unit" disabled={this.props.disabled}>
        <input className="" placeholder={this.props.placeholder} value={this.props.value}
               onChange={e => this.props.onChange(e.target.value)} disabled={this.props.disabled}/>
        <div className="unit">{this.props.suffix}</div>
      </div>
    )
  }
}

export default InputWithSuffix
