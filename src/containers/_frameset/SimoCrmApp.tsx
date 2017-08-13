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
import {fetchRecentOpenList} from '../../actions/app.action'
import List from '../common/interface/List'

interface SimoCrmAppProps {
  fetchRecentOpenList: (start) => void
  recentOpenList: List<any>
  message: any
  changeMessageStatus: any
  match: any
  currentPath: string
}

class SimoCrmApp extends Component<SimoCrmAppProps> {
  componentDidMount() {
    this.props.fetchRecentOpenList(0)
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
            <Modules currentPath={this.props.currentPath}/>
            <RecentOpen recentOpenList={this.props.recentOpenList}/>
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
    recentOpenList: state.recentOpenList,
    currentPath
  }
}

export default connect(mapStateToProps, {
  changeMessageStatus, fetchRecentOpenList
})(SimoCrmApp)
