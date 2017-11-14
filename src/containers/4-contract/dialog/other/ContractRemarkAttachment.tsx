/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import {connect} from 'react-redux'

import RemarkAndAttachment from '../../../common/RemarkAndAttachment'

import Data from '../../../common/interface/Data'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {updateRemarkAndAttachment, fetchContractRemarkAttachment} from '../../contract.action'

interface ContractRemarkAttachmentProps extends CommonFunction {
  contractId?: string
  initRemarkAttachment?: any
  updateRemarkAndAttachment: (options) => void
  updateRemarkAttachmentSuccess: boolean
  fetchContractRemarkAttachment: (contractId) => void
  contractRemarkAttachment: Data<any>
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
      this.props.fetchContractRemarkAttachment(this.props.contractId)
    }
    if (!this.props.contractRemarkAttachment.loaded && nextProps.contractRemarkAttachment.loaded) {
      this.setState(nextProps.contractRemarkAttachment.data)
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
    contractRemarkAttachment: state.contractRemarkAttachment,
    contractId: props.contractId
  }
}

export default connect(mapStateToProps, {
  updateRemarkAndAttachment, fetchContractRemarkAttachment
})(addCommonFunction(ContractRemarkAttachment))
