/**
 * Created by jiangyukun on 2017/7/25.
 */
import React from 'react'
import CheckBox from '../checkbox/CheckBox'
import {copyList} from '../../../core/utils/common'

import './check-group.scss'

interface CheckGroupProps {
  options: { value: any, text: string }[]
  value: any[]
  onChange: (value: any[]) => void
}

class CheckGroup extends React.Component<CheckGroupProps> {
  handleChange = (itemValue) => {
    const value = copyList(this.props.value)
    let index = value.indexOf(itemValue)
    if (index != -1) {
      value.splice(index, 1)
      this.props.onChange(value)
    } else {
      value.push(itemValue)
      this.props.onChange(value)
    }
  }

  render() {
    return (
      <div className="check-group">
        {
          this.props.options.map(option => {
            return (
              <CheckBox
                key={option.value}
                checked={this.props.value.indexOf(option.value) != -1}
                onChange={() => this.handleChange(option.value)}
              >
                {option.text}
              </CheckBox>
            )
          })
        }
      </div>
    )
  }
}

export default CheckGroup
