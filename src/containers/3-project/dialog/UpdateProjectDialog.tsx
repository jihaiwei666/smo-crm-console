/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Spinner from 'app-core/common/Spinner'

import RightNav from '../../../components/nav/RightNav'
import BD_BDPC from './base/BD_BDPC'
import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import CategoryTitle from '../../common/CategoryTitle'
import ProjectBasicInfo from './basic-info/ProjectBasicInfo'
import BeforeQuotation from './before-quotation/BeforeQuotation'
import AfterQuotation from './after-quotation/AfterQuotation'

import {fetchProjectDetail, updateBdAndBdpc} from '../project.action'
import OperationRecord from '../../common/OperationRecord'
import ProjectAssociateInfo from './base/ProjectAssociateInfo'
import ProjectRemarkAttachment from './base/ProjectRemarkAttachment'
import ProjectState from '../ProjectState'
import Data from '../../common/interface/Data'

interface UpdateProjectDialogProps extends ProjectState {
  projectId: string
  fetchProjectDetail: (projectId) => void
  projectDetail: Data<any>
  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  onExited: () => void
}

class UpdateProjectDialog extends React.Component<UpdateProjectDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    beforeQuotationId: '',
    afterQuotationId: '',
  }

  close = () => {
    this.setState({show: false})
  }

  updateBdAndBdpc = (bd, bdpc) => {
    this.props.updateBdAndBdpc({
      "project_info_id": this.props.projectId,
      "project_the_bd": bd,
      "project_the_bdpc": bdpc
    })
  }

  componentDidMount() {
    this.props.fetchProjectDetail(this.props.projectId)
  }

  componentWillReceiveProps(nextProps: UpdateProjectDialogProps) {
    if (!this.props.projectDetail.loaded && nextProps.projectDetail.loaded) {
      let {data} = nextProps.projectDetail
      let {beforeQuotation, afterQuotation} = data
      this.setState({beforeQuotationId: beforeQuotation.beforeQuotationId})
      this.setState({afterQuotationId: afterQuotation.afterQuotationId})
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
        <Modal.Header closeButton={true}>
          <Modal.Title>编辑项目</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && (
              <RightNav navItems={['项目信息', '报价前', '报价后', '关联信息', '备注及附件', '操作记录']}>
                <BD_BDPC
                  initBdAndBdpc={initBdAndBdpc}
                  disabled={this.props.projectId == ''}
                  fetchBD={this.props.fetchBD}
                  BDList={this.props.BDList}
                  fetchBDPC={this.props.fetchBDPC}
                  BDPCList={this.props.BDPCList}
                  updateBdAndBdpc={this.updateBdAndBdpc}
                  updateBd_BdpcSuccess={this.props.updateBd_BdpcSuccess}
                />

                <CategoryTitle title="项目信息"/>
                <ProjectBasicInfo projectId={this.props.projectId} baseInfo={baseInfo}/>

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
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    projectDetail: state.projectDetail
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  fetchProjectDetail, updateBdAndBdpc,
})(UpdateProjectDialog)
