/**
 * Created by jiangyukun on 2017/4/11.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import PageContent from './PageContent'
import Modules from './Modules'
import RecentOpen from './RecentOpen'

import Data from '../common/interface/Data'
import {fetchRecentOpenList, changePassword} from '../../actions/app.action'
import {getPath} from '../../core/env'
import pages from '../../core/pages'
import Header from './Header'

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
}

class SimoCrmApp extends React.Component<SimoCrmAppProps> {
  static contextTypes = {
    router: PropTypes.any
  }

  componentDidMount() {
    this.props.fetchRecentOpenList(0)
    if (this.props.router.location.pathname == getPath('index')) {
      this.context.router.history.replace(getPath(pages.todoRemind))
    }
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
            <Modules roleCode={this.props.roleCode} currentPath={this.props.currentPath}/>
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
  changeMessageStatus, fetchRecentOpenList, changePassword
})(SimoCrmApp)
