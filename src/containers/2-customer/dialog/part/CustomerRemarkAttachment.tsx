/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import {connect} from 'react-redux'

import RemarkAndAttachment from '../../../common/RemarkAndAttachment'

import CommonFunction from '../../../common/interface/CommonFunction'
import {updateRemarkAndAttachment} from '../../customer.action'
import {CUSTOMER} from '../../../../core/constants/types'
import addCommonFunction from '../../../_frameset/addCommonFunction'

interface CustomerRemarkAttachmentProps extends CommonFunction {
  customerId?: string
  initRemarkAttachment?: any
  updateRemarkAndAttachment: (options) => void
  updateRemarkAttachmentSuccess: boolean
}

class CustomerRemarkAttachment extends React.Component<CustomerRemarkAttachmentProps> {
  _attachment: any
  state = {
    remark: '',
    attachment: []
  }

  onUpdate = () => {
    this.props.updateRemarkAndAttachment({
      "business_id": this.props.customerId,
      "remark": this.state.remark,
      "files": this._attachment.getData()
    })
  }

  componentWillMount() {
    if (this.props.initRemarkAttachment) {
      this.setState(this.props.initRemarkAttachment)
    }
  }

  componentWillReceiveProps(nextProps: CustomerRemarkAttachmentProps) {
    if (!this.props.updateRemarkAttachmentSuccess && nextProps.updateRemarkAttachmentSuccess) {
      this.props.showSuccess('更新备注及附件成功！')
      this.props.clearState(CUSTOMER.UPDATE_REMARK_AND_ATTACHMENT)
    }
  }

  render() {
    return (
      <RemarkAndAttachment
        attachmentRef={c => this._attachment = c}
        disabled={!this.props.customerId}
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
    updateRemarkAttachmentSuccess: state.customer.updateRemarkAttachmentSuccess,
    customerId: props.customerId
  }
}

export default connect(mapStateToProps, {
  updateRemarkAndAttachment
})(addCommonFunction(CustomerRemarkAttachment))
