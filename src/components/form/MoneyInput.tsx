/**
 * Created by jiangyukun on 2017/8/29.
 */
import React from 'react'

import Input, {InputProps} from './Input'
import {getMoneyText} from '../../core/utils/common'
import regex from '../../core/constants/regex'

interface MoneyInputProps extends InputProps {

}

const checkFormat = (value) => {
  return regex.NUMBER.test(value.replace(/,/g, ''))
}

class MoneyInput extends React.Component<MoneyInputProps> {
  onChange = (v) => {
    this.props.onChange(v.replace(/,/g, ''))
  }

  render() {
    let value = getMoneyText(this.props.value)
    return (
      <Input className="money-input" {...this.props} value={value} onChange={this.onChange} format={checkFormat}/>
    )
  }
}

export default MoneyInput
