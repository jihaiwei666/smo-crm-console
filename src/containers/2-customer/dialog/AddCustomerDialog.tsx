/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'

import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import RightNav from '../../../components/nav/RightNav'
import CategoryTitle from '../../common/CategoryTitle'
import BD_BDPC from './part/BD_BDPC'
import CustomerBasicInfo from './part/CustomerBasicInfo'
import SubCompany from './sub-company/SubCompany'
import ContactInfo from './contact/ContactInfo'
import CDA from './cda/CDA'
import Supplier from './supplier/Supplier'
import RFI from './rfi/RFI'
import AssociateInfo from './part/AssociateInfo'
import CustomerRemarkAttachment from './part/CustomerRemarkAttachment'
import OperationRecord from '../../common/OperationRecord'

import CustomerState from '../CustomerState'
import Button from '../../../components/button/Button'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'

interface AddCustomerDialogProps extends CustomerState {
  addCustomer: (options) => void
  updateCustomer: (options) => void
  onExited: () => void
}

class AddCustomerDialog extends React.Component<AddCustomerDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    showSendRemind: false,
    customerId: null,
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddCustomerDialogProps) {
    if (!this.props.addCustomerSuccess && nextProps.addCustomerSuccess) {
      this.setState({customerId: nextProps.newCustomerId})
    }
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}} contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            添加客户
            <div className="pull-right">
              <Button className="small" disabled={!this.state.customerId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RightNav navItems={['客户信息', '分/子公司或下属院区', '联系人', 'CDA', '供应商', 'RFI', '关联信息', '备注及附件', '操作记录']}>
            <BD_BDPC
              customerId={this.state.customerId}
            />

            <CategoryTitle title="客户信息"/>
            <CustomerBasicInfo
              customerId={this.state.customerId}
            />

            <CategoryTitle title="分/子公司或下属院区"/>
            <SubCompany customerId={this.state.customerId}/>

            <CategoryTitle title="联系人"/>
            <ContactInfo customerId={this.state.customerId}/>

            <CategoryTitle title="CDA"/>
            <CDA customerId={this.state.customerId}/>

            <CategoryTitle title="供应商"/>
            <Supplier customerId={this.state.customerId}/>

            <CategoryTitle title="RFI"/>
            <RFI customerId={this.state.customerId}/>

            <CategoryTitle title="关联信息"/>
            <AssociateInfo/>

            <CategoryTitle title="备注及附件"/>
            <CustomerRemarkAttachment customerId={this.state.customerId}/>

            <CategoryTitle title="操作记录"/>
            <OperationRecord operationRecordList={[]}/>
          </RightNav>
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

export default connect(mapStateToProps, {})(AddCustomerDialog)
