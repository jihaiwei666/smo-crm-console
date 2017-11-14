/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import Button from '../../components/button/Button'
import Remind from './part/Remind'
import SendRemindDialog from './dialog/SendRemindDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import List from '../common/interface/List'
import {fetchAllList, fetchMyList, fetchCompleteList, updateRemindStatus} from './todo-remind.action'
import {handlePageListData} from '../../reducers/page-list.reducer'

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
  unreadRemindAmount: number
}

class TodoRemind extends React.Component<TodoRemindProps> {
  start1 = 0
  start2 = 0
  start3 = 0
  state = {
    listType: 'all',
    index: -1,

    showSendRemindDialog: false,
    updateStatusId: '',
    status: '',

  }

  loadMoreUnCompleteRemind = () => {
    this.start1++
    this.props.fetchAllList(this.start1)
  }

  loadMoreMyRemind = () => {
    this.start2++
    this.props.fetchMyList(this.start2)
  }

  loadMoreCompleteRemind = () => {
    this.start3++
    this.props.fetchCompleteList(this.start3)
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

  refreshList = () => {
    this.start1 = 0
    this.start2 = 0
    this.start3 = 0
    this.props.fetchAllList(0)
    this.props.fetchMyList(0)
    this.props.fetchCompleteList(0)
  }

  componentDidMount() {
    this.refreshList()
  }

  componentWillReceiveProps(nextProps: TodoRemindProps) {
    if (!this.props.updateRemindStatusSuccess && nextProps.updateRemindStatusSuccess) {
      this.props.showSuccess('修改状态成功！')
      this.refreshList()
    }
    if (!this.props.sendRemindSuccess && nextProps.sendRemindSuccess) {
      this.refreshList()
    }
    if (this.props.unreadRemindAmount != nextProps.unreadRemindAmount) {
      if (nextProps.unreadRemindAmount != 0) {
        this.refreshList()
      }
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
          <Button onClick={() => this.setState({showSendRemindDialog: true})}>
            <img className="btn-icon" src={require('./icon/send.svg')}/>
            发提醒
          </Button>
          <div className="pull-right">
            <Button onClick={() => this.setState({listType: 'my'})}>
              <img className="btn-icon" src={require('./icon/my.svg')}/>
              我发出的
            </Button>
            <Button onClick={() => this.setState({listType: 'complete'})}>
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
        {
          this.state.listType == 'all' && (
            <Remind
              fromOrTo="to"
              remindList={list}
              loadMore={this.loadMoreUnCompleteRemind}
              updateStatus={(updateStatusId, status) => this.setState({updateStatusId, status})}
            />
          )
        }
        {
          this.state.listType == 'my' && (
            <Remind
              fromOrTo="from"
              remindList={list}
              loadMore={this.loadMoreMyRemind}
              updateStatus={(updateStatusId, status) => this.setState({updateStatusId, status})}
            />
          )
        }
        {
          this.state.listType == 'complete' && (
            <Remind
              fromOrTo="to"
              remindList={list}
              loadMore={this.loadMoreCompleteRemind}
              updateStatus={(updateStatusId, status) => this.setState({updateStatusId, status})}
            />
          )
        }
        {
          list.length == 0 && (
            <div className="no-list-data">暂无数据</div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    unreadRemindAmount: state.app.unreadRemindAmount,
    sendRemindSuccess: state.todoRemind.sendRemindSuccess,
    updateRemindStatusSuccess: state.todoRemind.updateRemindStatusSuccess,
    todoRemindAllList: state.todoRemindAllList,
    todoRemindMyList: state.todoRemindMyList,
    todoRemindCompleteList: state.todoRemindCompleteList,
  }
}

export default connect(mapStateToProps, {
  fetchAllList, fetchMyList, fetchCompleteList, updateRemindStatus
})(TodoRemind)
