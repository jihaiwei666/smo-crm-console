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
import {ADD} from '../../../../core/crud'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CheckBox1 from '../../../../components/form/checkbox/CheckBox1'
import Line from '../../../../components/layout/Line'
import CheckGroup1 from '../../../../components/form/checkgroup/CheckGroup1'

interface AddRfiDialogProps extends CommonFunction {
  customerId: string
  fetchContactList: (customerId) => void
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
    languages: [],
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

  checkModuleRemark = () => {
    if (this.state.modules.indexOf('9') == -1) {
      this.setState({remark: ''})
    }
  }

  add = () => {
    this.props.addRfi({
      "customerRfi": {
        "customer_info_id": this.props.customerId,
        "write_time": getDateStr(this.state.fillDate),
        "write_person": this.state.fillPerson,
        "review_person": this.state.auditPerson,
        "language": this.state.languages.join(','),
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
            <CheckGroup1 value={this.state.languages} onChange={v => this.setState({languages: v})}>
              <CheckBox1 value="1">中文</CheckBox1>
              <CheckBox1 value="2">English</CheckBox1>
            </CheckGroup1>
          </LabelAndInput1>
          <LabelAndInput1 label="模块" inputType={IMPORTANT} className="input-row">
            <CheckGroup1 value={this.state.modules} onChange={v => this.setState({modules: v}, this.checkModuleRemark)}>
              <div>
                <CheckBox1 value="1">公司信息</CheckBox1>
                <CheckBox1 value="2">财务</CheckBox1>
                <CheckBox1 value="3">合规</CheckBox1>
                <CheckBox1 value="4">培训</CheckBox1>
              </div>
              <Line/>
              <div>
                <CheckBox1 value="5">项目管理</CheckBox1>
                <CheckBox1 value="6">项目经验</CheckBox1>
                <CheckBox1 value="7">IT</CheckBox1>
                <CheckBox1 value="8">第三方供应商</CheckBox1>
              </div>
              <Line/>
              <div>
                <CheckBox1 value="9">其它，请备注：</CheckBox1>
                <Input width="200px" className="small" placeholder="请输入备注" disabled={this.state.modules.indexOf('9') == -1}
                       value={this.state.remark} onChange={v => this.setState({remark: v})}/>
              </div>
            </CheckGroup1>
          </LabelAndInput1>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.add}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default addCommonFunction(AddRfiDialog)
