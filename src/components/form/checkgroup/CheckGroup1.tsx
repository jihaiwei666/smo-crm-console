/**
 * Created by jiangyukun on 2017/8/4.
 */
import React from 'react'
import PropTypes from 'prop-types'

interface CheckGroup1Props {
  value: any[]
  onChange: (value: any[]) => void
}

class CheckGroup1 extends React.Component<CheckGroup1Props> {
  static childContextTypes = {
    handleChange: PropTypes.func
  }

  value = []

  handleChange = (value) => {
    if (this.value.indexOf(value) == -1) {
      this.value.push(value)
    } else {
      this.value.splice(this.value.indexOf(value), 1)
    }
    this.props.onChange(this.value)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

  getChildContext() {
    return {
      value: this.value,
      handleChange: this.handleChange
    }
  }
}

export default CheckGroup1
