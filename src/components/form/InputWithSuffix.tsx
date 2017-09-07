/**
 * Created by jiangyukun on 2017/8/29.
 */
import React from 'react'
import classnames from 'classnames'
import addFormSupport, {checkValid} from 'app-core/core/hoc/addFormSupport'

import Input from './Input'

interface InputWithSuffixProps {
  value: string
  onChange?: (v) => void
  placeholder: string
  suffix: string
  disabled?: boolean
  valid: boolean
}

class InputWithSuffix extends React.Component<InputWithSuffixProps> {
  state = {
    touched: false
  }

  render() {
    return (
      <div className={classnames('input-have-unit', {invalid: this.state.touched && !this.props.valid})} disabled={this.props.disabled}>
        <Input clsPrefix="suffix-input" placeholder={this.props.placeholder} value={this.props.value}
               onChange={this.props.onChange} disabled={this.props.disabled}
               onBlur={() => this.setState({touched: true})}
        />
        <div className="unit">{this.props.suffix}</div>
      </div>
    )
  }
}

export default addFormSupport(InputWithSuffix, ({props}) => checkValid(props.format, props.value))
