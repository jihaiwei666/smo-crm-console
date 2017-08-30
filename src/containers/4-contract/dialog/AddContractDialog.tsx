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

import {updateCollection} from '../contract.action'
import ContractRemarkAttachment from './other/ContractRemarkAttachment'
import CommonFunction from '../../common/interface/CommonFunction'
import addCommonFunction from '../../_frameset/addCommonFunction'

interface AddContractDialogProps extends CommonFunction {
  addContractSuccess: boolean
  newContractId: string
  updateCollection: (options) => void
  onExited: () => void
}

class AddContractDialog extends React.Component<AddContractDialogProps> {
  state = {
    show: true,
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
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>添加合同</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RightNav navItems={['合同信息', '签署前', '签署后', '收款', '关联信息', '备注及附件', '操作记录']}>
            <ContractBdBdpc
              contractId={this.state.contractId}
            />

            <CategoryTitle title="合同信息"/>
            <ContractBasicInfo contractId={this.state.contractId} onProjectIdChange={projectId => this.setState({projectId})}/>

            <CategoryTitle title="签署前"/>
            <BeforeSign contractId={this.state.contractId}/>

            <CategoryTitle title="签署后"/>
            <AfterSign contractId={this.state.contractId} projectId={this.state.projectId}/>

            <CategoryTitle title="收款"/>
            <CollectionList
              contractId={this.state.contractId}
              collectionList={[]}
              updateCollection={this.props.updateCollection}
            />

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

function mapStateToProps(state, props) {
  return {
    newContractId: state.contract.newContractId,
    addContractSuccess: state.contract.addContractSuccess
  }
}

export default connect(mapStateToProps, {
  updateCollection
})(addCommonFunction(AddContractDialog))
