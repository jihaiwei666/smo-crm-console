/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Row, Part} from 'app-core/layout/'

import './todo-remind.scss'
import Button from '../../components/button/Button'
import SendRemindDialog from './dialog/SendRemindDialog'

import * as actions from './todo-remind.action'
import {handleListData} from '../../reducers/data.reducer'

class TodoRemind extends React.Component<any> {
  state = {
    listType: 'all',
    index: -1,
    currentPage: 0,
    showSendRemindDialog: false,
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage)
  }

  showMyList = () => {

  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.todoRemindList)

    return (
      <div className="app-function-page todo-remind">
        {
          this.state.showSendRemindDialog && (
            <SendRemindDialog
              sendRemind={this.props.sendRemind}
              sendRemindSuccess={this.props.sendRemindSuccess}
              onExited={() => this.setState({showSendRemindDialog: false})}/>
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showSendRemindDialog: true})}>
            <img className="btn-icon" src={require('./icon/send.svg')}/>
            发提醒
          </Button>
          <div className="pull-right">
            <Button onClick={() => this.setState({showSendRemindDialog: true})}>
              <img className="btn-icon" src={require('./icon/my.svg')}/>
              我发出的
            </Button>
            <Button onClick={() => this.setState({showSendRemindDialog: true})}>
              <img className="btn-icon" src={require('./icon/complete.svg')}/>
              已完成
            </Button>
          </div>
        </div>
        <div className="todo-remind-list">
          {
            list.map((item, index) => {
              return (
                <Row key={item.id} className="todo-remind-item">
                  <Part className="m10">
                    <div>
                      {item['email']}
                      <span className="send-text">发来：</span>
                    </div>
                    <div className="content">
                      {item['content']}
                    </div>
                    <div>
                      <span className="relevant-item">关联项：</span>
                      <span className="relevant-type">
                        项目
                      </span>
                      <span className="relevant-type-name">{item['name']}</span>
                    </div>
                  </Part>
                  <div className="todo-remind-status">
                    <Row className="h-100 h-middle v-middle">
                      已完成
                    </Row>
                  </div>
                </Row>
              )
            })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todoRemindList: state.todoRemindList
  }
}

export default connect(mapStateToProps, actions)(TodoRemind)
