/**
 * Created by jiangyukun on 2017/8/29.
 */
import React from 'react'

interface InputWithSuffixProps {
  value: string
  onChange: (v) => void
  placeholder: string
  suffix: string
}

class InputWithSuffix extends React.Component<InputWithSuffixProps> {
  render() {
    return (
      <div className="input-have-unit">
        <input className="" placeholder={this.props.placeholder} value={this.props.value}
               onChange={e => this.props.onChange(e.target.value)}/>
        <div className="unit">{this.props.suffix}</div>
      </div>
    )
  }
}

export default InputWithSuffix
