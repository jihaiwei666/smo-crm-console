/**
 * Created by jiangyukun on 2017/7/12.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import CheckBox from '../../../components/form/checkbox/CheckBox'

interface ApplyBdpcFollowUpDialogProps {

  onExited: () => void
}

class ApplyBdpcFollowUpDialog extends React.Component<ApplyBdpcFollowUpDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    systemMessage: false,
    email: false
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: ApplyBdpcFollowUpDialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
     this.close()
     }*/
  }

  render() {
    return (
      <Modal style={{marginTop: '150px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>申请BDPC跟进</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>
              接收人：
            </Part>
            <Part>
              <Select1 options={[]} value="" onChange={() => null}/>
            </Part>
          </FlexDiv>

          <FlexDiv>
            <Part>
              提醒方式：
            </Part>
            <Part>
              <CheckBox checked={this.state.systemMessage} onChange={v => this.setState({systemMessage: v})}>系统消息</CheckBox>
              <CheckBox checked={this.state.email} onChange={v => this.setState({email: v})}>邮件</CheckBox>
            </Part>
          </FlexDiv>
          <div className="mt10 tip">请选择支持的BDPC发出提醒</div>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose okBtnName="发 出" onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ApplyBdpcFollowUpDialog
