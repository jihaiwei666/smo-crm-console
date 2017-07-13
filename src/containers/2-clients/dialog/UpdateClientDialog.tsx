/**
 * Created by jiangyukun on 2017/7/10.
 */
import CommonFunction from '../../common/interface/CommonFunction'

import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout/'
import Spinner from 'app-core/common/Spinner'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import addCommonFunction from '../../_frameset/addCommonFunction'
import cache from '../../cache/cache'
import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from './edit-part/BD_BDPC'
import Subcompany from './edit-part/Subcompany'
import Contact from './edit-part/Contact'
import CDA from './edit-part/CDA'
import Supplier from './edit-part/Supplier'
import RFI from './edit-part/RFI'
import AssociateInfo from './edit-part/AssociateInfo'
import RemarkAndAttachment from './edit-part/RemarkAndAttachment'
import OperationRecord from './edit-part/OperationRecord'

import {CLIENTS} from '../../../core/constants/types'
import {fetchBD, fetchBDPC} from '../../../actions/app.action'
import {addCustomer, updateCustomer, fetchCustomerInfo, updateBdAndBdpc} from '../clients.action'
import UpdateCustomerInfo from './edit-part/UpateCustomerInfo'

interface UpdateClientDialogProps extends CommonFunction {
  customerId: string
  fetchCustomerInfo: any
  customerInfo: any
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

class UpdateClientDialog extends React.Component<UpdateClientDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchCustomerInfo(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: UpdateClientDialogProps) {
    if (!this.props.customerInfo.loaded && nextProps.customerInfo.loaded) {

    }
    if (!this.props.updateCustomerSuccess && nextProps.updateCustomerSuccess) {
      this.props.showSuccess('更新客户信息成功！')
      this.props.clearState(CLIENTS.UPDATE_CUSTOMER)
    }
    if (!this.props.updateBdAndBdpcSuccess && nextProps.updateBdAndBdpcSuccess) {
      this.props.showSuccess('更新 所有人、所属BDPC 成功！')
      this.props.clearState(CLIENTS.UPDATE_CUSTOMER)
    }
  }

  render() {
    let {loaded, data} = this.props.customerInfo
    data = data || {}
    const customerBaseInfo = data.customerBaseInfo || {}
    return (
      <Modal
        style={{width: '60%'}}
        contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>

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
                    fetchBD={this.props.fetchBD}
                    BDList={this.props.BDList}
                    fetchBDPC={this.props.fetchBDPC}
                    BDPCList={this.props.BDPCList}
                    updateBdAndBdpc={this.props.updateBdAndBdpc}
                  />

                  <CategoryTitle title="客户信息"/>
                  <UpdateCustomerInfo
                    customerId={this.props.customerId}
                    customerBaseInfo={customerBaseInfo}
                    updateCustomer={this.props.updateCustomer}
                  />

                  <CategoryTitle title="分/子公司或下属院区"/>
                  <Subcompany/>

                  <CategoryTitle title="联系人"/>
                  <Contact/>

                  <CategoryTitle title="CDA"/>
                  <CDA/>

                  <CategoryTitle title="供应商"/>
                  <Supplier/>

                  <CategoryTitle title="RFI"/>
                  <RFI/>

                  <CategoryTitle title="关联信息"/>
                  <AssociateInfo/>

                  <CategoryTitle title="备注及附件"/>
                  <RemarkAndAttachment/>

                  <CategoryTitle title="操作记录"/>
                  <OperationRecord/>
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
            )
          }
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.clients,
    customerId: props.customerId,
    customerInfo: state.customerInfo,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC,
  updateBdAndBdpc,
  addCustomer, updateCustomer, fetchCustomerInfo
})(addCommonFunction(cache(UpdateClientDialog)))
