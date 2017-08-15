/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout/'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from './part/BD_BDPC'
import CustomerBasicInfo from './part/CustomerBasicInfo'
import SubCompany from './sub-company/SubCompany'
import ContactInfo from './contact/ContactInfo'
import CDA from './cda/CDA'
import AddSupplier from './supplier/AddSupplier'
import EditSupplier from './supplier/EditSupplier'
import RFI from './rfi/RFI'
import AssociateInfo from './part/AssociateInfo'
import CustomerRemarkAttachment from './part/CustomerRemarkAttachment'
import OperationRecord from '../../common/OperationRecord'

import CustomerState from '../CustomerState'
import {addCustomer, updateCustomer} from '../customer.action'

interface AddCustomerDialogProps extends CustomerState {
  addCustomer: (options) => void
  updateCustomer: (options) => void
  onExited: () => void
}

class AddCustomerDialog extends React.Component<AddCustomerDialogProps> {
  supplierInfo: any
  rfiInfo: any
  state = {
    show: true,
    showAddConfirm: false,
    customerId: null,
    supplierId: '',
    rfiId: ''
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddCustomerDialogProps) {
    if (!this.props.addCustomerSuccess && nextProps.addCustomerSuccess) {
      this.setState({customerId: nextProps.newCustomerId})
    }
    if (!this.props.addSupplierSuccess && nextProps.addSupplierSuccess) {
      this.supplierInfo = nextProps.supplierInfo
      this.setState({supplierId: nextProps.supplierInfo.supplierId})
    }
    if (!this.props.addRfiSuccess && nextProps.addRfiSuccess) {
      this.rfiInfo = nextProps.rfiInfo
      this.setState({rfiId: nextProps.rfiInfo.rfiId})
    }
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >

        <Modal.Header closeButton={true}>
          <Modal.Title>添加客户</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="body-box">
            <Part className="form-container">
              <BD_BDPC
                customerId={this.state.customerId}
              />

              <CategoryTitle title="客户信息"/>
              <CustomerBasicInfo
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
              {
                !this.state.supplierId && (
                  <AddSupplier customerId={this.state.customerId}/>
                )
              }
              {
                this.state.supplierId && (
                  <EditSupplier
                    customerId={this.state.customerId}
                    supplierId={this.state.supplierId}
                    supplierInfo={this.supplierInfo}/>
                )
              }

              <CategoryTitle title="RFI"/>
              <RFI customerId={this.state.customerId} rfiId={this.state.rfiId} rfiInfo={this.rfiInfo}/>

              <CategoryTitle title="关联信息"/>
              <AssociateInfo/>

              <CategoryTitle title="备注及附件"/>
              <CustomerRemarkAttachment customerId={this.state.customerId}/>

              <CategoryTitle title="操作记录"/>
              <OperationRecord operationRecordList={[]}/>
            </Part>
            <div className="customer-nav">
              <ul className="nav-category-group">
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
    ...state.customer,
  }
}

export default connect(mapStateToProps, {
  addCustomer, updateCustomer
})(AddCustomerDialog)
