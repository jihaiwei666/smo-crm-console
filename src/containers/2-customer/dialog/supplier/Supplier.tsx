/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {FlexDiv, Part} from 'app-core/layout'

import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import TextAndButton from '../../../common/TextAndButton'
import SelectContact from '../base/SelectContact'
import AddButton from '../../../common/AddButton'
import Save from '../../../common/Save'
import Update from '../../../common/Update'
import LookMSADialog from './LookMSADialog'
import SingleFile from '../../../common/file/SingleFile'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import CustomerState from '../../CustomerState'
import Data from '../../../common/interface/Data'
import {EDIT, ADD} from '../../../../core/CRUD'
import {CUSTOMER} from '../../../../core/constants/types'
import {addListItem} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'
import {fetchContactList} from '../../customer.action'
import {addSupplier, updateSupplier, fetchMSAList, addMsa, updateMsa} from './supplier.action'

interface SupplierProps extends CustomerState, CommonFunction {
  customerId: string
  supplierId?: string
  initSupplierInfo?: any
  fetchContactList: (customerId: string) => void
  customerContactData: Data<any>
  addSupplier: (options) => void
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

class Supplier extends React.Component<SupplierProps> {
  state = {
    showMoreMSA: false,

    supplierType: '',
    isDeployment: '',
    supplierList: [],
    startDate: null,
    endDate: null,
    scanFile: null
  }

  add = () => {
    const {supplierList} = this.state
    let list = supplierList.map(supplier => ({
      "customerProviderInfo": {
        "validity_begin_time": getDateStr(supplier.startDate),
        "validity_end_time": getDateStr(supplier.endDate),
        "validity_select_time": getDateStr(supplier.chosenDate),
        "is_fixed": supplier.isFixed,
        "price": supplier.unitPrice,
      },
      "customerProviderInfoDockers": supplier.brokerList.map(broker => ({
        "contacts_info_id": broker.broker,
        "sign": 2
      }))
    }))
    let options = {
      customerProvider: {
        "customer_info_id": this.props.customerId,
        "provider_type": this.state.supplierType,
        "is_signed_msa": this.state.isDeployment
      },
      customerProviderInfos: list,
      latestCustomerProviderMsa: this.getMsa()
    }
    this.props.addSupplier(options)
  }

  update = () => {
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
    let options = {
      customerProvider: {
        "provider_id": this.props.supplierId,
        "customer_info_id": this.props.customerId,
        "provider_type": this.state.supplierType,
        "is_signed_msa": this.state.isDeployment
      },
      customerProviderInfos: list,
      latestCustomerProviderMsa: this.getMsa()
    }
    this.props.updateSupplier(options)
  }

  getMsa() {
    if (!this.state.startDate && !this.state.endDate && !this.state.scanFile) {
      return null
    }
    return {
      "customerProviderMsaVo": {
        "msa_begin_time": this.state.startDate,
        "msa_end_time": this.state.endDate,
      },
      "customerProviderMsaFile": {
        "file_url": this.state.scanFile.fileUrl,
        "file_name": this.state.scanFile.fileName
      }
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

  handleUploaded = (item) => {
    this.setState({scanFile: item[0]})
  }

  componentWillMount() {
    if (this.props.initSupplierInfo) {
      this.setState(this.props.initSupplierInfo)
    }
  }

  componentWillReceiveProps(nextProps: SupplierProps) {
    if (!this.props.addSupplierSuccess && nextProps.addSupplierSuccess) {
      this.props.showSuccess('添加供应商成功！')
      this.props.clearState(CUSTOMER.ADD_SUPPLIER)
    }
    if (!this.props.updateSupplierSuccess && nextProps.updateSupplierSuccess) {
      this.props.showSuccess('更新供应商信息成功！')
      this.props.clearState(CUSTOMER.UPDATE_SUPPLIER)
    }
  }

  render() {
    const contactList = this.props.customerContactData.data || []
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
        <InputGroup className="bb" label="供应商类别" inputType={NECESSARY}>
          <Radio.Group value={this.state.supplierType} onChange={v => this.setState({supplierType: v})}>
            <Radio value="1">优选供应商</Radio>
            <Radio value="2">普通供应商</Radio>
          </Radio.Group>
        </InputGroup>
        <div className="mt15 pb15 bb">供应商信息：</div>
        <div className="bb">
          {
            this.state.supplierList.map((supplier, supplierIndex) => {
              return (
                <FlexDiv key={supplier.id}>
                  <div style={{width: '30px'}}></div>
                  <Part className="bl">
                    <InputGroup className="bb" label="有效期限（!）">
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
                        disabled={supplier.isFixed != '1'}
                        value={supplier.unitPrice}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'unitPrice', v)}
                      />
                    </InputGroup>
                    <InputGroup className="bb" label="对接人信息" inputType={IMPORTANT}>
                      {
                        supplier.brokerList.map((broker, brokerIndex) => {
                          return (
                            <div key={broker.id} className="bb p5">
                              <SelectContact
                                contactId={broker.broker}
                                contactList={contactList}
                                onOpen={() => this.props.fetchContactList(this.props.customerId)}
                                onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'broker', v)}
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
              <AddButton disabled={!this.props.customerId} onClick={this.addSupplier}/>
            </TextAndButton>
          </div>
        </div>

        <div className="bb">
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
              <SingleFile
                file={this.state.scanFile}
                onAdd={file => this.setState({scanFile: file})}
                onClear={() => this.setState({scanFile: null})}
              />
            </LabelAndInput1>
          </InputGroup>

          <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
            <Button className="small" disabled={!this.props.supplierId} onClick={() => this.setState({showMoreMSA: true})}>
              ...查看更多
            </Button>
          </TextAndButton>
        </div>
        {
          !this.props.supplierId && (
            <Save disabled={!this.state.supplierType || !this.state.isDeployment} onClick={this.add}/>
          )
        }
        {
          this.props.supplierId && (
            <Update disabled={!this.state.supplierType || !this.state.isDeployment} onClick={this.update}/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    supplierId: props.supplierId,
    initSupplierInfo: props.initSupplierInfo,
    customerContactData: state.customerContactData,
    msaListInfo: state.msaListInfo
  }
}

export default connect(mapStateToProps, {
  addSupplier, fetchContactList, updateSupplier, fetchMSAList, addMsa, updateMsa
})(addCommonFunction(Supplier))
