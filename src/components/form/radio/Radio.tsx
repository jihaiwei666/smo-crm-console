/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './radio.scss'
import Group from './Group'

interface RadioProps {
  value: string
}

class Radio extends React.Component<RadioProps> {
  static Group = Group
  static contextTypes = {
    value: PropTypes.string
  }

  render() {
    return (
      <div className="radio-wrapper">
        <span className={classnames('radio', {'radio-checked': this.context.value == this.props.value})}>
          <input type="radio" className="radio-input"/>
          <span className="radio-inner"></span>
        </span>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default Radio
