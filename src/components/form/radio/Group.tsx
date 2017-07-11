/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface GroupProps {
  value: string
  onChange?: any
}

class Group extends React.Component<GroupProps> {
  static childContextTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  onChange = (value) => {
    this.props.onChange(value)
  }

  render() {
    return (
      <div className="radio-group">
        {this.props.children}
      </div>
    )
  }

  getChildContext() {
    return {
      value: this.props.value,
      onChange: this.onChange
    }
  }
}

export default Group
