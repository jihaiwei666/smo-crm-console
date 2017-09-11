/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import Spinner from 'app-core/common/Spinner'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import RightNav from '../../../components/nav/RightNav'
import CategoryTitle from '../../common/CategoryTitle'
import CustomerBasicInfo from './part/CustomerBasicInfo'
import BD_BDPC from './part/BD_BDPC'
import SubCompany from './sub-company/SubCompany'
import ContactInfo from './contact/ContactInfo'
import CDA from './cda/CDA'
import Supplier from './supplier/Supplier'
import RFI from './rfi/RFI'
import AssociateInfo from './part/AssociateInfo'
import CustomerRemarkAttachment from './part/CustomerRemarkAttachment'
import OperationRecord from '../../common/OperationRecord'
import Button from '../../../components/button/Button'
import SendRemindDialog from '../../1-todo-remind/dialog/SendRemindDialog'

import CustomerState from '../CustomerState'
import Data from '../../common/interface/Data'
import {fetchCustomerDetail, fetchContactList} from '../customer.action'

interface UpdateCustomerDialogProps extends CustomerState {
  customerId: string
  fetchCustomerDetail: (customerId) => void
  customerInfo: Data<any>

  fetchContactList: (customerId: string) => void
  onExited: () => void
}

class UpdateCustomerDialog extends React.Component<UpdateCustomerDialogProps> {
  customerName = ''
  state = {
    show: true,
    showAddConfirm: false,
    showSendRemind: false
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchCustomerDetail(this.props.customerId)
    this.props.fetchContactList(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: UpdateCustomerDialogProps) {
    if (!this.props.customerInfo.loaded && nextProps.customerInfo.loaded) {
      const initCustomerBaseInfo = nextProps.customerInfo.data.customerBaseInfo
      if (initCustomerBaseInfo) {
        this.customerName = initCustomerBaseInfo.customerName
      }
    }
  }

  render() {
    let {loaded, data} = this.props.customerInfo
    data = data || {}
    const initCustomerBaseInfo = data.customerBaseInfo

    const initBdAndBdpc = data.bdAndBdpc
    const subCompanyList = data.subCompanyList
    const initContactInfo = data.contactInfo
    const supplierInfo = data.supplierInfo
    const rfiInfo = data.rfiInfo
    const relationInfo = data.relationInfo
    const operationRecordList = data.operationRecordList
    const remarkAttachment = data.remarkAttachment
    const authority = data.authority || {}
    const lookAuthority = authority.look
    const editAuthority = authority.edit

    return (
      <Modal
        style={{width: '60%'}}
        contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}
      >
        {
          this.state.showSendRemind && (
            <SendRemindDialog
              relevantId={this.props.customerId}
              relevantType={'1'}
              relevantText={this.customerName}
              onExited={() => this.setState({showSendRemind: false})}/>
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>
            编辑客户
            <div className="pull-right">
              <Button className="small" disabled={!this.props.customerId} onClick={() => this.setState({showSendRemind: true})}>发提醒</Button>
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
                <BD_BDPC
                  customerId={this.props.customerId}
                  initBdAndBdpc={initBdAndBdpc}
                />

                {
                  lookAuthority.basicInfo && (
                    <CategoryTitle title="客户信息" readonly={!editAuthority.basicInfo}/>
                  )
                }

                {
                  lookAuthority.basicInfo && (
                    <CustomerBasicInfo
                      customerId={this.props.customerId}
                      initCustomerBaseInfo={initCustomerBaseInfo}
                      onCustomerNameChange={name => this.customerName = name}
                      editAuthority={editAuthority.basicInfo}
                    />
                  )
                }

                {
                  lookAuthority.subCompany && (
                    <CategoryTitle title="分/子公司或下属院区" readonly={!editAuthority.basicInfo}/>
                  )
                }
                {
                  lookAuthority.subCompany && (
                    <SubCompany
                      customerId={this.props.customerId}
                      subCompanyList={subCompanyList}
                      editAuthority={editAuthority.subCompany}
                    />
                  )
                }
                {
                  lookAuthority.contact && (
                    <CategoryTitle title="联系人" readonly={!editAuthority.contact}/>
                  )
                }
                {
                  lookAuthority.contact && (
                    <ContactInfo
                      customerId={this.props.customerId}
                      initContactInfo={initContactInfo}
                      editAuthority={editAuthority.contact}
                    />
                  )
                }

                {
                  lookAuthority.cda && (
                    <CategoryTitle title="CDA" readonly={!editAuthority.cda}/>
                  )
                }
                {
                  lookAuthority.cda && (
                    <CDA customerId={this.props.customerId} editAuthority={editAuthority.cda}/>
                  )
                }
                {
                  lookAuthority.supplier && (
                    <CategoryTitle title="供应商" readonly={!editAuthority.supplier}/>
                  )
                }
                {
                  lookAuthority.supplier && (
                    <Supplier
                      customerId={this.props.customerId}
                      initSupplierInfo={supplierInfo}
                      editAuthority={editAuthority.supplier}
                    />
                  )
                }
                {
                  lookAuthority.rfi && (
                    <CategoryTitle title="RFI" readonly={!editAuthority.rfi}/>
                  )
                }
                {
                  lookAuthority.rfi && (
                    <RFI customerId={this.props.customerId} initRfiInfo={rfiInfo} editAuthority={editAuthority.rfi}/>
                  )
                }

                <CategoryTitle title="关联信息"/>
                <AssociateInfo relationInfo={relationInfo}/>

                <CategoryTitle title="备注及附件"/>
                <CustomerRemarkAttachment
                  customerId={this.props.customerId}
                  initRemarkAttachment={remarkAttachment}
                />

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
    ...state.customer,
    customerId: props.customerId,
    customerInfo: state.customerInfo,
  }
}

export default connect(mapStateToProps, {
  fetchCustomerDetail, fetchContactList
})(UpdateCustomerDialog)
