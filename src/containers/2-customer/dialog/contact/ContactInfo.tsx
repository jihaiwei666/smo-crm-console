/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Button from '../../../../components/button/Button'
import Contact from './Contact'
import VisitRecordDialog from './VisitRecordDialog'

import {
  addContact, updateContact, removeContact,
  fetchVisitRecordList, addVisitRecord, updateVisitRecord, removeVisitRecord
} from './contact.action'
import {fetchContactList} from '../../customer.action'
import CustomerState from '../../CustomerState'
import {CUSTOMER} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {lastItemIsLocal} from '../../../common/common.helper'
import crud from '../../../../core/crud'

interface ContactProps extends CustomerState, CommonFunction {
  customerId: string
  fetchContactList: (customerId) => void
  addContact: (options) => void
  initContactInfo: any[]
  updateContact: (options) => void
  removeContact: (contactId: string) => void
  customerContactData: any
  visitRecordListInfo: any

  fetchVisitRecordList: any
  addVisitRecord: any
  updateVisitRecord: any
  removeVisitRecord: any
}

let id = 1

class ContactInfo extends React.Component<ContactProps> {
  localContactUid: number
  lastContactId: string
  state = {
    showVisitRecordDialog: false,
    list: [],
  }

  addLocalContact = () => {
    let list = this.state.list
    list.push({id: id++, contactId: null, crud: crud.ADD, isLocal: true})
    this.setState({list})
  }

  saveContact = (id, options) => {
    this.localContactUid = id
    this.props.addContact(options)
  }

  removeContact = (contactId) => {
    this.lastContactId = contactId
    this.props.removeContact(contactId)
  }

  componentWillMount() {
    let initContactInfo = this.props.initContactInfo
    if (initContactInfo && initContactInfo.length != 0) {
      let list = initContactInfo.map(c => ({id: c.contactId, contactId: c.contactId}))
      this.setState({list})
    }
  }

  componentWillReceiveProps(nextProps: ContactProps) {
    if (!this.props.addContactSuccess && nextProps.addContactSuccess) {
      this.props.showSuccess('添加联系人信息成功！')
      this.props.clearState(CUSTOMER.ADD_CONTACT)
      let list = this.state.list
      let match = list.find(c => c.id == this.localContactUid)
      match.contactId = nextProps.newContactId
      match.crud = null
      this.setState({list})
    }
    if (!this.props.updateContactSuccess && nextProps.updateContactSuccess) {
      this.props.showSuccess('更新联系人信息成功！')
      this.props.clearState(CUSTOMER.UPDATE_CONTACT)
    }
    if (!this.props.removeContactSuccess && nextProps.removeContactSuccess) {
      this.props.showSuccess('删除联系人成功！')
      this.props.clearState(CUSTOMER.REMOVE_CONTACT)
      let list = this.state.list
      let index = list.indexOf(list.find(c => c.contactId == this.lastContactId))
      list.splice(index, 1)
      this.setState({list})
    }
  }

  _getContactInfo = (contactId) => {
    let contactInfo = null
    let list = this.props.initContactInfo
    if (list) {
      let match = list.find(c => c.contactId == contactId)
      if (match) {
        let {contactId, ...other} = match
        contactInfo = other
      }
    }
    return contactInfo
  }

  render() {
    return (
      <div>
        {
          this.state.showVisitRecordDialog && (
            <VisitRecordDialog
              customerId={this.props.customerId}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              fetchVisitRecordList={this.props.fetchVisitRecordList}
              visitRecordListInfo={this.props.visitRecordListInfo}
              addVisitRecord={this.props.addVisitRecord}
              addVisitRecordSuccess={this.props.addVisitRecordSuccess}
              updateVisitRecord={this.props.updateVisitRecord}
              updateVisitRecordSuccess={this.props.updateVisitRecordSuccess}
              removeVisitRecord={this.props.removeVisitRecord}
              removeVisitRecordSuccess={this.props.removeVisitRecordSuccess}
              onExited={() => this.setState({showVisitRecordDialog: false})}/>
          )
        }
        {
          this.state.list.map((c, index) => {
            return (
              <Contact
                key={c.isLocal ? c.id : c.contactId}
                customerId={this.props.customerId}
                contactId={c.contactId}
                index={index}
                addContact={(options) => this.saveContact(c.id, options)}
                contactInfo={this._getContactInfo(c.contactId)}
                updateContact={this.props.updateContact}
                removeContact={this.removeContact}
              />
            )
          })
        }
        <div className="clearfix p10 bb">
          <span className="input-unit-illustrate">请先完善联系人信息，之后才能在CDA、供应商、RFI的对接人中选择该联系人</span>
          <div className="pull-right">
            <Button className="small" onClick={this.addLocalContact}
                    disabled={!this.props.customerId || lastItemIsLocal(this.state.list)}>添加</Button>
          </div>
        </div>

        <div className="p10">
          <div style={{marginRight: '120px'}}>
            拜访记录（!）：
          </div>
          <div className="pull-right">
            <Button className="small" disabled={!this.props.customerId} onClick={() => this.setState({showVisitRecordDialog: true})}>
              ...查看更多
            </Button>
          </div>
          <div className="input-unit-illustrate">
            详细记录对该客户的拜访记录，拜访内容中填写该次拜访的主要讨论事宜
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    contactInfo: state.contactInfo,
    customerContactData: state.customerContactData,
    visitRecordListInfo: state.visitRecordListInfo,
  }
}

export default connect(mapStateToProps, {
  fetchContactList,
  addContact, updateContact, removeContact,
  fetchVisitRecordList, addVisitRecord, updateVisitRecord, removeVisitRecord
})(addCommonFunction(ContactInfo))
