/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'app-core/modal'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import SelectContact from '../base/SelectContact'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Data from '../../../common/interface/Data'
import {MODULES} from './rfi.constants'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import Radio from '../../../../components/form/radio/Radio'
import Input from '../../../../components/form/Input'

import {updateItemAtIndex, addListItem} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'
import {ADD} from '../../../../core/CRUD'

interface AddRfiDialogProps {
  clientId: string
  fetchContactList: (clientId) => void
  customerContactData: Data<any>

  addRfi: (options) => void
  addRfiSuccess: boolean
  onExited: () => void
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    contactId: '',
    isLocal: true
  }
}

class AddRfiDialog extends React.Component<AddRfiDialogProps> {
  state = {
    show: true,
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

  add = () => {
    this.props.addRfi({
      "customerRfi": {
        "customer_info_id": this.props.clientId,
        "write_time": getDateStr(this.state.fillDate),
        "write_person": this.state.fillPerson,
        "review_person": this.state.auditPerson,
        "language": this.state.language,
        "model": this.state.modules.join(','),
        "model_remark": this.state.remark
      },
      "customerRfiDockerList": this.state.brokerList.map(broker => ({
        "contacts_info_id": broker.contactId,
        "sign": ADD
      }))
    })
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddRfiDialogProps) {
    if (!this.props.addRfiSuccess && nextProps.addRfiSuccess) {
      this.close()
    }
  }

  render() {
    const contactList = this.props.customerContactData.data || []
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>添加RFI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                                 onOpen={() => this.props.fetchContactList(this.props.clientId)}
                                 onChange={v => this.handleBrokerChange(index, 'contactId', v)}
                  />
                )
              })
            }
            <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
              <AddButton disabled={!this.props.clientId} onClick={this.addBroker}/>
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
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.add}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddRfiDialog
