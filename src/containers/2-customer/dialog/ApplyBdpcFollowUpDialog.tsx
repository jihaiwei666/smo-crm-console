/**
 * Created by jiangyukun on 2017/7/12.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import Form from 'app-core/form/Form'

import CheckGroup from '../../../components/form/checkgroup/CheckGroup'
import {CUSTOMER} from '../../../core/constants/types'
import CommonFunction from '../../common/interface/CommonFunction'
import addCommonFunction from '../../_frameset/addCommonFunction'

interface ApplyBdpcFollowUpDialogProps extends CommonFunction {
  customerId: string
  fetchBDPC: () => void
  BDPCList: any
  applyBdpcFollowUp: (options) => void
  applyBdpcFollowUpSuccess: boolean
  onExited: () => void
}

class ApplyBdpcFollowUpDialog extends React.Component<ApplyBdpcFollowUpDialogProps> {
  state = {
    show: true,
    showSendConfirm: false,

    valid: true,
    bdpc: '',
    remindTypeList: [],
    email: false
  }

  close = () => {
    this.setState({show: false})
  }

  applyBdpcFollowUp = () => {
    this.props.applyBdpcFollowUp({
      "recipient": this.state.bdpc,
      "content": '申请BDPC支持此项目',
      "reminder_type": this.state.remindTypeList,
      "relation_id": this.props.customerId,
      "relation_type": 1,
    })
  }

  componentWillReceiveProps(nextProps: ApplyBdpcFollowUpDialogProps) {
    if (!this.props.applyBdpcFollowUpSuccess && nextProps.applyBdpcFollowUpSuccess) {
      this.props.showSuccess('已申请BDPC跟进！')
      this.props.clearState(CUSTOMER.APPLY_BDPC_FOLLOW_UP)
      this.close()
    }
  }

  render() {
    let BDPCList = []

    if (this.props.BDPCList.loaded) {
      BDPCList = this.props.BDPCList.data
    }
    return (
      <Modal style={{marginTop: '150px', width: '480px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showSendConfirm && (
            <Confirm message="确定发出吗？"
                     onExited={() => this.setState({showSendConfirm: false})}
                     onConfirm={this.applyBdpcFollowUp}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>申请BDPC跟进</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onValidChange={valid => this.setState({valid})}>
            <FlexDiv>
              <Part>
                接收人：
              </Part>
              <Part weight={2}>
                <Select1 options={BDPCList}
                         required={true} name="bdpc"
                         value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
                         lazyLoad={true} onFirstOpen={this.props.fetchBDPC} loadSuccess={this.props.BDPCList.loaded}
                />
              </Part>
            </FlexDiv>

            <Line/>

            <FlexDiv>
              <Part>
                提醒方式：
              </Part>
              <Part weight={2}>
                <CheckGroup
                  required={true} name="remindType"
                  options={[{value: '1', text: '系统消息'}, {value: '2', text: '邮件'}]}
                  value={this.state.remindTypeList} onChange={v => this.setState({remindTypeList: v})}
                >
                </CheckGroup>
              </Part>
            </FlexDiv>
            <div className="mt10 tip">请选择支持的BDPC发出提醒</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose
            disabled={!this.state.valid}
            okBtnName="发 出"
            onCancel={this.close}
            onConfirm={() => this.setState({showSendConfirm: true})}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

export default addCommonFunction(ApplyBdpcFollowUpDialog)
