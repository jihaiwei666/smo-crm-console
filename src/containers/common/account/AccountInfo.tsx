/**
 * Created by jiangyukun on 2017/8/22.
 */
import React from 'react'

interface AccountInfoProps {
  email: string
  name: string
  position: string
}

class AccountInfo extends React.Component<AccountInfoProps> {
  render() {
    return (
      <div className="account-info">
        <div className="account-info-item">
          <div className="account-info-title">账号（邮箱）：</div>
          <div>{this.props.email}</div>
        </div>
        <div className="account-info-item">
          <div className="account-info-title">姓名：</div>
          <div>{this.props.name}</div>
        </div>
        <div className="account-info-item">
          <div className="account-info-title">岗位类别：</div>
          <div>{this.props.position}</div>
        </div>
      </div>
    )
  }
}

export default AccountInfo
