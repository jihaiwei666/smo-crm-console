/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import {Row, Part, Line} from 'app-core/layout'

import BD_BDPC from './base/BD_BDPC'
import CategoryTitle from '../../common/CategoryTitle'
import ProjectBasicInfo from './basic-info/ProjectBasicInfo'
import BeforeQuotation from './before-quotation/BeforeQuotation'
import AfterQuotation from './after-quotation/AfterQuotation'

import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import {updateBdAndBdpc} from '../project.action'
import OperationRecord from '../../common/OperationRecord'
import RemarkAndAttachment from '../../common/RemarkAndAttachment'
import ProjectAssociateInfo from './base/ProjectAssociateInfo'

interface AddProjectDialogProps {

  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  onExited: () => void
}

class AddProjectDialog extends React.Component<AddProjectDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    projectId: '',
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
    /*if (!this.props.Success && nextProps.Success) {
      this.close()
    }*/
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>添加项目</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="body-box">
            <Part className="form-container">
              <BD_BDPC
                disabled={this.state.projectId == ''}
                fetchBD={this.props.fetchBD}
                BDList={this.props.BDList}
                fetchBDPC={this.props.fetchBDPC}
                BDPCList={this.props.BDPCList}
                updateBdAndBdpc={this.updateBdAndBdpc}
              />

              <CategoryTitle title="项目信息"/>
              <ProjectBasicInfo/>

              <CategoryTitle title="报价前"/>
              <BeforeQuotation/>

              <CategoryTitle title="报价后"/>
              <AfterQuotation/>

              <CategoryTitle title="关联信息"/>
              <ProjectAssociateInfo relationInfo={{}}/>

              <CategoryTitle title="备注及附件"/>
              <RemarkAndAttachment disabled={!this.state.projectId}/>

              <CategoryTitle title="操作记录"/>
              <OperationRecord operationRecordList={[]}/>

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
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  updateBdAndBdpc,
})(AddProjectDialog)
