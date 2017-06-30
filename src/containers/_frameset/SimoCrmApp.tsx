/**
 * Created by jiangyukun on 2017/4/11.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import MessageManage from 'app-core/message/'

import {changeMessageStatus} from '../../actions/app.action'

class SimoCrmApp extends Component<any> {

  render() {
    return (
      <div className="app">
        <div className="message-container">
          <MessageManage messageList={[]} changeMessageStatus={this.props.changeMessageStatus}/>
        </div>
        xxx
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['app'],
    router: state['router']
  }
}

export default connect(mapStateToProps, {changeMessageStatus})(SimoCrmApp)
