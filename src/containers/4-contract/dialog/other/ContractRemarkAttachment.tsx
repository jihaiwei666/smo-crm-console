/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import {connect} from 'react-redux'

import RemarkAndAttachment from '../../../common/RemarkAndAttachment'

import {updateRemarkAndAttachment} from '../../contract.action'
import {CONTRACT} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'

interface ContractRemarkAttachmentProps extends CommonFunction {
  contractId?: string
  initRemarkAttachment?: any
  updateRemarkAndAttachment: (options) => void
  updateRemarkAttachmentSuccess: boolean
}

class ContractRemarkAttachment extends React.Component<ContractRemarkAttachmentProps> {
  _attachment: any
  state = {
    remark: '',
    attachment: []
  }

  onUpdate = () => {
    this.props.updateRemarkAndAttachment({
      "business_id": this.props.contractId,
      "remark": this.state.remark,
      "files": this._attachment.getData()
    })
  }

  componentWillMount() {
    if (this.props.initRemarkAttachment) {
      this.setState(this.props.initRemarkAttachment)
    }
  }

  componentWillReceiveProps(nextProps: ContractRemarkAttachmentProps) {
    if (!this.props.updateRemarkAttachmentSuccess && nextProps.updateRemarkAttachmentSuccess) {
      this.props.showSuccess('更新备注及附件成功！')
      this.props.clearState(CONTRACT.UPDATE_REMARK_ATTACHMENT)
    }
  }

  render() {
    return (
      <RemarkAndAttachment
        attachmentRef={c => this._attachment = c}
        disabled={!this.props.contractId}
        remark={this.state.remark}
        onRemarkChange={(e: any) => this.setState({remark: e.target.value})}
        attachment={this.state.attachment}
        onAttachmentChange={v => this.setState({attachment: v})}
        onUpdate={this.onUpdate}
      />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    initRemarkAttachment: props.initRemarkAttachment,
    updateRemarkAttachmentSuccess: state.contract.updateRemarkAttachmentSuccess,
    contractId: props.contractId
  }
}

export default connect(mapStateToProps, {
  updateRemarkAndAttachment
})(addCommonFunction(ContractRemarkAttachment))
