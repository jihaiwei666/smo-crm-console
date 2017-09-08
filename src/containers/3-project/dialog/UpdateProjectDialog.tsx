/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Spinner from 'app-core/common/Spinner'

import Button from '../../../components/button/Button'
import RightNav from '../../../components/nav/RightNav'
import ProjectBD_BDPC from './base/ProjectBD_BDPC'
import CategoryTitle from '../../common/CategoryTitle'
import ProjectBasicInfo from './basic-info/ProjectBasicInfo'
import BeforeQuotation from './before-quotation/BeforeQuotation'
import AfterQuotation from './after-quotation/AfterQuotation'
import OperationRecord from '../../common/OperationRecord'
import ProjectAssociateInfo from './base/ProjectAssociateInfo'
import ProjectRemarkAttachment from './base/ProjectRemarkAttachment'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'

import ProjectState from '../ProjectState'
import Data from '../../common/interface/Data'
import {fetchProjectDetail} from '../project.action'

interface UpdateProjectDialogProps extends ProjectState {
  projectId: string
  fetchProjectDetail: (projectId) => void
  projectDetail: Data<any>
  onExited: () => void
}

class UpdateProjectDialog extends React.Component<UpdateProjectDialogProps> {
  projectName = ''
  state = {
    show: true,
    showAddConfirm: false,
    showSendRemind: false,

    beforeQuotationId: '',
    afterQuotationId: '',
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchProjectDetail(this.props.projectId)
  }

  componentWillReceiveProps(nextProps: UpdateProjectDialogProps) {
    if (!this.props.projectDetail.loaded && nextProps.projectDetail.loaded) {
      let {data} = nextProps.projectDetail
      let {baseInfo, beforeQuotation, afterQuotation} = data
      this.projectName = baseInfo.projectName
      if (beforeQuotation) {
        this.setState({beforeQuotationId: beforeQuotation.beforeQuotationId})
      }
      if (afterQuotation) {
        this.setState({afterQuotationId: afterQuotation.afterQuotationId})
      }
    }
    if (!this.props.addBeforeQuotationSuccess && nextProps.addBeforeQuotationSuccess) {
      this.setState({beforeQuotationId: nextProps.newBeforeQuotation.beforeQuotationId})
    }
    if (!this.props.addAfterQuotationSuccess && nextProps.addAfterQuotationSuccess) {
      this.setState({afterQuotationId: nextProps.newAfterQuotation.afterQuotationId})
    }
  }

  render() {
    const {loaded, data} = this.props.projectDetail
    let baseInfo = null, initBdAndBdpc = null, relationInfo = null, operationRecordList = []
    let initBeforeQuotation = null, initAfterQuotation = null
    let initRemarkAttachment = null
    if (loaded) {
      baseInfo = data.baseInfo
      initBdAndBdpc = data.bdAndBdpc
      initBeforeQuotation = data.beforeQuotation
      initAfterQuotation = data.afterQuotation
      relationInfo = data.relationInfo
      initRemarkAttachment = data.remarkAttachment
      operationRecordList = data.operationRecordList
    }

    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog
              relevantId={this.props.projectId}
              relevantType={'2'}
              relevantText={this.projectName}
              onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            编辑项目
            <div className="pull-right">
              <Button className="small" disabled={!this.props.projectId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && (
              <RightNav>
                <ProjectBD_BDPC initBdAndBdpc={initBdAndBdpc} projectId={this.props.projectId}/>

                <CategoryTitle title="项目信息"/>
                <ProjectBasicInfo
                  projectId={this.props.projectId}
                  baseInfo={baseInfo}
                  onProjectNameChange={name => this.projectName = name}
                />

                <CategoryTitle title="报价前"/>
                <BeforeQuotation projectId={this.props.projectId}
                                 beforeQuotationId={this.state.beforeQuotationId}
                                 initBeforeQuotation={initBeforeQuotation}
                />

                <CategoryTitle title="报价后"/>
                <AfterQuotation
                  projectId={this.props.projectId}
                  afterQuotationId={this.state.afterQuotationId}
                  initAfterQuotation={initAfterQuotation}
                />

                <CategoryTitle title="关联信息"/>
                <ProjectAssociateInfo relationInfo={relationInfo}/>

                <CategoryTitle title="备注及附件"/>
                <ProjectRemarkAttachment
                  projectId={this.props.projectId}
                  initRemarkAttachment={initRemarkAttachment}
                />

                <CategoryTitle title="操作记录"/>
                <OperationRecord operationRecordList={operationRecordList}/>
              </RightNav>
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.project,
    projectDetail: state.projectDetail
  }
}

export default connect(mapStateToProps, {
  fetchProjectDetail
})(UpdateProjectDialog)
