/**
 * Created by jiangyukun on 2017/8/4.
 */
import React from 'react'
import PropTypes from 'prop-types'

import {copyList} from '../../../core/utils/common'

interface CheckGroup1Props {
  value: any[]
  onChange: (value: any[]) => void
}

type ChildContextTypes = {
  value: any[]
  onChange: (value) => void
}

class CheckGroup1 extends React.Component<CheckGroup1Props> implements React.ChildContextProvider<ChildContextTypes> {
  static childContextTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
  }

  handleChange = (value) => {
    let newValue = copyList(this.props.value)
    if (newValue.indexOf(value) == -1) {
      newValue.push(value)
    } else {
      newValue.splice(newValue.indexOf(value), 1)
    }
    this.props.onChange(newValue)
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
      value: this.props.value,
      onChange: this.handleChange
    }
  }
}

export default CheckGroup1
