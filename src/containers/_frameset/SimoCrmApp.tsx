/**
 * Created by jiangyukun on 2017/4/11.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classnames from 'classnames'
import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import '../../scss/common.scss'
import '../common/page-common.scss'
import PageContent from './PageContent'
import {getPath} from '../../core/env'
import pages from '../../core/pages'

interface SimoCrmAppProps {
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
}

class SimoCrmApp extends Component<SimoCrmAppProps> {
  render() {
    const currentPath = this.props.currentPath
    const todoRemind = getPath(pages.todoRemind)
    const accountManage = getPath(pages.accountManage)
    const clients = getPath(pages.clients)

    return (
      <div className="app">
        <MessageManage messageList={this.props.message.msgQueue} changeMessageStatus={this.props.changeMessageStatus}/>
        <aside>
          <header className="brand-name">
            <img src={require('../images/simo.png')}/>
          </header>
          <nav className="nav-container">
            <ul className="nav-items">
              <li className={classnames({'active': currentPath == getPath(pages.todoRemind)})}>
                <Link to={todoRemind}>待办提醒</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.clients)})}>
                <Link to={clients}>客户</Link>
              </li>
              <li>
                <Link to={todoRemind}>项目</Link>
              </li>
              <li>
                <Link to={todoRemind}>合同</Link>
              </li>
              <li>
                <Link to={todoRemind}>报表</Link>
              </li>
              <li>
                <Link to={todoRemind}>回收站</Link>
              </li>
              <li className={classnames({'active': currentPath == getPath(pages.accountManage)})}>
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
  let currentPath = state.router.location.pathname
  return {
    ...state['app'],
    message: state.message,
    currentPath
  }
}

export default connect(mapStateToProps, {changeMessageStatus})(SimoCrmApp)
