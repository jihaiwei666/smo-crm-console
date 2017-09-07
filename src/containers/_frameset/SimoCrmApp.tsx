/**
 * Created by jiangyukun on 2017/4/11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import Header from './Header'
import PageContent from './PageContent'
import Modules from './Modules'
import RecentOpen from './RecentOpen'

import Data from '../common/interface/Data'
import {getPath} from '../../core/env'
import pages from '../../core/pages'
import {fetchRecentOpenList, changePassword} from '../../actions/app.action'
import {fetchUnReadRemindAmount, clearRemindAmount} from '../1-todo-remind/todo-remind.action'

interface SimoCrmAppProps {
  user: any
  roleCode: number
  fetchRecentOpenList: (start) => void
  recentOpenList: Data<any>
  changePassword: () => void
  changePasswordSuccess: boolean
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
  router: any
  fetchUnReadRemindAmount: () => void
  fetchUnreadRemindAmountSuccess: boolean
  unreadRemindAmount: number
  clearRemindAmount: () => void
}

class SimoCrmApp extends React.Component<SimoCrmAppProps> implements React.ChildContextProvider<any> {
  static childContextTypes = {
    roleCode: PropTypes.number
  }
  static contextTypes = {
    router: PropTypes.any
  }
  taskId = null

  componentDidMount() {
    this.props.fetchRecentOpenList(0)
    if (this.props.router.location.pathname == getPath('index')) {
      this.context.router.history.replace(getPath(pages.todoRemind))
    }
    this.props.fetchUnReadRemindAmount()
    this.taskId = setInterval(() => {
      this.props.fetchUnReadRemindAmount()
    }, 30000)
  }

  componentWillUnmount() {
    clearInterval(this.taskId)
  }

  render() {
    return (
      <div className="app">
        <MessageManage messageList={this.props.message.msgQueue} changeMessageStatus={this.props.changeMessageStatus}/>
        <aside>
          <header className="brand-name">
            <img src={require('../images/simo.png')}/>
          </header>
          <nav className="nav-container">
            <Modules
              fetchUnreadRemindAmountSuccess={this.props.fetchUnreadRemindAmountSuccess}
              unreadRemindAmount={this.props.unreadRemindAmount}
              clearRemindAmount={this.props.clearRemindAmount}
              roleCode={this.props.roleCode}
              currentPath={this.props.currentPath}/>
            <RecentOpen recentOpenList={this.props.recentOpenList}/>
          </nav>
        </aside>
        <main>
          <Header
            user={this.props.user}
            changePassword={this.props.changePassword}
            changePasswordSuccess={this.props.changePasswordSuccess}
          />
          <PageContent roleCode={this.props.roleCode} match={this.props.match}/>
        </main>
      </div>
    )
  }

  getChildContext() {
    return {
      roleCode: this.props.roleCode
    }
  }
}

function mapStateToProps(state) {
  let currentPath = state.router.location.pathname
  return {
    ...state['app'],
    message: state.message,
    recentOpenList: state.recentOpenList,
    currentPath,
    router: state.router
  }
}

export default connect(mapStateToProps, {
  changeMessageStatus, fetchRecentOpenList, changePassword, fetchUnReadRemindAmount, clearRemindAmount
})(SimoCrmApp)
