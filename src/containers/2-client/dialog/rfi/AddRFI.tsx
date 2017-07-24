/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Input from '../../../../components/form/Input'
import Label from '../../../common/Label'
import InputUnit from '../../../common/InputUnit'
import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import CheckBox from '../../../../components/form/checkbox/CheckBox'
import Save from '../../../common/Save'

import {fetchContactList} from '../../client.action'
import {addRfi, updateRfi, removeRfi} from './rfi.action'
import {addListItem, updateItemAtIndex} from '../../../../core/utils/arrayUtils'
import {ADD} from '../../../../core/CRUD'

interface AddRFIProps {
  customerId: string
  fetchContactList: (customerId: string) => void
  customerContactData: any
  addRfi: (options) => void
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    contactId: '',
  }
}

class AddRFI extends React.Component<AddRFIProps> {
  state = {
    fillDate: '',
    fillPerson: '',
    brokerList: [getNextBroker()],
    auditPerson: '',
    language: '',
  }

  add = () => {
    this.props.addRfi({
      "customerRfi": {
        "customer_info_id": this.props.customerId,
        "write_time": this.state.fillDate,
        "write_person": this.state.fillPerson,
        "review_person": this.state.auditPerson,
        "language": this.state.language,
        "model": 1,
        "model_remark": '',
      },
      "customerRfiDockerList": this.state.brokerList.map(broker => ({
        "contacts_info_id": broker.contactId,
        "sign": ADD
      }))
    })
  }

  addBroker = () => {
    addListItem(this.state.brokerList, getNextBroker())
    this.forceUpdate()
  }

  handleBrokerChange = (brokerIndex, stateKey, value) => {
    updateItemAtIndex(this.state.brokerList, brokerIndex, b => b[stateKey] = value)
    this.forceUpdate()
  }

  render() {
    const contactList = this.props.customerContactData.data || []
    const contactOptions = contactList.map(item => ({
      value: item.contactId, text: item.contactName
    }))

    return (
      <div>
        <FlexDiv>
          <div> 1</div>
          <Part>
            <LabelAndInput label="填写日期（*）" value={this.state.fillDate} onChange={v => this.setState({fillDate: v})}/>
            <LabelAndInput label="填写人（*）" value={this.state.fillPerson} onChange={v => this.setState({fillPerson: v})}/>
            {
              this.state.brokerList.map((broker, index) => {
                let telephone = '', email = '', position = ''
                if (broker.contactId) {
                  let contact = contactList.find(d => d.contactId == broker.contactId)
                  telephone = contact.telephone
                  email = contact.email
                  position = contact.position
                }
                return (
                  <InputGroup key={broker.id} label="RFI对接人（!）">
                    <LabelAndInput1 label="对接人">
                      <Select1 options={contactOptions}
                               onOpen={() => this.props.fetchContactList(this.props.customerId)}
                               value={broker.contactId}
                               onChange={v => this.handleBrokerChange(index, 'contactId', v)}
                      />
                    </LabelAndInput1>
                    <LabelAndInput label="电话" disabled={true} value={telephone} onChange={v => null}/>
                    <LabelAndInput label="邮箱" disabled={true} value={email} onChange={v => null}/>
                    <LabelAndInput label="职位" disabled={true} value={position} onChange={v => null}/>
                    <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                      <AddButton onClick={this.addBroker}/>
                    </TextAndButton>
                  </InputGroup>
                )
              })
            }
            <LabelAndInput label="审阅人（!）" value={this.state.auditPerson} onChange={v => this.setState({auditPerson: v})}/>
            <LabelAndInput1 label="语言（!）">
              <Radio.Group value={this.state.language} onChange={v => this.setState({language: v})}>
                <Radio value="1">中文</Radio>
                <Radio value="2">English</Radio>
              </Radio.Group>
            </LabelAndInput1>
            <LabelAndInput1 label="模块（!）" className="pb5 bb">
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>公司信息</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>财务</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>合规</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>培训</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>项目管理</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>项目经验</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>IT</CheckBox>
              <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>第三方供应商</CheckBox>
              <FlexDiv>
                <CheckBox className="pt5 pr5" checked={false} onChange={() => this.setState({})}>其它，请备注：</CheckBox>
                <Part>
                  <Input placeholder="请输入"/>
                </Part>
              </FlexDiv>
            </LabelAndInput1>
          </Part>
        </FlexDiv>
        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small">...查看更多</Button>
        </TextAndButton>

        <Save disabled={!this.props.customerId} onClick={this.add}/>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    customerId: props.customerId,
    customerContactData: state.customerContactData
  }
}

export default connect(mapStateToProps, {
  addRfi, updateRfi, removeRfi, fetchContactList
})(AddRFI)
