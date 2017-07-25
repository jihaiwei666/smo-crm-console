/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout/'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import cache from '../../cache/cache'
import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from './part/BD_BDPC'
import CustomerInfo from '././part/CustomerInfo'
import SubCompany from './sub-company/SubCompany'
import ContactInfo from './contact/ContactInfo'
import CDA from './cda/CDA'
import AddSupplier from './supplier/AddSupplier'
import RFI from './rfi/RFI'
import AssociateInfo from './part/AssociateInfo'
import RemarkAndAttachment from './part/RemarkAndAttachment'
import OperationRecord from './part/OperationRecord'

import {addCustomer, updateCustomer, updateBdAndBdpc} from '../client.action'
import {fetchBD, fetchBDPC} from '../../../actions/app.action'

interface AddClientDialogProps {
  newCustomerId: string
  addCustomer: (options) => void
  addCustomerSuccess: boolean
  updateCustomer: (options) => void
  updateCustomerSuccess: boolean

  fetchBD: () => void
  BDList: any

  fetchBDPC: () => void
  BDPCList: any

  updateBdAndBdpc: (options) => void
  updateBdAndBdpcSuccess: boolean

  onExited: () => void
}

class AddClientDialog extends React.Component<AddClientDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    customerId: null
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchBD()
    this.props.fetchBDPC()
  }

  componentWillReceiveProps(nextProps: AddClientDialogProps) {
    if (!this.props.addCustomerSuccess && nextProps.addCustomerSuccess) {
      this.setState({customerId: nextProps.newCustomerId})
    }
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}}
        contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>

        <Modal.Header closeButton={true}>
          <Modal.Title>添加客户</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="body-box">
            <Part className="form-container">
              <BD_BDPC
                customerId={this.state.customerId}
                fetchBD={this.props.fetchBD}
                BDList={this.props.BDList}
                fetchBDPC={this.props.fetchBDPC}
                BDPCList={this.props.BDPCList}
                updateBdAndBdpc={this.props.updateBdAndBdpc}
              />

              <CategoryTitle title="客户信息"/>
              <CustomerInfo
                customerId={this.state.customerId}
                addCustomer={this.props.addCustomer}
                updateCustomer={this.props.updateCustomer}
              />

              <CategoryTitle title="分/子公司或下属院区"/>
              <SubCompany customerId={this.state.customerId}/>

              <CategoryTitle title="联系人"/>
              <ContactInfo customerId={this.state.customerId}/>

              <CategoryTitle title="CDA"/>
              <CDA customerId={this.state.customerId}/>

              <CategoryTitle title="供应商"/>
              <AddSupplier customerId={this.state.customerId}/>

              <CategoryTitle title="RFI"/>
              <RFI customerId={this.state.customerId}/>

              <CategoryTitle title="关联信息"/>
              <AssociateInfo/>

              <CategoryTitle title="备注及附件"/>
              <RemarkAndAttachment/>

              <CategoryTitle title="操作记录"/>
              <OperationRecord operationRecordList={[]}/>
            </Part>
            <div className="client-nav">
              <ul className="client-category-group">
                <li className="active">
                  客户信息
                </li>
                <li>分/子公司或下属院区</li>
                <li>联系人</li>
                <li>CDA</li>
                <li>供应商</li>
                <li>RFI</li>
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
    ...state.client,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  updateBdAndBdpc,
  addCustomer, updateCustomer
})(cache(AddClientDialog))
