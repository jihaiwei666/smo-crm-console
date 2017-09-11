/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Popover from 'antd/lib/popover'
import Spinner from 'app-core/common/Spinner'

import {getOperationType, getNameAndEmail} from './common.helper'
import AccountInfo from './account/AccountInfo'
import Data from './interface/Data'

import {getPositionName} from '../7-account-manage/account-manage.helper'
import {fetchAccountInfo} from '../../actions/app.action'

interface OperationRecordProps {
  fetchAccountInfo: (email) => void
  accountInfo: Data<any>
  operationRecordList: Record[]
}

export interface Record {
  date: string
  type: number
  module: number
  email: string
  content: string
  name: string
}

class OperationRecord extends React.Component<OperationRecordProps> {
  email: ''
  handleChange = (email) => {
    if (this.email != email) {
      this.email = email
      this.props.fetchAccountInfo(email)
    }
  }

  render() {
    let {data, loaded} = this.props.accountInfo
    let accountInfo = (
      <div>
        {
          !loaded && (
            <Spinner/>
          )
        }
        {
          loaded && (
            <AccountInfo
              email={data.email} name={data.name} position={getPositionName(data.position)}
            />
          )
        }
      </div>
    )

    return (
      <div>
        {
          this.props.operationRecordList.map((record, index) => {
            return (
              <div key={index} className="operation-record-container --module-item">
                <div className="mb7 clearfix">
                  <div className="pull-left">
                    <Popover
                      content={accountInfo} title={<div className="account-info-header">账号信息</div>}
                      onVisibleChange={() => this.handleChange(record.email)}
                    >
                      <a>{getNameAndEmail(record.name, record.email)}</a>
                    </Popover>
                  </div>
                  <div className="pull-right">{record.date}</div>
                </div>
                <div className="operation-content">
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

function mapStateToProps(state) {
  return {
    accountInfo: state.accountInfo
  }
}

export default connect(mapStateToProps, {fetchAccountInfo})(OperationRecord)
