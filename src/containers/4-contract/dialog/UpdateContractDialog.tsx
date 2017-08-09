/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Spinner from 'app-core/common/Spinner'

import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from '../../3-project/dialog/base/BD_BDPC'
import UpdateContractBasicInfo from './basic-info/UpdateContractBasicInfo'
import BeforeSign from './before-sign/BeforeSign'
import AfterSign from './after-sign/AfterSign'
import MakeCollection from './make-collections/MakeCollection'

import Data from '../../common/interface/Data'
import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import {fetchContractDetail, updateBdAndBdpc, fetchCollectionList, updateCollection} from '../contract.action'
import ContractAssociateInfo from './other/ContractAssociateInfo'
import OperationRecord from '../../common/OperationRecord'
import RemarkAndAttachment from '../../common/RemarkAndAttachment'
import CollectionList from './make-collections/CollectionList'

interface UpdateContractDialogProps {
  contractId: string
  fetchContractDetail: (contractId) => void
  contractDetail: Data<any>
  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  addAfterSignSuccess: boolean
  updateAfterSignSuccess: boolean

  fetchCollectionList: (contractId) => void
  updateCollection: (options) => void

  onExited: () => void
}

class UpdateContractDialog extends React.Component<UpdateContractDialogProps> {
  state = {
    show: true,
    collectionList: []
  }

  close = () => {
    this.setState({show: false})
  }

  updateBdAndBdpc = (bd, bdpc) => {
    this.props.updateBdAndBdpc({
      "contract_info_id": this.props.contractId,
      "contract_the_bd": bd,
      "contract_the_bdpc": bdpc
    })
  }

  componentDidMount() {
    this.props.fetchContractDetail(this.props.contractId)
  }

  componentWillReceiveProps(nextProps: UpdateContractDialogProps) {
    if (!this.props.addAfterSignSuccess && nextProps.addAfterSignSuccess) {
      this.props.fetchCollectionList(this.props.contractId)
    }
    if (!this.props.updateAfterSignSuccess && nextProps.updateAfterSignSuccess) {
      this.props.fetchCollectionList(this.props.contractId)
    }
  }

  render() {
    let baseInfo = null, bdAnBdpc = null, beforeSign = null, afterSign = null, relationInfo = null, operationRecordList = []
    let collectionList = []
    let projectId = '', beforeSignId = '', afterSignId = ''

    const {loaded, data} = this.props.contractDetail
    if (loaded) {
      baseInfo = data.baseInfo
      projectId = baseInfo.projectId
      bdAnBdpc = data.bdAnBdpc
      beforeSign = data.beforeSign
      afterSign = data.afterSign
      relationInfo = data.relationInfo
      operationRecordList = data.operationRecordList
      collectionList = data.collectionList
      if (beforeSign) {
        beforeSignId = beforeSign.beforeSignId
      }
      if (afterSign) {
        afterSignId = afterSign.afterSignId
      }
    }

    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>查看合同</Modal.Title>
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
                    disabled={this.props.contractId == ''}
                    fetchBD={this.props.fetchBD}
                    BDList={this.props.BDList}
                    fetchBDPC={this.props.fetchBDPC}
                    BDPCList={this.props.BDPCList}
                    initBdAndBdpc={bdAnBdpc}
                    updateBdAndBdpc={this.updateBdAndBdpc}
                  />

                  <CategoryTitle title="合同信息"/>
                  <UpdateContractBasicInfo contractId={this.props.contractId} baseInfo={baseInfo}/>

                  <CategoryTitle title="签署前"/>
                  <BeforeSign
                    contractId={this.props.contractId}
                    beforeSignId={beforeSignId}
                    initBeforeSign={beforeSign}
                  />

                  <CategoryTitle title="签署后"/>
                  <AfterSign
                    contractId={this.props.contractId}
                    projectId={projectId}
                    afterSignId={afterSignId}
                    initAfterSign={afterSign}
                  />

                  <CategoryTitle title="收款"/>
                  <CollectionList
                    collectionList={collectionList}
                    updateCollection={this.props.updateCollection}/>

                  <CategoryTitle title="关联信息"/>
                  <ContractAssociateInfo relationInfo={relationInfo}/>

                  <CategoryTitle title="备注及附件"/>
                  <RemarkAndAttachment disabled={!this.props.contractId}/>

                  <CategoryTitle title="操作记录"/>
                  <OperationRecord operationRecordList={operationRecordList}/>
                </Part>
                <div className="contract-nav">
                  <ul className="nav-category-group">
                    <li className="active">合同信息</li>
                    <li>签署前</li>
                    <li>签署后</li>
                    <li>收款</li>
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

function mapStateToProps(state, props) {
  return {
    ...state.contract,
    contractId: props.contractId,
    contractDetail: state.contractDetail,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, updateBdAndBdpc,
  fetchContractDetail,
  fetchCollectionList, updateCollection
})(UpdateContractDialog)
