/**
 * Created by jiangyukun on 2017/4/11.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessageManage from 'app-core/message/'

import '../../scss/common.scss'
import PageContent from './PageContent'
import {changeMessageStatus} from 'app-core/message/message.action'

class SimoCrmApp extends Component<any> {
  render() {
    return (
      <div className="app">
        <MessageManage messageList={this.props.msgQueue} changeMessageStatus={this.props.changeMessageStatus}/>
        <aside>
          <header className="brand-name">simo</header>
          <nav className="nav-items"></nav>
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
    ...state['app']
  }
}

export default connect(mapStateToProps, {changeMessageStatus})(SimoCrmApp)
