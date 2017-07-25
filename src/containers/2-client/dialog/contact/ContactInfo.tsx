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
import {getContactOptions} from './contact.helper'

interface ContactProps {
  customerId: string
  addContact: (options) => void
  newContactId: string
  contactInfo: any[]
  updateContact: (options) => void
  removeContact: (contactId: string) => void
  customerContactData: any

  addContactSuccess: boolean
  updateContactSuccess: boolean
  removeContactSuccess: boolean

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
    showMoreVisitRecordDialog: false,
    list: [{uid: id++, contactId: null, addFlag: true}],
  }

  addLocalContact = () => {
    let list = this.state.list
    list.push({uid: id++, contactId: null, addFlag: true})
    this.setState({list})
  }

  saveContact = (uid, options) => {
    this.localContactUid = uid
    this.props.addContact(options)
  }

  removeContact = (contactId) => {
    this.lastContactId = contactId
    this.props.removeContact(contactId)
  }

  componentWillMount() {
    let contactInfo = this.props.contactInfo
    if (contactInfo && contactInfo.length != 0) {
      let list = contactInfo.map(c => ({uid: c.contactId, contactId: c.contactId}))
      this.setState({list})
    }
  }

  componentWillReceiveProps(nextProps: ContactProps) {
    if (!this.props.addContactSuccess && nextProps.addContactSuccess) {
      let list = this.state.list
      list.find(c => c.uid == this.localContactUid).contactId = nextProps.newContactId
      this.setState({list})
    }
    if (!this.props.removeContactSuccess && nextProps.removeContactSuccess) {
      let list = this.state.list
      let index = list.indexOf(list.find(c => c.contactId == this.lastContactId))
      list.splice(index, 1)
      this.setState({list})
    }
  }

  _getCompanyInfo = (contactId) => {
    let contactInfo = null
    let list = this.props.contactInfo
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
    const contactOptions = getContactOptions(this.props.customerContactData)

    return (
      <div>
        {
          this.state.showMoreVisitRecordDialog && (
            <VisitRecordDialog
              contactId=""
              contactOptions={contactOptions}
              fetchVisitRecordList={this.props.fetchVisitRecordList}
              addVisitRecord={this.props.addVisitRecord}
              updateVisitRecord={this.props.updateVisitRecord}
              removeVisitRecord={this.props.removeVisitRecord}
              onExited={() => this.setState({showMoreVisitRecordDialog: false})}/>
          )
        }
        {
          this.state.list.map((c, index) => {
            return (
              <Contact
                key={c.addFlag ? c.uid : c.contactId}
                customerId={this.props.customerId}
                contactId={c.contactId}
                index={index}
                addContact={(options) => this.saveContact(c.uid, options)}
                contactInfo={this._getCompanyInfo(c.contactId)}
                updateContact={this.props.updateContact}
                removeContact={this.removeContact}
              />
            )
          })
        }
        <div className="clearfix p10 bb">
          <span className="input-unit-illustrate">请先完善联系人信息，之后才能在CDA、供应商、RFI的对接人中选择该联系人</span>
          <div className="pull-right">
            <Button className="small" onClick={this.addLocalContact} disabled={!this.props.customerId}>添加</Button>
          </div>
        </div>

        <div className="p10">
          <div style={{marginRight: '120px'}}>
            拜访记录（!）：
          </div>
          <div className="pull-right">
            <Button className="small" disabled={!this.props.customerId} onClick={() => this.setState({showMoreVisitRecordDialog: true})}>
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
    ...state.clients,
    customerId: props.customerId,
    contactInfo: props.contactInfo,
    customerContactData: state.customerContactData
  }
}

export default connect(mapStateToProps, {
  addContact, updateContact, removeContact,
  fetchVisitRecordList, addVisitRecord, updateVisitRecord, removeVisitRecord
})(ContactInfo)