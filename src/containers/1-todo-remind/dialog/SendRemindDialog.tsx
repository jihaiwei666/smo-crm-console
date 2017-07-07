/**
 * Created by jiangyukun on 2017/7/6.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {LimitInput, LimitTextArea} from 'app-core/form/'

import CheckBox from '../../../components/form/CheckBox'
import Button from '../../../components/button/Button'
import RelevantItemDialog from './RelevantItemDialog'

interface SendRemindDialogProps {
  sendRemind: () => void
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
    isSystemMessageRemind: false,
    isEmailRemind: false,
  }

  close = () => {
    this.setState({show: false})
  }

  sendRemind = () => {

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
              <Select1 options={[]} value={this.state.receiver} onChange={value => this.setState({receiver: value})}/>
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
              <CheckBox checked={this.state.isSystemMessageRemind} onChange={checked => this.setState({isSystemMessageRemind: checked})}>
                系统消息
              </CheckBox>
              <CheckBox checked={this.state.isEmailRemind} onChange={checked => this.setState({isEmailRemind: checked})}>
                邮件
              </CheckBox>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>关联项：</Part>
            <Part weight={2}>
              <Button className="md" onClick={() => this.setState({showRelevantItemDialog: true})}>插入关联项</Button>
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

export default SendRemindDialog
