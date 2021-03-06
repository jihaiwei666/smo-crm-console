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
import Form from 'app-core/form/Form'

import Button from '../../../components/button/Button'
import RelevantItemDialog from './RelevantItemDialog'
import CheckGroup from '../../../components/form/checkgroup/CheckGroup'
import Attachment from '../../../components/attachment/Attachment'
import LimitTextArea from '../../../components/form/LimitTextArea'

import Data from '../../common/interface/Data'
import addCommonFunction from '../../_frameset/addCommonFunction'
import CommonFunction from '../../common/interface/CommonFunction'
import {remindTypeOptions} from '../todo-remind.constant'
import {fetchUserCategoryInfo, fetchRelevantItemList, sendRemind} from '../todo-remind.action'
import UserStatusCategoryItem from '../custom/UserStatusCategoryItem'

interface SendRemindDialogProps extends CommonFunction {
  relevantId?: string
  relevantType?: string
  relevantText?: string
  fetchUserCategoryInfo: () => void
  fetchRelevantItemList: (category: string, searchKey: string) => void
  relevantItemList: Data<any>
  userCategory: Data<any[]>
  sendRemind: (options) => void
  sendRemindSuccess: boolean
  onExited: () => void
}

class SendRemindDialog extends React.Component<SendRemindDialogProps> {
  _attachment: any
  state = {
    show: true,
    valid: true,
    showAddConfirm: false,
    showRelevantItemDialog: false,

    receiver: '',
    content: '',
    remindType: ['1'],
    relevantItem: '',
    attachment: []
  }
  text = ''
  relevantType = ''

  close = () => {
    this.setState({show: false})
  }

  sendRemind = () => {
    this.props.sendRemind({
      "recipient": this.state.receiver,
      "content": this.state.content,
      "reminder_type": this.state.remindType,
      "relation_id": this.state.relevantItem,
      "relation_type": this.relevantType,
      "reminder_from": 1,
      "fileList": this._attachment.getData()
    })
  }

  handleRelevantItemChange = (value, text, relevantType) => {
    this.setState({relevantItem: value})
    this.relevantType = relevantType
    this.text = text
  }

  componentWillMount() {
    if (this.props.relevantId) {
      this.setState({relevantItem: this.props.relevantId})
    }
    if (this.props.relevantType) {
      this.relevantType = this.props.relevantType
    }
    if (this.props.relevantText) {
      this.text = this.props.relevantText
    }
  }

  componentDidMount() {
    this.props.fetchUserCategoryInfo()
  }

  componentWillReceiveProps(nextProps: SendRemindDialogProps) {
    if (!this.props.sendRemindSuccess && nextProps.sendRemindSuccess) {
      this.props.showSuccess('发送提醒成功！')
      this.close()
    }
  }

  renderOption = value => (option, index1, index2) => {
    return (
      <UserStatusCategoryItem
        currentValue={value}
        option={option}
        index1={index1}
        index2={index2}
      />
    )
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
          <Form onValidChange={valid => this.setState({valid})}>
            <FlexDiv>
              <Part>接收人：</Part>
              <Part weight={2}>
                <CategorySelect
                  required={true} name="receiver"
                  categoryOptions={this.props.userCategory.data || []}
                  value={this.state.receiver} onChange={value => this.setState({receiver: value})}
                  renderOption={this.renderOption}
                />
              </Part>
            </FlexDiv>

            <Line/>

            <FlexDiv>
              <Part>待办内容：</Part>
              <Part weight={2}>
                <LimitTextArea
                  required={true} name="content"
                  placeholder="请输入待办内容"
                  rows={5}
                  limit={500}
                  tip="待办内容不能超过500字！"
                  value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
              </Part>
            </FlexDiv>
            <Line/>
            <FlexDiv>
              <Part>提醒方式：</Part>
              <Part weight={2}>
                <CheckGroup options={remindTypeOptions} value={this.state.remindType} onChange={v => this.setState({remindType: v})}>
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
              <div className="mb5">附件：</div>
              <Attachment ref={c => this._attachment = c}
                          fileList={this.state.attachment} onChange={v => this.setState({attachment: v})}/>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose
            onCancel={this.close}
            disabled={!this.state.valid}
            onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    sendRemindSuccess: state.todoRemind.sendRemindSuccess,
    userCategory: state.userCategory,
    relevantItemList: state.relevantItemList
  }
}

export default connect(mapStateToProps, {
  fetchUserCategoryInfo, fetchRelevantItemList, sendRemind
})(addCommonFunction(SendRemindDialog))
