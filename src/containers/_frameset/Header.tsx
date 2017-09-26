/**
 * Created by jiangyukun on 2017/8/30.
 */
import React from 'react'
import classnames from 'classnames'
import OuterClick from 'app-core/core/OuterClick'

import CssTransition from '../../components/CssTransition'
import ChangePasswordDialog from './ChangePasswordDialog'
import {getPositionName} from '../7-account-manage/account-manage.helper'
import MyStatusDialog from './MyStatusDialog'

import Data from '../common/interface/Data'
import {context} from '../../core/env'
import {_get} from '../../core/http'
import {getUserStatusText} from '../common/common.helper'

interface HeaderProps {
  user: any
  changePassword: (userId, oldPassword, newPassword) => void
  changePasswordSuccess: boolean
  updateUserStatus: (options) => void
  updateUserStatusSuccess: boolean
  refreshUserStatus: () => void
  newUserStatus: Data<any>
}

class Header extends React.Component<HeaderProps> {
  state = {
    active: false,
    showResetPassword: false,
    showMyStatusDialog: false,
    currentStatus: 0,
    newStatus: 0,
    startDate: null,
    endDate: null,
  }

  logout = () => {
    _get('/user/v1/logout')
    location.href = `${context}/login`
  }

  componentWillMount() {
    let {currentStatus, userStatusInfo} = this.props.user
    const {newStatus, startDate, endDate} = userStatusInfo
    this.setState({currentStatus, newStatus, startDate, endDate})
  }

  componentWillReceiveProps(nextProps: HeaderProps) {
    if (!this.props.updateUserStatusSuccess && nextProps.updateUserStatusSuccess) {
      this.props.refreshUserStatus()
    }
    if (!this.props.newUserStatus.loaded && nextProps.newUserStatus.loaded) {
      const {currentStatus, newStatus, startDate, endDate} = nextProps.newUserStatus.data
      this.setState({currentStatus, newStatus, startDate, endDate})
    }
  }

  render() {
    let {userName, roleCode, email} = this.props.user
    return (
      <header>
        {
          this.state.showResetPassword && (
            <ChangePasswordDialog
              user={this.props.user}
              changePassword={this.props.changePassword}
              changePasswordSuccess={this.props.changePasswordSuccess}
              onExited={() => this.setState({showResetPassword: false})}
            />
          )
        }
        {
          this.state.showMyStatusDialog && (
            <MyStatusDialog
              currentStatus={this.state.currentStatus}
              newStatus={this.state.newStatus}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              updateUserStatus={this.props.updateUserStatus}
              updateUserStatusSuccess={this.props.updateUserStatusSuccess}
              onExited={() => this.setState({showMyStatusDialog: false})}
            />
          )
        }
        <div>
          <OuterClick onOuterClick={() => this.setState({active: false})}>
            <div className={classnames('user-info', {active: this.state.active})}>
              <div className="user-name" onClick={() => this.setState({active: !this.state.active})}>
                {userName + ' [ ' + getPositionName(roleCode) + ' ] '}
                <img src={require('./down.svg')}/>
              </div>
              <CssTransition visible={this.state.active} timeout={300}>
                <ul className="dropdown-item-container">
                  <li className="dropdown-item text">{email}</li>
                  <li className="dropdown-item btn" onClick={() => this.setState({showResetPassword: true, active: false})}>修改密码</li>
                  <li className="dropdown-item btn" onClick={this.logout}>退出登录</li>
                </ul>
              </CssTransition>
            </div>
          </OuterClick>
          <div className="user-status" onClick={() => this.setState({showMyStatusDialog: true})}>
            我的状态（{getUserStatusText(this.state.currentStatus)}）
          </div>
        </div>
      </header>
    )
  }
}

export default Header
