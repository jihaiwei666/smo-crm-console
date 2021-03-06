/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FlexDiv, Part} from 'app-core/layout'
import Form from 'app-core/form/Form'

import Line from '../../../../components/layout/Line'
import Input from '../../../../components/form/Input'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import SelectContact from '../base/SelectContact'
import CheckGroup1 from '../../../../components/form/checkgroup/CheckGroup1'
import CheckBox1 from '../../../../components/form/checkbox/CheckBox1'
import DatePicker from '../../../../components/form/DatePicker'
import Save from '../../../common/Save'
import Update from '../../../common/Update'
import RFI_ListDialog from './RFI_ListDialog'

import CustomerState from '../../CustomerState'
import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
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
  editAuthority: boolean
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
  static defaultProps = {
    editAuthority: true
  }

  rfiId = ''
  state = {
    valid: true,
    showRfiListDialog: false,

    fillDate: null,
    fillPerson: '',
    brokerList: [],
    auditPerson: '',
    languages: [],
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
        "language": this.state.languages.join(','),
        "model": this.state.modules.join(','),
        "model_remark": this.state.remark
      },
      "customerRfiDockerList": this.state.brokerList.filter(broker => broker.contactId != '').map(broker => ({
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
        "language": this.state.languages.join(','),
        "model": this.state.modules.join(','),
        "model_remark": this.state.remark
      },
      "customerRfiDockerList": this.state.brokerList.filter(broker => broker.contactId != '').map(broker => ({
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

  checkModuleRemark = () => {
    if (this.state.modules.indexOf('9') == -1) {
      this.setState({remark: ''})
    }
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
      this.props.fetchLastRfiDetail(this.props.customerId)
    }
    if (!this.props.updateRfiSuccess && nextProps.updateRfiSuccess) {
      this.props.showSuccess('更新RFI信息成功！')
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
      <Form className="--module-item" onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority || !this.props.customerId}>
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
              editAuthority={this.props.editAuthority}
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
                <AddButton disabled={!this.props.customerId || !this.props.editAuthority} onClick={this.addBroker}/>
              </TextAndButton>
            </InputGroup>
            <LabelAndInput className="input-row" label="审阅人" inputType={IMPORTANT} value={this.state.auditPerson} onChange={v => this.setState({auditPerson: v})}/>
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
          </Part>
        </FlexDiv>
        <TextAndButton text="只显示最近一条RFI信息，更多请点击查看更多按钮查看">
          <Button className="small" disabled={!this.props.customerId || !this.rfiId} onClick={() => this.setState({showRfiListDialog: true})}>...查看更多</Button>
        </TextAndButton>
        {
          this.props.editAuthority && !this.rfiId && (
            <Save disabled={!this.props.customerId || !this.state.valid} onClick={this.add}/>
          )
        }
        {
          this.props.editAuthority && this.rfiId && (
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
