/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Update from '../../../common/Update'

import {ADD, EDIT} from '../../../../core/CRUD'
import {addListItem} from '../../../../core/utils/arrayUtils'
import {fetchContactList} from '../../client.action'
import {updateSupplier, fetchMSAList, addMsa, updateMsa} from './supplier.action'
import LookMSADialog from './LookMSADialog'

interface EditSupplierProps {
  customerId: string
  supplierId: string
  supplierInfo: any
  fetchContactList: (customerId: string) => void
  customerContactData: any
  updateSupplier: (options) => void
  fetchMSAList: (supplierId: string) => void
  msaListInfo: any[]

  addMsa: (options) => void
  updateMsa: (options) => void
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    broker: '',
    isLocal: true
  }
}

function getNextSupplier() {
  return {
    id: id++,
    startDate: '',
    endDate: '',
    chosenDate: '',
    isFixed: '',
    unitPrice: '',
    brokerList: [],
    isLocal: true
  }
}

class EditSupplier extends React.Component<EditSupplierProps> {
  state = {
    showMoreMSA: false,
    supplierType: '',
    isDeployment: '',
    supplierList: [],
    startDate: null,
    endDate: null
  }

  update = () => {
    let options = this.getOptions()
    this.props.updateSupplier(options)
  }

  getOptions() {
    const {supplierList} = this.state
    let list = supplierList.map(supplier => ({
      "customerProviderInfo": {
        "provider_id": this.props.supplierId,
        "provider_info_id": supplier.id,
        "validity_begin_time": supplier.startDate,
        "validity_end_time": supplier.endDate,
        "validity_select_time": supplier.chosenDate,
        "is_fixed": supplier.isFixed,
        "price": supplier.unitPrice,
      },
      "customerProviderInfoDockers": supplier.brokerList.map(broker => ({
        "provider_info_id": supplier.id,
        "provider_info_docker_id": broker.isLocal ? '' : broker.id,
        "contacts_info_id": broker.broker,
        "sign": broker.isLocal ? ADD : EDIT
      })),
      "sign": supplier.isLocal ? ADD : EDIT
    }))
    return {
      customerProvider: {
        "provider_id": this.props.supplierId,
        "customer_info_id": this.props.customerId,
        "provider_type": this.state.supplierType,
        "is_signed_msa": this.state.isDeployment
      },
      customerProviderInfos: list,
      latestCustomerProviderMsa: null
    }
  }

  addSupplier = () => {
    this.setState({supplierList: addListItem(this.state.supplierList, getNextSupplier())})
  }

  addBroker = (supplierIndex) => {
    addListItem(this.state.supplierList[supplierIndex].brokerList, getNextBroker())
    this.forceUpdate()
  }

  handleSupplierChange = (supplierIndex, stateKey, value) => {
    this.state.supplierList[supplierIndex][stateKey] = value
    this.forceUpdate()
  }

  handleBrokerChange = (supplierIndex, brokerIndex, stateKey, value) => {
    this.state.supplierList[supplierIndex].brokerList[brokerIndex][stateKey] = value
    this.forceUpdate()
  }

  componentWillMount() {
    this.setState(this.props.supplierInfo)
  }

  componentDidMount() {
    this.props.fetchContactList(this.props.customerId)
  }

  render() {
    const contactList = this.props.customerContactData.data || []
    const contactOptions = contactList.map(item => ({
      value: item.contactId, text: item.contactName
    }))

    return (
      <div>
        {
          this.state.showMoreMSA && (
            <LookMSADialog
              supplierId={this.props.supplierId}
              fetchMSAList={this.props.fetchMSAList}
              msaListInfo={this.props.msaListInfo}
              addMsa={this.props.addMsa}
              updateMsa={this.props.updateMsa}
              onExited={() => this.setState({showMoreMSA: false})}
            />
          )
        }

        <InputGroup label="供应商类别" inputType={NECESSARY}>
          <Radio.Group value={this.state.supplierType} onChange={v => this.setState({supplierType: v})}>
            <Radio value="1">优选供应商</Radio>
            <Radio value="2">普通供应商</Radio>
          </Radio.Group>
        </InputGroup>
        <div className="mt15 pb15 pl5 bb">供应商信息：</div>
        <div className="bb">
          {
            this.state.supplierList.map((supplier, supplierIndex) => {
              return (
                <FlexDiv key={supplier.id}>
                  <div style={{width: '30px'}}></div>
                  <Part className="bl">
                    <InputGroup label="有效期限（!）">
                      <LabelAndInput1 label="起始日期">
                        <DatePicker value={supplier.startDate} onChange={v => this.handleSupplierChange(supplierIndex, 'startDate', v)}/>
                      </LabelAndInput1>
                      <LabelAndInput1 label="结束日期">
                        <DatePicker value={supplier.endDate} onChange={v => this.handleSupplierChange(supplierIndex, 'endDate', v)}/>
                      </LabelAndInput1>
                      <LabelAndInput1 label="入选时间">
                        <DatePicker value={supplier.chosenDate} onChange={v => this.handleSupplierChange(supplierIndex, 'chosenDate', v)}/>
                      </LabelAndInput1>
                      <LabelAndInput1 label="是否固定">
                        <Radio.Group value={supplier.isFixed} onChange={v => this.handleSupplierChange(supplierIndex, 'isFixed', v)}>
                          <Radio value="1">是</Radio>
                          <Radio value="2">否</Radio>
                        </Radio.Group>
                      </LabelAndInput1>
                      <LabelAndInput
                        label="具体单价"
                        value={supplier.unitPrice}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'unitPrice', v)}
                      />
                    </InputGroup>
                    <InputGroup label="对接人信息" inputType={IMPORTANT}>
                      {
                        supplier.brokerList.map((broker, brokerIndex) => {
                          let telephone = ''
                          let email = ''
                          let position = ''
                          if (broker.broker) {
                            let contact = contactList.find(d => d.contactId == broker.broker) || {}
                            telephone = contact.telephone
                            email = contact.email
                            position = contact.position
                          }

                          return (
                            <div key={broker.id} className="bb p5">
                              <LabelAndInput1 label="对接人">
                                <Select1 options={contactOptions}
                                         onOpen={() => this.props.fetchContactList(this.props.customerId)}
                                         value={broker.broker}
                                         onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'broker', v)}
                                />
                              </LabelAndInput1>
                              <LabelAndInput
                                label="电话"
                                disabled={true}
                                value={telephone}
                                onChange={() => null}
                              />
                              <LabelAndInput
                                label="邮箱"
                                disabled={true}
                                value={email}
                                onChange={() => null}
                              />
                              <LabelAndInput
                                label="职位"
                                disabled={true}
                                value={position}
                                onChange={() => null}
                              />
                            </div>
                          )
                        })
                      }
                      <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                        <AddButton onClick={() => this.addBroker(supplierIndex)}/>
                      </TextAndButton>
                    </InputGroup>
                  </Part>
                </FlexDiv>
              )
            })
          }
          <div>
            <TextAndButton text="点此添加按钮添加一条供应商信息">
              <AddButton onClick={this.addSupplier}/>
            </TextAndButton>
          </div>
        </div>

        <InputGroup label="MSA">
          <LabelAndInput1 label="是否签署（*）">
            <Radio.Group value={this.state.isDeployment} onChange={v => this.setState({isDeployment: v})}>
              <Radio value="1">是</Radio>
              <Radio value="0">否</Radio>
            </Radio.Group>
          </LabelAndInput1>
          <LabelAndInput1 label="起始日期">
            <DatePicker value={this.state.startDate} onChange={v => this.setState({startDate: v})}/>
          </LabelAndInput1>
          <LabelAndInput1 label="结束日期">
            <DatePicker value={this.state.endDate} onChange={v => this.setState({endDate: v})}/>
          </LabelAndInput1>
          <LabelAndInput1 label="MSA扫描件">
            <Button className="small">上传</Button>
          </LabelAndInput1>
        </InputGroup>

        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small" onClick={() => this.setState({showMoreMSA: true})}>...查看更多</Button>
        </TextAndButton>

        <Update disabled={!this.state.supplierType || !this.state.isDeployment} onClick={this.update}/>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    customerId: props.customerId,
    supplierId: props.supplierId,
    supplierInfo: props.supplierInfo,
    customerContactData: state.customerContactData,
    msaListInfo: state.msaListInfo
  }
}

export default connect(mapStateToProps, {
  updateSupplier, fetchContactList, fetchMSAList, addMsa, updateMsa
})(EditSupplier)
