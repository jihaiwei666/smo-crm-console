/**
 * Created by jiangyukun on 2017/7/10.
 */
import CommonFunction from '../../../common/interface/CommonFunction'

import React from 'react'
import {connect} from 'react-redux'
import Button from '../../../../components/button/Button'
import Contact from './_Contact'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import {addContact, updateContact, removeContact} from '../../client.action'
import {CLIENTS} from '../../../../core/constants/types'

interface ContactProps extends CommonFunction {
  customerId: string
  addContact: (options) => void
  newContactId: string
  contactList: any[]
  updateContact: (options) => void
  removeContact: (contactId: string) => void

  addContactSuccess: boolean
  updateContactSuccess: boolean
  removeContactSuccess: boolean
}

let id = 1

class ContactInfo extends React.Component<ContactProps> {
  localContactUid: number
  lastContactId: string
  state = {
    list: [{uid: id++, contactId: null, addFlag: true}]
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
    let contactList = this.props.contactList
    if (contactList && contactList.length != 0) {
      let list = contactList.map(c => ({uid: c.contactId, contactId: c.contactId}))
      this.setState({list})
    }
  }

  componentWillReceiveProps(nextProps: ContactProps) {
    if (!this.props.addContactSuccess && nextProps.addContactSuccess) {
      let list = this.state.list
      list.find(c => c.uid == this.localContactUid).contactId = nextProps.newContactId
      this.setState({list})
      this.props.showSuccess('添加联系人成功！')
      this.props.clearState(CLIENTS.ADD_CONTACT)
    }
    if (!this.props.updateContactSuccess && nextProps.updateContactSuccess) {
      this.props.showSuccess('更新联系人信息成功！')
      this.props.clearState(CLIENTS.UPDATE_CONTACT)
    }
    if (!this.props.removeContactSuccess && nextProps.removeContactSuccess) {
      this.props.showSuccess('删除联系人成功！')
      let list = this.state.list
      let index = list.indexOf(list.find(c => c.contactId == this.lastContactId))
      list.splice(index, 1)
      this.setState({list})
      this.props.clearState(CLIENTS.REMOVE_CONTACT)
    }
  }

  _getCompanyInfo = (contactId) => {
    let contactInfo = null
    let list = this.props.contactList
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
          this.state.list.map((c, index) => {
            return (
              <Contact
                key={c.addFlag ? c.uid : c.contactId}
                customerId={this.props.customerId}
                contactId={c.contactId}
                localId={c.uid}
                index={index}
                addContact={this.saveContact}
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
            <Button className="small" disabled={!this.props.customerId}>...查看更多</Button>
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
    contactList: props.contactList
  }
}

export default connect(mapStateToProps, {
  addContact, updateContact, removeContact
})(addCommonFunction(ContactInfo))
