/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface GroupProps {
  value: string | number
  onChange?: any
  name?: string
  required?: boolean
}

class Group extends React.Component<GroupProps> {
  static contextTypes = {
    setValid: PropTypes.func
  }

  static childContextTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  }

  valid: boolean

  onChange = (value) => {
    this.props.onChange(value)
  }

  componentWillMount() {
    if (this.props.required) {
      if (!this.props.name) {
        throw new Error('name is required when Radio.Group is required')
      }
      this.valid = this.props.value != null
      if (this.context.setValid) {
        this.context.setValid(this.props.name, this.valid)
      }
    }
  }

  componentWillReceiveProps(nextProps: GroupProps) {
    if (this.props.required) {
      let valid = this.props.value != null
      if (valid != this.valid && this.context.setValid) {
        this.context.setValid(this.props.name, valid)
      }
      this.valid = valid
    }
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
