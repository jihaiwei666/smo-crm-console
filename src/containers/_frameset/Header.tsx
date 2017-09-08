/**
 * Created by jiangyukun on 2017/8/30.
 */
import React from 'react'
import classnames from 'classnames'
import OuterClick from 'app-core/core/OuterClick'

import {context} from '../../core/env'
import {_get} from '../../core/http'
import CssTransition from '../../components/CssTransition'
import ChangePasswordDialog from './ChangePasswordDialog'
import {getPositionName} from '../7-account-manage/account-manage.helper'

interface HeaderProps {
  user: any
  changePassword: (userId, oldPassword, newPassword) => void
  changePasswordSuccess: boolean
}

class Header extends React.Component<HeaderProps> {
  state = {
    active: false,
    showResetPassword: false
  }

  logout = () => {
    _get('/user/v1/logout')
    location.href = `${context}/login`
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
          <div className="user-status">
            我的状态（正常）
          </div>
        </div>
      </header>
    )
  }
}

export default Header
