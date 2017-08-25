/**
 * Created by jiangyukun on 2017/7/28.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import {Row, Part} from 'app-core/layout/'
import Confirm from 'app-core/common/Confirm'

import Data from '../../../common/interface/Data'
import Button from '../../../../components/button/Button'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Radio from '../../../../components/form/radio/Radio'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import Input from '../../../../components/form/Input'
import SelectContact from '../base/SelectContact'

import {MODULES} from './rfi.constants'
import {updateItemAtIndex, addListItem} from '../../../../core/utils/arrayUtils'
import {EDIT, ADD} from '../../../../core/crud'
import {getDateStr} from '../../../../core/utils/dateUtils'

interface UpdateRFI_ItemProps {
  customerId: string
  fetchContactList: (customerId) => void
  customerContactData: Data<any>
  rfiId: string
  rfi: any
  updateRfi: (options) => void
  removeRfi: (rfiId) => void
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    contactId: '',
    isLocal: true
  }
}

class UpdateRFI_Item extends React.Component<UpdateRFI_ItemProps> {
  state = {
    showRemoveConfirm: false,

    fillDate: null,
    fillPerson: '',
    brokerList: [],
    language: null,
    auditPerson: '',
    modules: [],
    remark: ''
  }

  addBroker = () => {
    addListItem(this.state.brokerList, getNextBroker())
    this.forceUpdate()
  }

  handleBrokerChange = (brokerIndex, stateKey, value) => {
    updateItemAtIndex(this.state.brokerList, brokerIndex, b => b[stateKey] = value)
    this.forceUpdate()
  }

  update = () => {
    this.props.updateRfi({
      "customerRfi": {
        "customer_rfi_id": this.props.rfiId,
        "customer_info_id": this.props.customerId,
        "write_time": getDateStr(this.state.fillDate),
        "write_person": this.state.fillPerson,
        "review_person": this.state.auditPerson,
        "language": this.state.language,
        "model": this.state.modules.join(','),
        "model_remark": this.state.remark
      },
      "customerRfiDockerList": this.state.brokerList.map(broker => {
        if (broker.isLocal) {
          return {
            "contacts_info_id": broker.contactId,
            "sign": ADD
          }
        }
        return {
          "customer_rfi_docker_id": broker.id,
          "customer_rfi_id": this.props.rfiId,
          "contacts_info_id": broker.contactId,
          "sign": EDIT
        }
      })
    })
  }

  remove = () => {
    this.props.removeRfi(this.props.rfiId)
  }

  componentWillMount() {
    this.setState(this.props.rfi)
  }

  render() {
    const contactList = this.props.customerContactData.data || []

    return (
      <div>
        {
          this.state.showRemoveConfirm && (
            <Confirm
              message="确认删除此RFI吗？"
              onExited={() => this.setState({showRemoveConfirm: false})}
              onConfirm={this.remove}
            />
          )
        }
        <LabelAndInput1 label="填写日期" inputType={NECESSARY}>
          <DatePicker value={this.state.fillDate} onChange={v => this.setState({fillDate: v})}/>
        </LabelAndInput1>
        <LabelAndInput label="填写人" inputType={NECESSARY} value={this.state.fillPerson} onChange={v => this.setState({fillPerson: v})}/>
        <InputGroup label="RFI对接人" inputType={IMPORTANT} className="bt">
          {
            this.state.brokerList.map((broker, index) => {
              return (
                <SelectContact key={broker.id} contactId={broker.contactId}
                               contactList={contactList}
                               onOpen={() => this.props.fetchContactList(this.props.customerId)}
                               onChange={v => this.handleBrokerChange(index, 'contactId', v)}
                />
              )
            })
          }
          <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
            <AddButton disabled={!this.props.customerId} onClick={this.addBroker}/>
          </TextAndButton>
        </InputGroup>
        <LabelAndInput className="pb5 bb" label="审阅人" inputType={IMPORTANT} value={this.state.auditPerson} onChange={v => this.setState({auditPerson: v})}/>
        <LabelAndInput1 className="bb" label="语言" inputType={IMPORTANT}>
          <Radio.Group value={this.state.language} onChange={v => this.setState({language: v})}>
            <Radio value="1">中文</Radio>
            <Radio value="2">English</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 label="模块" inputType={IMPORTANT}>
          <CheckGroup options={MODULES} value={this.state.modules} onChange={v => this.setState({modules: v})}/>
          {
            this.state.modules.indexOf('9') != -1 && (
              <Input placeholder="请输入备注" value={this.state.remark} onChange={v => this.setState({remark: v})}/>
            )
          }
        </LabelAndInput1>
        <div className="m10">
          <Row>
            <Part className="ml20 mr20">
              <Button className="small danger block" onClick={() => this.setState({showRemoveConfirm: true})}>删除</Button>
            </Part>
            <Part className="ml20 mr20">
              <Button className="small block" onClick={this.update}>更新</Button>
            </Part>
          </Row>
        </div>
      </div>
    )
  }
}

export default UpdateRFI_Item
