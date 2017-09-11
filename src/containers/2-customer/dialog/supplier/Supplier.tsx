/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Row, Part} from 'app-core/layout'
import Form from 'app-core/form/Form'

import Button from '../../../../components/button/Button'
import DatePicker from '../../../../components/form/DatePicker'
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
import {EDIT, ADD, UPDATE, default as crud, handleListRemove, handleUpdateCrud} from '../../../../core/crud'
import {CUSTOMER} from '../../../../core/constants/types'
import {addListItem} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'
import {fetchContactList} from '../../customer.action'
import {addSupplier, updateSupplier, fetchLastSupplierDetail} from './supplier.action'
import Index from '../../../common/Index'
import {EVENT_NAMES, default as eventBus} from '../../../../core/event'
import RemoveIcon from '../../../../components/RemoveIcon'
import {handleBrokerListCrud} from './supplier.helper'
import CrudList from '../../../../components/CrudList'

interface SupplierProps extends CustomerState, CommonFunction {
  customerId: string
  initSupplierInfo?: any
  fetchContactList: (customerId: string) => void
  customerContactData: Data<any>
  fetchLastSupplierDetail: (customerId) => void
  lastSupplierDetail: Data<any>
  addSupplier: (options) => void
  updateSupplier: (options) => void
  fetchMSAList: (supplierId: string) => void
  msaListInfo: any[]
  addMsa: (options) => void
  updateMsa: (options) => void
  removeMsa: (msaId) => void
  editAuthority: boolean
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    broker: '',
    crud: crud.ADD
  }
}

function getNextSupplier() {
  return {
    id: id++,
    startDate: null,
    endDate: null,
    chosenDate: null,
    isFixed: '',
    unitPrice: '',
    brokerList: [],
    crud: crud.ADD
  }
}

class Supplier extends React.Component<SupplierProps> {
  static defaultProps = {
    editAuthority: true
  }

  supplierId: ''
  msaId: ''
  _scanFile: any
  state = {
    valid: false,
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
        "sign": crud.ADD
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
        "provider_id": this.supplierId,
        "provider_info_id": supplier.id,
        "validity_begin_time": supplier.startDate,
        "validity_end_time": supplier.endDate,
        "validity_select_time": supplier.chosenDate,
        "is_fixed": supplier.isFixed,
        "price": supplier.unitPrice,
      },
      "customerProviderInfoDockers": handleBrokerListCrud(supplier.brokerList, this.supplierId),
      "sign": supplier.crud == crud.ADD ? ADD : EDIT
    }))
    let options = {
      customerProvider: {
        "provider_id": this.supplierId,
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
    if (this.msaId) {
      return {
        "customerProviderMsaVo": {
          "provider_id": this.supplierId,
          "provider_msa_id": this.msaId,
          "msa_begin_time": this.state.startDate,
          "msa_end_time": this.state.endDate,
          "sign": UPDATE
        },
        "customerProviderMsaFile": this._scanFile.getData()
      }
    }
    return {
      "customerProviderMsaVo": {
        "msa_begin_time": this.state.startDate,
        "msa_end_time": this.state.endDate,
        "sign": ADD
      },
      "customerProviderMsaFile": this._scanFile.getData()
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
    if (stateKey == 'isFixed' && value == '2') {
      this.state.supplierList[supplierIndex]['unitPrice'] = ''
    }
    handleUpdateCrud(this.state.supplierList[supplierIndex])
    this.forceUpdate()
  }

  handleBrokerChange = (supplierIndex, brokerIndex, stateKey, value) => {
    this.state.supplierList[supplierIndex].brokerList[brokerIndex][stateKey] = value
    handleUpdateCrud(this.state.supplierList[supplierIndex].brokerList[brokerIndex])
    this.forceUpdate()
  }

  removeBroker = (supplierIndex, brokerIndex) => {
    handleListRemove(this.state.supplierList[supplierIndex].brokerList, brokerIndex)
    this.forceUpdate()
  }

  componentWillMount() {
    if (this.props.initSupplierInfo) {
      this.supplierId = this.props.initSupplierInfo.supplierId
      this.msaId = this.props.initSupplierInfo.msaId
      this.setState(this.props.initSupplierInfo)
    }
  }

  componentWillReceiveProps(nextProps: SupplierProps) {
    if (!this.props.addSupplierSuccess && nextProps.addSupplierSuccess) {
      this.props.showSuccess('添加供应商成功！')
      this.props.clearState(CUSTOMER.ADD_SUPPLIER)
      this.supplierId = nextProps.newSupplierInfo.supplierId
      this.msaId = nextProps.newSupplierInfo.msaId
      this.props.fetchLastSupplierDetail(this.props.customerId)
      eventBus.emit(EVENT_NAMES.MSA_UPDATE)
    }
    if (!this.props.updateSupplierSuccess && nextProps.updateSupplierSuccess) {
      this.props.showSuccess('更新供应商信息成功！')
      this.props.clearState(CUSTOMER.UPDATE_SUPPLIER)
      this.props.fetchLastSupplierDetail(this.props.customerId)
    }
    if (!this.props.addMsaSuccess && nextProps.addMsaSuccess) {
      this.props.fetchLastSupplierDetail(this.props.customerId)
      eventBus.emit(EVENT_NAMES.MSA_UPDATE)
    }
    if (!this.props.removeMsaSuccess && nextProps.removeMsaSuccess) {
      this.props.fetchLastSupplierDetail(this.props.customerId)
    }
    if (!this.props.lastSupplierDetail.loaded && nextProps.lastSupplierDetail.loaded) {
      this.setState(nextProps.lastSupplierDetail.data)
      this.supplierId = nextProps.lastSupplierDetail.data.supplierId
      this.msaId = nextProps.lastSupplierDetail.data.msaId
    }
  }

  render() {
    const contactList = this.props.customerContactData.data || []
    return (
      <div className="--module-item">
        {
          this.state.showMoreMSA && (
            <LookMSADialog
              supplierId={this.supplierId}
              fetchMSAList={this.props.fetchMSAList}
              msaListInfo={this.props.msaListInfo}
              onExited={() => this.setState({showMoreMSA: false})}
            />
          )
        }
        <Form onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority || !this.props.customerId}>
          <InputGroup className="bb" label="供应商类别" inputType={NECESSARY}>
            <Radio.Group
              required={true} name="supplierType"
              value={this.state.supplierType} onChange={v => this.setState({supplierType: v})}>
              <Radio value="1">优选供应商</Radio>
              <Radio value="2">普通供应商</Radio>
            </Radio.Group>
          </InputGroup>
          <div className="mt15 pb15 bb">供应商信息：</div>
          <div className="bb">
            <CrudList list={this.state.supplierList} renderItem={
              (supplier, supplierIndex) => {
                return (
                  <Row key={supplier.id} className="bb">
                    <Index index={supplierIndex}/>
                    <Part>
                      <InputGroup className="bb" label="有效期限" inputType={IMPORTANT}>
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
                      <InputGroup label="对接人信息" inputType={IMPORTANT}>
                        <CrudList name="brokerList" list={supplier.brokerList} checkItemValid={item => item.broker != ''} renderItem={
                          (broker, brokerIndex) => {
                            return (
                              <div key={broker.id} className="supplier-broker-item">
                                <SelectContact
                                  contactId={broker.broker}
                                  contactList={contactList}
                                  onOpen={() => this.props.fetchContactList(this.props.customerId)}
                                  onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'broker', v)}
                                />
                                <div className="remove-broker-container">
                                  <RemoveIcon onClick={() => this.removeBroker(supplierIndex, brokerIndex)}/>
                                </div>
                              </div>
                            )
                          }
                        }>
                        </CrudList>

                        <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                          <AddButton onClick={() => this.addBroker(supplierIndex)}/>
                        </TextAndButton>
                      </InputGroup>
                    </Part>
                  </Row>
                )
              }
            }/>
            <div>
              <TextAndButton text="点此添加按钮添加一条供应商信息">
                <AddButton disabled={!this.props.customerId || !this.props.editAuthority} onClick={this.addSupplier}/>
              </TextAndButton>
            </div>
          </div>

          <div className="bb">
            <InputGroup label="MSA" inputType={NECESSARY}>
              <LabelAndInput1 label="是否签署">
                <Radio.Group
                  required={true} name="isDeployment"
                  value={this.state.isDeployment} onChange={v => this.setState({isDeployment: v})}>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </Radio.Group>
              </LabelAndInput1>
              <LabelAndInput1 label="起始日期">
                <DatePicker
                  required={true} name="startDate"
                  value={this.state.startDate} onChange={v => this.setState({startDate: v})}/>
              </LabelAndInput1>
              <LabelAndInput1 label="结束日期">
                <DatePicker
                  required={true} name="endDate"
                  value={this.state.endDate} onChange={v => this.setState({endDate: v})}/>
              </LabelAndInput1>
              <LabelAndInput1 label="MSA扫描件">
                <SingleFile
                  ref={c => this._scanFile = c}
                  accept="*"
                  file={this.state.scanFile}
                  onChange={file => this.setState({scanFile: file})}
                  onClear={() => this.setState({scanFile: null})}
                  disabled={!this.props.editAuthority}
                />
              </LabelAndInput1>
            </InputGroup>

            <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
              <Button className="small" disabled={!this.supplierId} onClick={() => this.setState({showMoreMSA: true})}>
                ...查看更多
              </Button>
            </TextAndButton>
          </div>
        </Form>
        {
          !this.supplierId && (
            <Save disabled={!this.props.customerId || !this.state.valid} onClick={this.add}/>
          )
        }
        {
          this.supplierId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
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
    initSupplierInfo: props.initSupplierInfo,
    customerContactData: state.customerContactData,
    msaListInfo: state.msaListInfo,
    lastSupplierDetail: state.lastSupplierDetail
  }
}

export default connect(mapStateToProps, {
  addSupplier, fetchContactList, updateSupplier, fetchLastSupplierDetail
})(addCommonFunction(Supplier))
