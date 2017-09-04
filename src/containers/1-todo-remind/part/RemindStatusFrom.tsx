/**
 * Created by jiangyukun on 2017/8/17.
 */
import React from 'react'

interface RemindStatusFromProps {
  remind: any
  updateStatus: (remindId, status) => void
}

class RemindStatusFrom extends React.Component<RemindStatusFromProps> {
  render() {
    let remind = this.props.remind
    if (remind.remindType == '1') {
      if (!remind.remindStatus) {
        return (
          <div onClick={() => this.props.updateStatus(remind.id, 'complete')}>
            未处理
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
            未处理
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

export default RemindStatusFrom
