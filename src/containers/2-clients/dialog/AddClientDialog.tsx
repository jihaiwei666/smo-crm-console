/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout/'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import CategoryTitle from '../../common/CategoryTitle'
import Part1 from './add-part/Part1'
import CustomerInfo from '././add-part/CustomerInfo'
import Subcompany from './add-part/Subcompany'
import Contact from './add-part/Contact'
import CDA from './add-part/CDA'
import Supplier from './add-part/Supplier'
import RFI from './add-part/RFI'
import AssociateInfo from './add-part/AssociateInfo'
import RemarkAndAttachment from './add-part/RemarkAndAttachment'
import OperationRecord from './add-part/OperationRecord'

import {addCustomer} from '../clients.action'
import {fetchBD} from '../../../actions/app.action'

interface AddClientDialogProps {
  customerId: string
  addCustomer: (options) => void
  addCustomerSuccess: boolean
  updateCustomer: (options) => void
  updateCustomerSuccess: boolean
  onExited: () => void
}

class AddClientDialog extends React.Component<AddClientDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddClientDialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
     this.close()
     }*/
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
          <Row className="h-100">
            <Part className="form-container">
              <Part1
                customerId={this.props.customerId}
              />

              <CategoryTitle title="客户信息"/>
              <CustomerInfo
                customerId={this.props.customerId}
                addCustomer={this.props.addCustomer}
                addCustomerSuccess={this.props.addCustomerSuccess}
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
        </Modal.Body>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.clients,
    BDList: state.BDList
  }
}

export default connect(mapStateToProps, {
  fetchBD,
  addCustomer
})(AddClientDialog)
