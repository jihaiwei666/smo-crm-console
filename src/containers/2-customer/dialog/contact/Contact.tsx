/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import {Row, Part} from 'app-core/layout'
import Confirm from 'app-core/common/Confirm'

import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import Button from '../../../../components/button/Button'
import Index from '../../../common/Index'

interface ContactProps {
  customerId: string
  contactId: string
  index: number
  addContact: (options) => void
  updateContact: (options) => void
  contactInfo: any
  removeContact: (contactId) => void
}

class Contact extends React.Component<ContactProps> {
  state = {
    showRemoveConfirm: false,

    name: '',
    mobile: '',
    email: '',
    position: '',
    sex: null,
    address: '',
    remark: '',
  }

  addOrUpdate = () => {
    let options = this.getOptions()
    if (this.props.contactId) {
      options['contacts_info_id'] = this.props.contactId
      this.props.updateContact(options)
    } else {
      this.props.addContact(options)
    }
  }

  getOptions() {
    let {
      name, mobile, email, position, sex, address, remark
    } = this.state
    return {
      "customer_info_id": this.props.customerId,
      "contacts_info_name": name,
      "contacts_info_telephone": mobile,
      "contacts_info_mail": email,
      "contacts_info_position": position,
      "contacts_info_sex": sex,
      "contacts_info_address": address,
      "contacts_info_remark": remark,
    }
  }

  componentWillMount() {
    if (this.props.contactInfo) {
      this.setState(this.props.contactInfo)
    }
  }

  render() {
    return (
      <Row className="bb">
        {
          this.state.showRemoveConfirm && (
            <Confirm
              message="确认删除此子公司信息吗？"
              onExited={() => this.setState({showRemoveConfirm: false})}
              onConfirm={() => this.props.removeContact(this.props.contactId)}
            />
          )
        }

        <Index index={this.props.index}/>
        <Part>
          <LabelAndInput label="姓名（*）" value={this.state.name} onChange={v => this.setState({name: v})}/>
          <LabelAndInput label="电话（!）" value={this.state.mobile} onChange={v => this.setState({mobile: v})}/>
          <LabelAndInput label="邮箱（!）" value={this.state.email} onChange={v => this.setState({email: v})}/>
          <LabelAndInput label="职位" value={this.state.position} onChange={v => this.setState({position: v})}/>
          <LabelAndInput1 label="性别">
            <Radio.Group value={this.state.sex} onChange={v => this.setState({sex: v})}>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
              <Radio value="3">其它</Radio>
            </Radio.Group>
          </LabelAndInput1>
          <LabelAndInput label="地址" value={this.state.address} onChange={v => this.setState({address: v})}/>
          <LabelAndInput1 label="备注" className="bb">
            <textarea className="input default-input" rows={5}
                      value={this.state.remark} onChange={e => this.setState({remark: e.target.value})}
            ></textarea>
          </LabelAndInput1>
          {
            this.props.contactId && (
              <div className="clearfix m10">
                <div className="pull-right">
                  <span className="tip">点此删除按钮删除一条联系人信息</span>
                  <Button className="small danger" onClick={() => this.setState({showRemoveConfirm: true})}>删除</Button>
                </div>
              </div>
            )
          }
          <div className="m10">
            <Button className="block" onClick={this.addOrUpdate} disabled={!this.props.customerId || !this.state.name.trim()}>
              {this.props.contactId && <span>更新</span>}
              {!this.props.contactId && <span>保存</span>}
            </Button>
          </div>
        </Part>
      </Row>
    )
  }
}

export default Contact
