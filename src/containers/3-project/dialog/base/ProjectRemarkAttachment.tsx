/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import {connect} from 'react-redux'

import RemarkAndAttachment from '../../../common/RemarkAndAttachment'

import Data from '../../../common/interface/Data'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {updateRemarkAndAttachment, fetchProjectRemarkAttachment} from '../../project.action'

interface ProjectRemarkAttachmentProps extends CommonFunction {
  projectId?: string
  initRemarkAttachment?: any
  updateRemarkAndAttachment: (options) => void
  updateRemarkAttachmentSuccess: boolean
  fetchProjectRemarkAttachment: (projectId) => void
  projectRemarkAttachment: Data<any>
}

class ProjectRemarkAttachment extends React.Component<ProjectRemarkAttachmentProps> {
  _attachment: any
  state = {
    remark: '',
    attachment: []
  }

  onUpdate = () => {
    this.props.updateRemarkAndAttachment({
      "business_id": this.props.projectId,
      "remark": this.state.remark,
      "files": this._attachment.getData()
    })
  }

  componentWillMount() {
    if (this.props.initRemarkAttachment) {
      this.setState(this.props.initRemarkAttachment)
    }
  }

  componentWillReceiveProps(nextProps: ProjectRemarkAttachmentProps) {
    if (!this.props.updateRemarkAttachmentSuccess && nextProps.updateRemarkAttachmentSuccess) {
      this.props.showSuccess('更新备注及附件成功！')
      this.props.fetchProjectRemarkAttachment(this.props.projectId)
    }
    if (!this.props.projectRemarkAttachment.loaded && nextProps.projectRemarkAttachment.loaded) {
      this.setState(nextProps.projectRemarkAttachment.data)
    }
  }

  render() {
    return (
      <RemarkAndAttachment
        attachmentRef={c => this._attachment = c}
        disabled={!this.props.projectId}
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
    updateRemarkAttachmentSuccess: state.project.updateRemarkAttachmentSuccess,
    projectRemarkAttachment: state.projectRemarkAttachment,
    projectId: props.projectId
  }
}

export default connect(mapStateToProps, {
  updateRemarkAndAttachment, fetchProjectRemarkAttachment
})(addCommonFunction(ProjectRemarkAttachment))
