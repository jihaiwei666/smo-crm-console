/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Spinner from 'app-core/common/Spinner'

import Button from '../../../components/button/Button'
import RightNav from '../../../components/nav/RightNav'
import CategoryTitle from '../../common/CategoryTitle'
import ContractBdBdpc from './other/ContractBdBdpc'
import ContractBasicInfo from './basic-info/ContractBasicInfo'
import BeforeSign from './before-sign/BeforeSign'
import AfterSign from './after-sign/AfterSign'
import ContractAssociateInfo from './other/ContractAssociateInfo'
import OperationRecord from '../../common/OperationRecord'
import CollectionList from './make-collections/CollectionList'
import ContractRemarkAttachment from './other/ContractRemarkAttachment'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'

import Data from '../../common/interface/Data'
import {fetchContractDetail, fetchCollectionList} from '../contract.action'

interface UpdateContractDialogProps {
  contractId: string
  fetchContractDetail: (contractId) => void
  contractDetail: Data<any>

  addContractSuccess: boolean
  updateContractSuccess: boolean
  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  addAfterSignSuccess: boolean
  updateAfterSignSuccess: boolean

  fetchCollectionList: (contractId) => void
  updateCollection: (options) => void

  onExited: () => void
}

class UpdateContractDialog extends React.Component<UpdateContractDialogProps> {
  contractName = ''
  state = {
    show: true,
    showSendRemind: false,
    projectId: ''
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchContractDetail(this.props.contractId)
  }

  componentWillReceiveProps(nextProps: UpdateContractDialogProps) {
    if (!this.props.contractDetail.loaded && nextProps.contractDetail.loaded) {
      const {data} = nextProps.contractDetail
      this.contractName = data.baseInfo.contractName
      this.setState({projectId: data.baseInfo.projectId})
    }
    if (!this.props.addAfterSignSuccess && nextProps.addAfterSignSuccess) {
      this.props.fetchCollectionList(this.props.contractId)
    }
    if (!this.props.updateAfterSignSuccess && nextProps.updateAfterSignSuccess) {
      this.props.fetchCollectionList(this.props.contractId)
    }
  }

  render() {
    let baseInfo = null, initBdAndBdpc = null, initBeforeSign = null, initAfterSign = null, relationInfo = null, operationRecordList = []
    let initCollectionList = []
    let initRemarkAttachment = null
    let authority: any = {}, lookAuthority: any = {}, editAuthority: any = {}

    const {loaded, data} = this.props.contractDetail
    if (loaded) {
      baseInfo = data.baseInfo
      initBdAndBdpc = data.bdAnBdpc
      initBeforeSign = data.beforeSign
      initAfterSign = data.afterSign
      initCollectionList = data.collectionList
      relationInfo = data.relationInfo
      operationRecordList = data.operationRecordList
      initRemarkAttachment = data.remarkAttachment
      authority = data.authority
      lookAuthority = authority.look
      editAuthority = authority.edit
    }

    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog
              relevantId={this.props.contractId}
              relevantType={'3'}
              relevantText={this.contractName}
              onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            编辑合同
            <div className="pull-right">
              <Button className="small" disabled={!this.props.contractId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
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
                <ContractBdBdpc
                  contractId={this.props.contractId}
                  initBdAndBdpc={initBdAndBdpc}
                />

                {
                  lookAuthority.basicInfo && (
                    <CategoryTitle title="合同信息" readonly={!editAuthority.basicInfo}/>
                  )
                }
                {
                  lookAuthority.basicInfo && (
                    <ContractBasicInfo
                      contractId={this.props.contractId}
                      initBaseInfo={baseInfo}
                      onProjectIdChange={projectId => this.setState({projectId})}
                      onContractNameChange={name => this.contractName = name}
                      editAuthority={editAuthority.basicInfo}
                    />
                  )
                }

                {
                  lookAuthority.beforeSign && (
                    <CategoryTitle title="签署前" readonly={!editAuthority.beforeSign}/>
                  )
                }
                {
                  lookAuthority.beforeSign && (
                    <BeforeSign
                      contractId={this.props.contractId}
                      initBeforeSign={initBeforeSign}
                      editAuthority={editAuthority.beforeSign}
                    />
                  )
                }

                {
                  lookAuthority.afterSign && (
                    <CategoryTitle title="签署后" readonly={!editAuthority.afterSign}/>
                  )
                }
                {
                  lookAuthority.afterSign && (
                    <AfterSign
                      contractId={this.props.contractId}
                      projectId={this.state.projectId}
                      initAfterSign={initAfterSign}
                      editAuthority={editAuthority.afterSign}
                    />
                  )
                }

                {
                  lookAuthority.makeCollection && (
                    <CategoryTitle title="收款" readonly={!editAuthority.makeCollection}/>
                  )
                }
                {
                  lookAuthority.makeCollection && (
                    <CollectionList
                      contractId={this.props.contractId}
                      initCollectionList={initCollectionList}
                      editAuthority={editAuthority.makeCollection}
                    />
                  )
                }

                <CategoryTitle title="关联信息"/>
                <ContractAssociateInfo relationInfo={relationInfo}/>

                <CategoryTitle title="备注及附件"/>
                <ContractRemarkAttachment contractId={this.props.contractId} initRemarkAttachment={initRemarkAttachment}/>

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

function mapStateToProps(state, props) {
  return {
    ...state.contract,
    contractId: props.contractId,
    contractDetail: state.contractDetail,
  }
}

export default connect(mapStateToProps, {
  fetchContractDetail,
  fetchCollectionList
})(UpdateContractDialog)
