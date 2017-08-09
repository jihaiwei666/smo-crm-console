/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import Select1 from 'app-core/common/Select1'

import {MONEY_UNIT} from '../3-project/project.constant'

interface MoneyUnitProps {
  value: string
  onChange: (v) => void
  required?: boolean
  name?: string
}

class MoneyUnit extends React.Component<MoneyUnitProps> {
  render() {
    return (
      <div style={{width: '90px', marginRight: '15px'}}>
        <Select1
          placeholder="请选择单位"
          className="small" options={MONEY_UNIT}
          value={this.props.value}
          onChange={this.props.onChange}
          required={this.props.required}
          name={this.props.name}
        />
      </div>
    )
  }
}

export default MoneyUnit
