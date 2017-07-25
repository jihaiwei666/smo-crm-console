/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup, {NECESSARY, IMPORTANT} from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Save from '../../../common/Save'

import {addListItem} from '../../../../core/utils/arrayUtils'
import {fetchContactList} from '../../client.action'
import {addSupplier} from './supplier.action'

interface AddSupplierProps {
  customerId: string
  supplierId?: string
  fetchContactList: (customerId: string) => void
  customerContactData: any
  addSupplier: (options) => void

}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    broker: '',
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
    brokerList: []
  }
}

class AddSupplier extends React.Component<AddSupplierProps> {
  state = {
    supplierType: '',
    isDeployment: '',
    supplierList: []
  }

  save = () => {
    let options = this.getOptions()
    this.props.addSupplier(options)
  }

  getOptions() {
    const {supplierList} = this.state
    let list = supplierList.map(supplier => ({
      "customerProviderInfo": {
        "validity_begin_time": supplier.startDate,
        "validity_end_time": supplier.endDate,
        "validity_select_time": supplier.chosenDate,
        "is_fixed": supplier.isFixed,
        "price": supplier.unitPrice,
      },
      "customerProviderInfoDockers": supplier.brokerList.map(broker => ({
        "contacts_info_id": broker.broker,
        "sign": 2
      }))
    }))
    return {
      customerProvider: {
        "customer_info_id": this.props.customerId,
        "provider_type": this.state.supplierType,
        "is_signed_msa": this.state.isDeployment
      },
      customerProviderInfos: list,
      latestCustomerProviderMsa: {}
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

  render() {
    const contactList = this.props.customerContactData.data || []
    const contactOptions = contactList.map(item => ({
      value: item.contactId, text: item.contactName
    }))
    return (
      <div>
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
                      <LabelAndInput
                        label="起始日期"
                        value={supplier.startDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'startDate', v)}
                      />
                      <LabelAndInput
                        label="结束日期"
                        value={supplier.endDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'endDate', v)}
                      />
                      <LabelAndInput
                        label="入选时间"
                        value={supplier.chosenDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'chosenDate', v)}
                      />
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
                          let telephone = '', email = '', position = ''
                          if (broker.broker) {
                            let contact = contactList.find(d => d.contactId == broker.broker)
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
          <LabelAndInput label="起始日期"/>
          <LabelAndInput label="结束日期"/>
          <LabelAndInput1 label="MSA扫描件">
            <Button className="small">上传</Button>
          </LabelAndInput1>
        </InputGroup>

        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small" disabled={true}>...查看更多</Button>
        </TextAndButton>
        <Save disabled={!this.state.supplierType || !this.state.isDeployment} onClick={this.save}/>
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
  addSupplier, fetchContactList
})(AddSupplier)
