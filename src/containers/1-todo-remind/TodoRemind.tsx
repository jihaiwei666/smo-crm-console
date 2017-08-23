/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Row, Part} from 'app-core/layout/'
import Confirm from 'app-core/common/Confirm'

import Button from '../../components/button/Button'
import CheckBox from '../../components/form/checkbox/CheckBox'
import SendRemindDialog from './dialog/SendRemindDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import List from '../common/interface/List'
import {TODO_REMIND} from '../../core/constants/types'
import {fetchAllList, fetchMyList, fetchCompleteList, updateRemindStatus} from './todo-remind.action'
import {handlePageListData} from '../../reducers/page-list.reducer'
import {getRelevantTypeText} from './todo-remind.helper'
import RemindStatus from './part/RemindStatus'

interface TodoRemindProps extends AppFunctionPage {
  fetchAllList: (start) => void
  fetchMyList: (start) => void
  fetchCompleteList: (start) => void
  todoRemindAllList: List<any>
  todoRemindMyList: List<any>
  todoRemindCompleteList: List<any>
  sendRemind: () => void
  sendRemindSuccess: boolean
  updateRemindStatus: (remindId, status) => void
  updateRemindStatusSuccess: boolean
}

class TodoRemind extends React.Component<TodoRemindProps> {
  state = {
    listType: 'all',
    index: -1,
    start1: 0,
    start2: 0,
    start3: 0,
    showSendRemindDialog: false,
    updateStatusId: '',
    status: ''
  }

  loadMoreList = () => {
    if (this.state.listType == 'all') {
      this.props.fetchAllList(this.state.start1)
    }
    if (this.state.listType == 'my') {
      this.props.fetchMyList(this.state.start2)
    }
    if (this.state.listType == 'complete') {
      this.props.fetchCompleteList(this.state.start3)
    }
  }

  reloadList = () => {
    this.setState({start1: 0, start2: 0, start3: 0}, this.loadMoreList)
  }

  updateRemindStatus = () => {
    this.props.updateRemindStatus(this.state.updateStatusId, this.state.status == 'reject' ? 2 : 1)
  }

  getStatusMessage = () => {
    if (this.state.status == 'complete') {
      return '确定更新为已完成吗？'
    }
    if (this.state.status == 'accept') {
      return '确定接受此申请吗？'
    }
    if (this.state.status == 'reject') {
      return '确定拒绝此申请吗？'
    }
  }

  componentDidMount() {
    this.loadMoreList()
  }

  componentWillReceiveProps(nextProps: TodoRemindProps) {
    if (!this.props.updateRemindStatusSuccess && nextProps.updateRemindStatusSuccess) {
      this.props.showSuccess('修改状态成功！')
      this.props.clearState(TODO_REMIND.UPDATE_REMIND_STATUS)
      this.reloadList()
    }
  }

  render() {
    let todoRemindList
    if (this.state.listType == 'all') {
      todoRemindList = this.props.todoRemindAllList
    } else if (this.state.listType == 'my') {
      todoRemindList = this.props.todoRemindMyList
    } else {
      todoRemindList = this.props.todoRemindCompleteList
    }
    const {total, list, loading, loaded} = handlePageListData(todoRemindList)

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
        {
          this.state.updateStatusId && (
            <Confirm
              message={this.getStatusMessage()}
              onExited={() => this.setState({updateStatusId: ''})}
              onConfirm={this.updateRemindStatus}
            />
          )
        }
        <div className="m15">
          <Button onClick={() => this.setState({showSendRemindDialog: true}, this.loadMoreList)}>
            <img className="btn-icon" src={require('./icon/send.svg')}/>
            发提醒
          </Button>
          <div className="pull-right">
            <Button onClick={() => this.setState({listType: 'my'}, this.loadMoreList)}>
              <img className="btn-icon" src={require('./icon/my.svg')}/>
              我发出的
            </Button>
            <Button onClick={() => this.setState({listType: 'complete'}, this.loadMoreList)}>
              <img className="btn-icon" src={require('./icon/complete.svg')}/>
              已完成
            </Button>
          </div>
        </div>
        {
          this.state.listType != 'all' && (
            <div className="back-to-all" onClick={() => this.setState({listType: 'all'})}>
              <img className="btn-icon" src={require('./icon/back.svg')}/>
              返回列表
            </div>
          )
        }
        <div className="todo-remind-list">
          {
            list.map((item, index) => {
              return (
                <Row key={item.id} className="todo-remind-item">
                  <Part className="m10">
                    <div>
                      {item['email']}
                      <span className="send-text">发来：</span>
                      <div className="pull-right">
                        {item.sendTime}
                      </div>
                    </div>
                    <div className="content">
                      {item['content']}
                    </div>
                    <div>
                      <span className="relevant-item">关联项：</span>
                      <span className="relevant-type">
                        {getRelevantTypeText(item.relevantType)}
                      </span>
                      <span className="relevant-type-name">{item['name']}</span>
                    </div>
                  </Part>
                  <div className="todo-remind-status">
                    <Row className="h-100 h-middle v-middle">
                      <RemindStatus
                        remind={item}
                        updateStatus={(remindId, status) => this.setState({updateStatusId: remindId, status})}
                      />
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

function mapStateToProps(state, props) {
  return {
    updateRemindStatusSuccess: state.todoRemind.updateRemindStatusSuccess,
    todoRemindAllList: state.todoRemindAllList,
    todoRemindMyList: state.todoRemindMyList,
    todoRemindCompleteList: state.todoRemindCompleteList,
  }
}

export default connect(mapStateToProps, {
  fetchAllList, fetchMyList, fetchCompleteList, updateRemindStatus
})(TodoRemind)
