/**
 * Created by jiangyukun on 2017/4/11.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'


import MessageManage from 'app-core/message/'
import {changeMessageStatus} from 'app-core/message/message.action'

import PageContent from './PageContent'

import Modules from './Modules'
import RecentOpen from './RecentOpen'

interface SimoCrmAppProps {
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
}

class SimoCrmApp extends Component<SimoCrmAppProps> {
  render() {
    return (
      <div className="app">
        <MessageManage messageList={this.props.message.msgQueue} changeMessageStatus={this.props.changeMessageStatus}/>
        <aside>
          <header className="brand-name">
            <img src={require('../images/simo.png')}/>
          </header>
          <nav className="nav-container">
            <Modules currentPath={this.props.currentPath}/>
            <RecentOpen/>
          </nav>
        </aside>
        <main>
          <header></header>
          <PageContent match={this.props.match}/>
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
