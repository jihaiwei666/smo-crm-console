/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from '../../3-project/dialog/base/BD_BDPC'
import ContractBasicInfo from './basic-info/ContractBasicInfo'
import BeforeSign from './basic-info/BeforeSign'
import AfterSign from './basic-info/AfterSign'

import {fetchBD, fetchBDPC} from '../../../actions/app.action'

interface UpdateContractDialogProps {
  contractId: string
  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  onExited: () => void
}

class UpdateContractDialog extends React.Component<UpdateContractDialogProps> {
  state = {
    show: true,
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

  componentWillReceiveProps(nextProps: UpdateContractDialogProps) {
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
          <Modal.Title>添加合同</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="body-box">
            <Part className="form-container">
              <BD_BDPC
                disabled={this.props.contractId == ''}
                fetchBD={this.props.fetchBD}
                BDList={this.props.BDList}
                fetchBDPC={this.props.fetchBDPC}
                BDPCList={this.props.BDPCList}
                updateBdAndBdpc={this.updateBdAndBdpc}
              />

              <CategoryTitle title="合同信息"/>
              <ContractBasicInfo/>

              <CategoryTitle title="签署前"/>
              <BeforeSign/>

              <CategoryTitle title="签署后"/>
              <AfterSign/>

              <CategoryTitle title="收款"/>
              <CategoryTitle title="关联信息"/>
              <CategoryTitle title="备注及附件"/>
              <CategoryTitle title="操作记录"/>
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
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    contractId: props.contractId,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
})(UpdateContractDialog)
