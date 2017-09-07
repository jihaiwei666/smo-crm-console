/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './radio.scss'
import Group from './Group'

interface RadioProps {
  value: string | number
  disabled?: boolean
}

class Radio extends React.Component<RadioProps> {
  static Group = Group
  static contextTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  }

  onChange = () => {
    this.context.onChange(this.props.value)
  }

  render() {
    return (
      <label className={classnames('radio-wrapper', {'radio-wrapper-disabled': this.props.disabled})}>
        <span className={classnames('radio', {'radio-checked': this.context.value == this.props.value}, {'radio-disabled': this.props.disabled})}>
          <input type="radio" className="radio-input" disabled={this.props.disabled} onChange={this.onChange}/>
          <span className="radio-inner"></span>
        </span>
        <span>{this.props.children}</span>
      </label>
    )
  }
}

export default Radio
