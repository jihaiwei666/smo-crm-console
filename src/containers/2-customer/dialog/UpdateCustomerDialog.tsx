/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout/'
import Spinner from 'app-core/common/Spinner'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import cache from '../../cache/cache'
import CustomerState from '../CustomerState'
import CategoryTitle from '../../common/CategoryTitle'
import ClientBasicInfo from './part/ClientBasicInfo'
import BD_BDPC from './part/BD_BDPC'
import SubCompany from './sub-company/SubCompany'
import ContactInfo from './contact/ContactInfo'
import CDA from './cda/CDA'

import AddSupplier from './supplier/AddSupplier'
import EditSupplier from './supplier/EditSupplier'

import RFI from './rfi/RFI'
import AssociateInfo from './part/AssociateInfo'
import OperationRecord from '../../common/OperationRecord'

import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import * as actions from '../customer.action'
import CustomerRemarkAttachment from './part/CustomerRemarkAttachment'

interface UpdateClientDialogProps extends CustomerState {
  customerId: string
  fetchCustomerInfo: any
  customerInfo: any
  updateCustomer: (options) => void
  fetchBD: () => void
  BDList: any
  fetchBDPC: () => void
  BDPCList: any
  updateBdAndBdpc: (options) => void
  fetchContactList: (customerId: string) => void
  onExited: () => void
}

class UpdateClientDialog extends React.Component<UpdateClientDialogProps> {
  supplierInfo: any
  rfiInfo: any
  state = {
    show: true,
    showAddConfirm: false,
    supplierId: '',
    rfiId: '',
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchCustomerInfo(this.props.customerId)
    this.props.fetchContactList(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: UpdateClientDialogProps) {
    if (!this.props.customerInfo.loaded && nextProps.customerInfo.loaded) {
      const data = nextProps.customerInfo.data
      const {supplierInfo, rfiInfo} = data
      if (supplierInfo) {
        this.supplierInfo = supplierInfo
        this.setState({supplierId: supplierInfo.supplierId})
      }
      if (rfiInfo) {
        this.rfiInfo = rfiInfo
        this.setState({rfiId: rfiInfo.rfiId})
      }
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
    let {loaded, data} = this.props.customerInfo
    data = data || {}
    const customerBaseInfo = data.customerBaseInfo
    const bdAndBdpc = data.bdAndBdpc
    const subCompanyList = data.subCompanyList
    const contactInfo = data.contactInfo
    // const cdaList = data.cdaList
    // const supplierInfo = data.supplierInfo
    // const rfiInfo = data.rfiInfo
    const relationInfo = data.relationInfo
    const operationRecordList = data.operationRecordList
    const remarkAttachment = data.remarkAttachment

    return (
      <Modal
        style={{width: '60%'}}
        contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >

        <Modal.Header closeButton={true}>
          <Modal.Title>编辑客户</Modal.Title>
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
                    customerId={this.props.customerId}
                    bdAndBdpc={bdAndBdpc}
                    fetchBD={this.props.fetchBD}
                    BDList={this.props.BDList}
                    fetchBDPC={this.props.fetchBDPC}
                    BDPCList={this.props.BDPCList}
                    updateBdAndBdpc={this.props.updateBdAndBdpc}
                  />
                  <CategoryTitle title="客户信息"/>
                  <ClientBasicInfo
                    customerId={this.props.customerId}
                    customerBaseInfo={customerBaseInfo}
                    updateCustomer={this.props.updateCustomer}
                  />

                  <CategoryTitle title="分/子公司或下属院区"/>
                  <SubCompany
                    customerId={this.props.customerId}
                    subCompanyList={subCompanyList}
                  />
                  <CategoryTitle title="联系人"/>
                  <ContactInfo customerId={this.props.customerId} contactInfo={contactInfo}/>

                  <CategoryTitle title="CDA"/>
                  <CDA customerId={this.props.customerId}/>

                  <CategoryTitle title="供应商"/>
                  {
                    !this.state.supplierId && (
                      <AddSupplier customerId={this.props.customerId}/>
                    )
                  }
                  {
                    this.state.supplierId && (
                      <EditSupplier
                        customerId={this.props.customerId}
                        supplierId={this.state.supplierId}
                        supplierInfo={this.supplierInfo}/>
                    )
                  }

                  <CategoryTitle title="RFI"/>
                  <RFI customerId={this.props.customerId} rfiId={this.state.rfiId} rfiInfo={this.rfiInfo}/>

                  <CategoryTitle title="关联信息"/>
                  <AssociateInfo relationInfo={relationInfo}/>

                  <CategoryTitle title="备注及附件"/>
                  <CustomerRemarkAttachment
                    customerId={this.props.customerId}
                    initRemarkAttachment={remarkAttachment}
                  />

                  <CategoryTitle title="操作记录"/>
                  <OperationRecord operationRecordList={operationRecordList}/>
                </Part>
                <div className="client-nav">
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
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerInfo: state.customerInfo,
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    customerId: props.customerId,
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  ...actions
})(cache(UpdateClientDialog))
