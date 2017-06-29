/**
 * Created by jiangyukun on 2017/4/6.
 */
import React, {Component} from 'react'
import {Provider} from 'react-redux'

import './login.scss'

class Login extends Component<any> {

  handleSubmit = () => {

  }

  render() {
    return (
      <div className="login">
        <div className="header">
          <div className="logo">
            <h1>思默CRM</h1>
          </div>
        </div>
        <div className="content">
          <div className="content-layout">
            <div className="login-box-warp">
              <div className="login-box">
                <div className="static-form">
                  <div className="login-title">密码登录</div>
                  <form>
                    <div className="field username-field">
                      <label htmlFor="username"></label>
                      <span className="ph-label"></span>
                      <input id="username" type="text" className="login-text" tabIndex={1}/>
                    </div>
                    <div className="field pwd-field">
                      <label htmlFor="password"></label>
                      <span className="ph-label"></span>
                      <input id="password" type="password" className="login-text" tabIndex={2}/>
                    </div>
                    <div className="submit">
                      <button onClick={this.handleSubmit}>登 录</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    )
  }
}

export default Login
