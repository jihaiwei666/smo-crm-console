/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import classnames from 'classnames'

import './checkbox.scss'

interface CheckBoxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

class CheckBox extends React.Component<CheckBoxProps> {
  handleChange = (e) => {
    this.props.onChange(e.target.checked)
  }

  render() {
    return (
      <label className="checkbox-wrapper">
        <span className={classnames('checkbox', {'checkbox-checked': this.props.checked})}>
          <input className="checkbox-input" type="checkbox" onChange={this.handleChange}/>
          <span className="checkbox-inner"></span>
        </span>

        <span>{this.props.children}</span>
      </label>
    )
  }
}

export default CheckBox
