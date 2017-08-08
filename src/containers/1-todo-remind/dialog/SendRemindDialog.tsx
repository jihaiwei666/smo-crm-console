/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import CategorySelect from 'app-core/category-select/CategorySelect'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {LimitInput, LimitTextArea} from 'app-core/form/'

import CheckBox from '../../../components/form/checkbox/CheckBox'
import Button from '../../../components/button/Button'
import RelevantItemDialog from './RelevantItemDialog'

import Data from '../../common/interface/Data'
import {fetchUserCategoryInfo, fetchRelevantItemList, sendRemind} from '../todo-remind.action'
import CheckGroup from '../../../components/form/checkgroup/CheckGroup'
import {remindType} from '../todo-remind.constant'

interface SendRemindDialogProps {
  fetchUserCategoryInfo: () => void
  fetchRelevantItemList: (category: string, searchKey: string) => void
  relevantItemList: Data<any>
  userCategory: Data<any[]>
  sendRemind: (options) => void
  sendRemindSuccess: boolean
  onExited: () => void
}

class SendRemindDialog extends React.Component<SendRemindDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    showRelevantItemDialog: false,

    receiver: '',
    content: '',
    remindType: [],
    relevantItem: ''
  }
  text = ''

  close = () => {
    this.setState({show: false})
  }

  sendRemind = () => {
    this.props.sendRemind({
      "recipient": this.state.receiver,
      "content": this.state.receiver,
      "reminder_type": 1,
      "relation_id": this.state.relevantItem,
    })
  }

  handleRelevantItemChange = (value, text) => {
    this.setState({relevantItem: value})
    this.text = text
  }

  componentDidMount() {
    this.props.fetchUserCategoryInfo()
  }

  componentWillReceiveProps(nextProps: SendRemindDialogProps) {
    if (!this.props.sendRemindSuccess && nextProps.sendRemindSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showRelevantItemDialog && (
            <RelevantItemDialog
              fetchRelevantItemList={this.props.fetchRelevantItemList}
              relevantItemList={this.props.relevantItemList}
              onSelect={this.handleRelevantItemChange}
              onExited={() => this.setState({showRelevantItemDialog: false})}/>
          )
        }
        {
          this.state.showAddConfirm && (
            <Confirm message="确定发出提醒吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.sendRemind}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>发出提醒</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>接收人：</Part>
            <Part weight={2}>
              <CategorySelect categoryOptions={this.props.userCategory.data || []} value={this.state.receiver} onChange={value => this.setState({receiver: value})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>待办内容：</Part>
            <Part weight={2}>
              <LimitTextArea
                rows={5}
                limit={500}
                onExceed={() => null}
                value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>提醒方式：</Part>
            <Part weight={2}>
              <CheckGroup options={remindType} value={this.state.remindType} onChange={v => this.setState({remindType: v})}>
              </CheckGroup>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>关联项：</Part>
            <Part weight={2}>

              {
                !this.state.relevantItem && (
                  <Button className="md" onClick={() => this.setState({showRelevantItemDialog: true})}>插入关联项</Button>
                )
              }
              {
                this.state.relevantItem && (
                  <div>
                    <span className="mr10">{this.text}</span>
                    <Button className="md" onClick={() => this.setState({showRelevantItemDialog: true})}>修改</Button>
                  </div>
                )
              }
            </Part>
          </FlexDiv>
          <Line/>
          <div>
            <span>附件：</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    userCategory: state.userCategory,
    relevantItemList: state.relevantItemList
  }
}

export default connect(mapStateToProps, {
  fetchUserCategoryInfo, fetchRelevantItemList, sendRemind
})(SendRemindDialog)
