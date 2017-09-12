/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import RightNav from '../../../components/nav/RightNav'
import CategoryTitle from '../../common/CategoryTitle'
import ContractBdBdpc from './other/ContractBdBdpc'
import ContractBasicInfo from './basic-info/ContractBasicInfo'
import BeforeSign from './before-sign/BeforeSign'
import AfterSign from './after-sign/AfterSign'
import ContractAssociateInfo from './other/ContractAssociateInfo'
import CollectionList from './make-collections/CollectionList'
import ContractRemarkAttachment from './other/ContractRemarkAttachment'

import Data from '../../common/interface/Data'
import CommonFunctionAndRoleCode from '../../common/interface/CommonFunctionAndRoleCode'
import getCommonFunctionAndRoleCode from '../../_frameset/hoc/getCommonFunctionAndRoleCode'
import {updateCollection, fetchCollectionList} from '../contract.action'
import Button from '../../../components/button/Button'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'
import {checkHavePermission} from '../../../core/permission'
import {roleCategory} from '../../7-account-manage/account-manage.constant'

interface AddContractDialogProps extends CommonFunctionAndRoleCode {
  addContractSuccess: boolean
  newContractId: string
  updateCollection: (options) => void
  fetchCollectionList: (contractId) => void
  collectionList: Data<any>
  addAfterSignSuccess: boolean
  updateAfterSignSuccess: boolean
  onExited: () => void
}

class AddContractDialog extends React.Component<AddContractDialogProps> {
  contractName = ''
  collectionList = []
  state = {
    show: true,
    showSendRemind: false,
    contractId: '',
    projectId: ''
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddContractDialogProps) {
    if (!this.props.addContractSuccess && nextProps.addContractSuccess) {
      this.setState({contractId: nextProps.newContractId})
    }
    if (!this.props.addAfterSignSuccess && nextProps.addAfterSignSuccess) {
      this.props.fetchCollectionList(this.state.contractId)
    }
    if (!this.props.updateAfterSignSuccess && nextProps.updateAfterSignSuccess) {
      this.props.fetchCollectionList(this.state.contractId)
    }
    if (!this.props.collectionList.loaded && nextProps.collectionList.loaded) {
      this.collectionList = nextProps.collectionList.data
    }
  }

  render() {
    let roleCode = this.props.roleCode
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog
              relevantId={this.state.projectId}
              relevantType={'3'}
              relevantText={this.contractName}
              onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            添加合同
            <div className="pull-right">
              <Button className="small" disabled={!this.state.contractId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RightNav>
            <ContractBdBdpc
              contractId={this.state.contractId}
            />

            <CategoryTitle title="合同信息"/>
            <ContractBasicInfo
              contractId={this.state.contractId}
              onProjectIdChange={projectId => this.setState({projectId})}
              onContractNameChange={name => this.contractName = name}
            />

            <CategoryTitle title="签署前"/>
            <BeforeSign contractId={this.state.contractId}/>

            <CategoryTitle title="签署后"/>
            <AfterSign contractId={this.state.contractId} projectId={this.state.projectId}/>

            {
              checkHavePermission(roleCode, roleCode != roleCategory.bd && roleCode != roleCategory.bdLeader) && (
                <CategoryTitle title="收款"/>
              )
            }
            {
              checkHavePermission(roleCode, roleCode != roleCategory.bd && roleCode != roleCategory.bdLeader) && (
                <CollectionList
                  contractId={this.state.contractId}
                  collectionList={this.collectionList}
                  updateCollection={this.props.updateCollection}
                />
              )
            }

            <CategoryTitle title="关联信息"/>
            <ContractAssociateInfo relationInfo={{}}/>

            <CategoryTitle title="备注及附件"/>
            <ContractRemarkAttachment contractId={this.state.contractId}/>

            <CategoryTitle title="操作记录"/>
          </RightNav>
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    newContractId: state.contract.newContractId,
    addContractSuccess: state.contract.addContractSuccess,
    addAfterSignSuccess: state.contract.addAfterSignSuccess,
    updateAfterSignSuccess: state.contract.updateAfterSignSuccess,
    collectionList: state.collectionList
  }
}

export default connect(mapStateToProps, {
  updateCollection, fetchCollectionList
})(getCommonFunctionAndRoleCode(AddContractDialog))
