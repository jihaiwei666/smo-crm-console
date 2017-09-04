/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import RightNav from '../../../components/nav/RightNav'
import BD_BDPC from './base/BD_BDPC'
import CategoryTitle from '../../common/CategoryTitle'
import ProjectBasicInfo from './basic-info/ProjectBasicInfo'
import BeforeQuotation from './before-quotation/BeforeQuotation'
import AfterQuotation from './after-quotation/AfterQuotation'
import OperationRecord from '../../common/OperationRecord'
import ProjectAssociateInfo from './base/ProjectAssociateInfo'
import ProjectState from '../ProjectState'
import ProjectRemarkAttachment from './base/ProjectRemarkAttachment'

import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import {updateBdAndBdpc} from '../project.action'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'
import Button from '../../../components/button/Button'

interface AddProjectDialogProps extends ProjectState {
  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  onExited: () => void
}

class AddProjectDialog extends React.Component<AddProjectDialogProps> {
  projectName = ''
  state = {
    show: true,
    showAddConfirm: false,
    showSendRemind: false,

    projectId: '',
    beforeQuotationId: '',
    afterQuotationId: '',
  }

  close = () => {
    this.setState({show: false})
  }

  updateBdAndBdpc = (bd, bdpc) => {
    this.props.updateBdAndBdpc({
      "project_info_id": this.state.projectId,
      "customer_owner": bd,
      "customer_the_bdpc": bdpc
    })
  }

  componentWillReceiveProps(nextProps: AddProjectDialogProps) {
    if (!this.props.addProjectInfoSuccess && nextProps.addProjectInfoSuccess) {
      this.setState({projectId: nextProps.newProjectId})
    }
    if (!this.props.addBeforeQuotationSuccess && nextProps.addBeforeQuotationSuccess) {
      this.setState({beforeQuotationId: nextProps.newBeforeQuotation.beforeQuotationId})
    }
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog
              relevantId={this.state.projectId}
              relevantType={'2'}
              relevantText={this.projectName}
              onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            添加项目
            <div className="pull-right">
              <Button className="small" disabled={!this.state.projectId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RightNav navItems={['项目信息', '报价前', '报价后', '关联信息', '备注及附件', '操作记录']}>
            <BD_BDPC
              disabled={this.state.projectId == ''}
              fetchBD={this.props.fetchBD}
              BDList={this.props.BDList}
              fetchBDPC={this.props.fetchBDPC}
              BDPCList={this.props.BDPCList}
              updateBdAndBdpc={this.updateBdAndBdpc}
              updateBd_BdpcSuccess={this.props.updateBd_BdpcSuccess}
            />

            <CategoryTitle title="项目信息"/>
            <ProjectBasicInfo
              projectId={this.state.projectId}
              onProjectNameChange={name => this.projectName = name}
            />

            <CategoryTitle title="报价前"/>
            <BeforeQuotation
              projectId={this.state.projectId}
              beforeQuotationId={this.state.beforeQuotationId}
            />

            <CategoryTitle title="报价后"/>
            <AfterQuotation
              projectId={this.state.projectId}
              afterQuotationId={this.state.afterQuotationId}
            />

            <CategoryTitle title="关联信息"/>
            <ProjectAssociateInfo relationInfo={{}}/>

            <CategoryTitle title="备注及附件"/>
            <ProjectRemarkAttachment
              projectId={this.state.projectId}
            />

            <CategoryTitle title="操作记录"/>
            <OperationRecord operationRecordList={[]}/>
          </RightNav>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.project,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  updateBdAndBdpc,
})(AddProjectDialog)
