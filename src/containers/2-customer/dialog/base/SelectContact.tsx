/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import Select1 from 'app-core/common/Select1'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import LabelAndInput from '../../../common/LabelAndInput'
import ContactBaseInfo from './ContactBaseInfo'

interface SelectContactProps {
  contactId: string
  contactList: ContactBaseInfo[]
  onOpen: () => void
  onChange: (contactId) => void
}

class SelectContact extends React.Component<SelectContactProps> {
  render() {
    const {contactList, contactId} = this.props
    let telephone = '', email = '', position = ''
    if (this.props.contactId) {
      let contact = contactList.find(d => d.contactId == contactId) || {} as any
      telephone = contact.telephone
      email = contact.email
      position = contact.position
    }
    const contactOptions = contactList.map(item => ({
      value: item.contactId, text: item.contactName
    }))
    return (
      <div>
        <LabelAndInput1 className="bb" label="对接人">
          <Select1 width="200px" options={contactOptions}
                   onOpen={this.props.onOpen}
                   value={this.props.contactId}
                   onChange={v => this.props.onChange(v)}
          />
        </LabelAndInput1>
        <LabelAndInput placeholder="选择对接人后自动显示" label="电话" disabled={true} value={telephone} onChange={v => null}/>
        <LabelAndInput placeholder="选择对接人后自动显示" label="邮箱" disabled={true} value={email} onChange={v => null}/>
        <LabelAndInput placeholder="选择对接人后自动显示" label="职位" disabled={true} value={position} onChange={v => null}/>
      </div>
    )
  }
}

export default SelectContact
