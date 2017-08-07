/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'

import {getOperationType} from './common.helper'

interface OperationRecordProps {
  operationRecordList: Record[]
}

export interface Record {
  date: string
  type: number
  module: number
  email: string
  content: string
}

class OperationRecord extends React.Component<OperationRecordProps> {
  render() {
    return (
      <div>
        {
          this.props.operationRecordList.map((record, index) => {
            return (
              <div key={index} className="p10 bb">
                <div className="clearfix">
                  <div className="pull-left">{record.email}</div>
                  <div className="pull-right">{record.date}</div>
                </div>
                <div>
                  {getOperationType(record.type)} {record.content}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default OperationRecord
