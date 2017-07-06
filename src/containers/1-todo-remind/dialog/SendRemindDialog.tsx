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

interface SendRemindDialogProps {
  sendRemind: () => void
  sendRemindSuccess: boolean
  onExited: () => void
}

class SendRemindDialog extends React.Component<SendRemindDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    receiver: '',
    content: '',
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
            <Part>
              <LimitInput
                limit={20}
                onExceed={() => null}
                value={this.state.receiver} onChange={e => this.setState({receiver: e.target.value})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>待办内容：</Part>
            <Part>
              <LimitInput
                limit={500}
                onExceed={() => null}
                value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>提醒方式：</Part>
            <Part>
              <LimitInput
                limit={500}
                onExceed={() => null}
                value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
            </Part>
          </FlexDiv>
          <Line/>
          <FlexDiv>
            <Part>关联项：</Part>
            <Part>
              <LimitInput
                limit={500}
                onExceed={() => null}
                value={this.state.content} onChange={e => this.setState({content: e.target.value})}/>
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
