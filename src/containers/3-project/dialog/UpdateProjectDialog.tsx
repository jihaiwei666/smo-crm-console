/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import {Row, Part, Line} from 'app-core/layout'
import Spinner from 'app-core/common/Spinner'

import BD_BDPC from './base/BD_BDPC'
import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import CategoryTitle from '../../common/CategoryTitle'
import ProjectBasicInfo from './basic-info/ProjectBasicInfo'
import BeforeQuotation from './before-quotation/BeforeQuotation'
import AfterQuotation from './after-quotation/AfterQuotation'

import {fetchProjectDetail, updateBdAndBdpc} from '../project.action'
import OperationRecord from '../../common/OperationRecord'
import ProjectAssociateInfo from './base/ProjectAssociateInfo'
import RemarkAndAttachment from '../../common/RemarkAndAttachment'

interface UpdateProjectDialogProps {
  projectId: string
  fetchProjectDetail: (projectId) => void
  projectDetail: any
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
    /*if (!this.props.Success && nextProps.Success) {
      this.close()
    }*/
  }

  render() {
    const {loaded, data} = this.props.projectDetail
    let baseInfo = null, initBdAndBdpc = null, initBeforeQuotation = null, relationInfo = null, operationRecordList = []
    let beforeQuotationId = ''
    if (loaded) {
      baseInfo = data.baseInfo
      initBdAndBdpc = data.bdAndBdpc
      initBeforeQuotation = data.beforeQuotation
      relationInfo = data.relationInfo
      operationRecordList = data.operationRecordList
      if (initBeforeQuotation) {
        beforeQuotationId = initBeforeQuotation.beforeQuotationId
      }
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
              <Row className="body-box">
                <Part className="form-container">
                  <BD_BDPC
                    initBdAndBdpc={initBdAndBdpc}
                    disabled={this.props.projectId == ''}
                    fetchBD={this.props.fetchBD}
                    BDList={this.props.BDList}
                    fetchBDPC={this.props.fetchBDPC}
                    BDPCList={this.props.BDPCList}
                    updateBdAndBdpc={this.updateBdAndBdpc}
                  />

                  <CategoryTitle title="项目信息"/>
                  <ProjectBasicInfo projectId={this.props.projectId} baseInfo={baseInfo}/>

                  <CategoryTitle title="报价前"/>
                  <BeforeQuotation projectId={this.props.projectId}
                                   beforeQuotationId={beforeQuotationId}
                                   initBeforeQuotation={initBeforeQuotation}
                  />

                  <CategoryTitle title="报价后"/>
                  <AfterQuotation projectId={this.props.projectId}/>

                  <CategoryTitle title="关联信息"/>
                  <ProjectAssociateInfo relationInfo={relationInfo}/>

                  <CategoryTitle title="备注及附件"/>
                  <RemarkAndAttachment disabled={!this.props.projectId}/>

                  <CategoryTitle title="操作记录"/>
                  <OperationRecord operationRecordList={operationRecordList}/>

                </Part>
                <div className="project-nav">
                  <ul className="nav-category-group">
                    <li className="active">项目信息</li>
                    <li>报价前</li>
                    <li>报价后</li>
                    <li>关联信息</li>
                    <li>备注及附件</li>
                    <li>操作记录</li>
                  </ul>
                </div>
              </Row>
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    projectDetail: state.projectDetail
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  fetchProjectDetail, updateBdAndBdpc,
})(UpdateProjectDialog)
