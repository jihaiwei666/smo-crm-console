/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FlexDiv, Part} from 'app-core/layout/'

import './todo-remind.scss'
import Button from '../../components/button/Button'
import SendRemindDialog from './dialog/SendRemindDialog'

import * as actions from './todo-remind.action'
import {handleListData} from '../../reducers/data.reducer'

class TodoRemind extends React.Component<any> {
  state = {
    index: -1,
    currentPage: 0,
    showSendRemindDialog: false,

  }

  toPage = (newPage) => {
    if (newPage && newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage)
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.todoRemindList)

    return (
      <div className="todo-remind">
        {
          this.state.showSendRemindDialog && (
            <SendRemindDialog
              sendRemind={this.props.sendRemind}
              sendRemindSuccess={this.props.sendRemindSuccess}
              onExited={() => this.setState({showSendRemindDialog: false})}/>
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showSendRemindDialog: true})}>发提醒</Button>
        </div>
        <div className="todo-remind-list">
          {
            list.map((item, index) => {
              return (
                <FlexDiv key={item.id} className="todo-remind-item">
                  <Part className="m10">
                    <div>
                      {item['email']} 发来：
                    </div>
                    <div className="content">{item['content']}</div>
                    <div>
                      <span className="relevant-item">关联项：</span>
                    </div>
                  </Part>
                  <div>
                    已完成
                  </div>
                </FlexDiv>
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
