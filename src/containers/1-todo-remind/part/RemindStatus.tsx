/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'

import CheckBox from '../../../components/form/checkbox/CheckBox'
import Button from '../../../components/button/Button'

interface RemindStatusProps {
  remind: any
  updateStatus: (remindId, status) => void
}

class RemindStatus extends React.Component<RemindStatusProps> {
  render() {
    let remind = this.props.remind
    if (remind.remindType == '1') {
      if (!remind.remindStatus) {
        return (
          <div onClick={() => this.props.updateStatus(remind.id, 'complete')}>
            <CheckBox checked={false} onChange={() => null}>
              已完成
            </CheckBox>
          </div>
        )
      } else if (remind.remindStatus == '1') {
        return (
          <div>已完成</div>
        )
      }
    } else if (remind.remindType == '2') {
      if (!remind.remindStatus) {
        return (
          <div>
            <Button className="small" onClick={() => this.props.updateStatus(remind.id, 'accept')}>接受</Button>
            <Button className="small danger" onClick={() => this.props.updateStatus(remind.id, 'reject')}>拒绝</Button>
          </div>
        )
      } else if (remind.remindStatus == '1') {
        return (
          <span>已接受</span>
        )
      } else if (remind.remindStatus == '2') {
        return (
          <span>已拒绝</span>
        )
      }
    }
    return null
  }
}

export default RemindStatus
