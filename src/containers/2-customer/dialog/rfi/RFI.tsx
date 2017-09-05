/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {FlexDiv, Part} from 'app-core/layout'
import Form from 'app-core/form/Form'

import Input from '../../../../components/form/Input'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import SelectContact from '../base/SelectContact'
import Save from '../../../common/Save'
import Update from '../../../common/Update'
import RFI_ListDialog from './RFI_ListDialog'

import CustomerState from '../../CustomerState'
import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {MODULES} from './rfi.constants'
import {CUSTOMER} from '../../../../core/constants/types'
import {ADD, EDIT, default as crud} from '../../../../core/crud'
import {addListItem, updateItemAtIndex} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'
import {fetchContactList} from '../../customer.action'
import {fetchRfiList, addRfi, updateRfi, removeRfi, fetchLastRfiDetail} from './rfi.action'

interface RFIProps extends CustomerState, CommonFunction {
  customerId: string
  initRfiInfo: any
  fetchContactList: (customerId) => void
  customerContactData: any
  fetchRfiList: (customerId) => void
  fetchLastRfiDetail: (customerId) => void
  rfiList: Data<any[]>
  lastRfiDetail: Data<any>
  addRfi: (options) => void
  updateRfi: (options) => void
  removeRfi: (rifId) => void
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    contactId: '',
    crud: crud.ADD
  }
}

class RFI extends React.Component<RFIProps> {
  rfiId = ''
  state = {
    valid: true,
    showRfiListDialog: false,

    fillDate: null,
    fillPerson: '',
    brokerList: [],
    auditPerson: '',
    language: '',
    modules: [],
    remark: ''
  }

  add = () => {
    this.props.addRfi({
      "customerRfi": {
        "customer_info_id": this.props.customerId,
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

  update = () => {
    this.props.updateRfi({
      "customerRfi": {
        "customer_info_id": this.props.customerId,
        "customer_rfi_id": this.rfiId,
        "write_time": this.state.fillDate,
        "write_person": this.state.fillPerson,
        "review_person": this.state.auditPerson,
        "language": this.state.language,
        "model": this.state.modules.join(','),
        "model_remark": this.state.remark
      },
      "customerRfiDockerList": this.state.brokerList.map(broker => ({
        "customer_rfi_docker_id": broker.crud == crud.ADD ? '' : broker.id,
        "contacts_info_id": broker.contactId,
        "customer_rfi_id": this.rfiId,
        "sign": broker.crud == crud.ADD ? ADD : EDIT
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

  componentWillMount() {
    if (this.props.initRfiInfo) {
      this.rfiId = this.props.initRfiInfo.rfiId
      this.setState(this.props.initRfiInfo)
    }
  }

  componentWillReceiveProps(nextProps: RFIProps) {
    if (!this.props.addRfiSuccess && nextProps.addRfiSuccess) {
      this.props.showSuccess('新增RFI信息成功！')
      this.props.clearState(CUSTOMER.ADD_RFI)
      this.props.fetchLastRfiDetail(this.props.customerId)
    }
    if (!this.props.updateRfiSuccess && nextProps.updateRfiSuccess) {
      this.props.showSuccess('更新RFI信息成功！')
      this.props.clearState(CUSTOMER.UPDATE_RFI)
      this.props.fetchLastRfiDetail(this.props.customerId)
    }
    if (!this.props.removeRfiSuccess && nextProps.removeRfiSuccess) {
      this.props.fetchLastRfiDetail(this.props.customerId)
    }
    if (!this.props.lastRfiDetail.loaded && nextProps.lastRfiDetail.loaded) {
      this.setState(nextProps.lastRfiDetail.data)
      if (nextProps.lastRfiDetail.data) {
        this.rfiId = nextProps.lastRfiDetail.data.rfiId
      }
    }
  }

  render() {
    const contactList = this.props.customerContactData.data || []
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        {
          this.state.showRfiListDialog && (
            <RFI_ListDialog
              customerId={this.props.customerId}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              addRfi={this.props.addRfi}
              addRfiSuccess={this.props.addRfiSuccess}
              updateRfi={this.props.updateRfi}
              updateRfiSuccess={this.props.updateRfiSuccess}
              removeRfi={this.props.removeRfi}
              removeRfiSuccess={this.props.removeRfiSuccess}
              fetchRfiList={this.props.fetchRfiList}
              rfiList={this.props.rfiList}
              onExited={() => this.setState({showRfiListDialog: false})}
            />
          )
        }

        <FlexDiv>
          <Part>
            <LabelAndInput1 label="填写日期" inputType={NECESSARY}>
              <DatePicker value={this.state.fillDate} onChange={v => this.setState({fillDate: v})}/>
            </LabelAndInput1>
            <LabelAndInput
              required={true} format={value => value.trim().length != 0} name="fillPerson"
              label="填写人" inputType={NECESSARY}
              value={this.state.fillPerson} onChange={v => this.setState({fillPerson: v})}
            />
            <InputGroup label="RFI对接人" inputType={IMPORTANT} className="bb bt">
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
            <LabelAndInput1 label="模块" inputType={IMPORTANT} className="pb5 bb">
              <CheckGroup options={MODULES} value={this.state.modules} onChange={v => this.setState({modules: v})}/>
              {
                this.state.modules.indexOf('9') != -1 && (
                  <Input placeholder="请输入备注" value={this.state.remark} onChange={v => this.setState({remark: v})}/>
                )
              }
            </LabelAndInput1>
          </Part>
        </FlexDiv>
        <TextAndButton text="只显示最近一条RFI信息，更多请点击查看更多按钮查看">
          <Button className="small" disabled={!this.props.customerId || !this.rfiId} onClick={() => this.setState({showRfiListDialog: true})}>...查看更多</Button>
        </TextAndButton>
        {
          !this.rfiId && (
            <Save disabled={!this.props.customerId || !this.state.valid} onClick={this.add}/>
          )
        }
        {
          this.rfiId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    initRfiInfo: props.initRfiInfo,
    customerContactData: state.customerContactData,
    rfiList: state.rfiList,
    lastRfiDetail: state.lastRfiDetail
  }
}

export default connect(mapStateToProps, {
  fetchRfiList, addRfi, updateRfi, removeRfi, fetchContactList, fetchLastRfiDetail
})(addCommonFunction(RFI))
