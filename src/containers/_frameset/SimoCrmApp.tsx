/**
 * Created by jiangyukun on 2017/4/11.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import '../../scss/common.scss'
import PageContent from './PageContent'
import {getPath} from '../../core/env'
import pages from '../../core/pages'

class SimoCrmApp extends Component<any> {
  render() {
    const todoRemind = getPath(pages.todoRemind)
    const accountManage = getPath(pages.accountManage)

    return (
      <div className="app">
        <MessageManage messageList={this.props.message.msgQueue} changeMessageStatus={this.props.changeMessageStatus}/>
        <aside>
          <header className="brand-name">
            <img src={require('../images/simo.png')}/>
          </header>
          <nav className="nav-container">
            <ul className="nav-items">
              <li>
                <Link to={todoRemind}>待办提醒</Link>
              </li>
              <li>
                客户
              </li>
              <li>
                项目
              </li>
              <li>
                合同
              </li>
              <li>
                报表
              </li>
              <li>
                回收站
              </li>
              <li>
                <Link to={accountManage}>
                  账号管理
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main>
          <header></header>
          <div className="app-function-page">
            <PageContent match={this.props.match}/>
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['app'],
    message: state.message
  }
}

export default connect(mapStateToProps, {changeMessageStatus})(SimoCrmApp)
