/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'

import CheckBox from '../../../components/form/checkbox/CheckBox'
import Button from '../../../components/button/Button'

interface RemindStatusProps {
  remind: any
  updateToComplete: (remindId) => void
}

class RemindStatus extends React.Component<RemindStatusProps> {
  render() {
    let remind = this.props.remind
    if (remind.remindType == '1') {
      if (!remind.remindStatus) {
        return (
          <div onClick={() => this.props.updateToComplete(remind.id)}>
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
            <Button className="small">接受</Button>
            <Button className="small danger">拒绝</Button>
          </div>
        )
      } else if (remind.remindStatus == '1') {
        return (
          <Button className="small">接受</Button>
        )
      } else if (remind.remindStatus == '2') {
        return (
          <Button className="small danger">拒绝</Button>
        )
      }
    }
    return null
  }
}

export default RemindStatus
