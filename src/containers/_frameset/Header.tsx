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
    userStatus: 0
  }

  logout = () => {
    _get('/user/v1/logout')
    location.href = `${context}/login`
  }

  componentWillMount() {
    this.setState({userStatus: this.props.user.userStatus})
  }

  componentWillReceiveProps(nextProps: HeaderProps) {
    if (!this.props.updateUserStatusSuccess && nextProps.updateUserStatusSuccess) {
      this.props.refreshUserStatus()
    }
    if (!this.props.newUserStatus.loaded && nextProps.newUserStatus.loaded) {
      this.setState({userStatus: nextProps.newUserStatus.data})
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
              userStatus={this.state.userStatus}
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
            我的状态（{getUserStatusText(this.state.userStatus)}）
          </div>
        </div>
      </header>
    )
  }
}

export default Header
