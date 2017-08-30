/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Row} from 'app-core/layout/'
import Select1 from 'app-core/common/Select1'
import Form from 'app-core/form/Form'

import DatePicker from '../../../../components/form/DatePicker'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import Input from '../../../../components/form/Input'
import MoneyInput from '../../../../components/form/MoneyInput'
import MoneyUnit from '../../../common/MoneyUnit'
import Radio from '../../../../components/form/radio/Radio'
import NodeDate from './NodeDate'
import Progress from './Progress'
import ContractSignatory from './ContractSignatory'
import PM from './PM'
import CoordinateBD from './CoordinateBD'
import Attachment from '../../../../components/attachment/Attachment'
import TextAndButton from '../../../common/TextAndButton'
import Button from '../../../../components/button/Button'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import Data from '../../../common/interface/Data'
import {serviceTypeOptions, trailPhaseOptions} from '../../contract.constant'
import {CONTRACT} from '../../../../core/constants/types'
import regex from '../../../../core/constants/regex'
import {notEmpty, isEmpty} from '../../../../core/utils/common'
import {fetchClientInfoFromProject, addAfterSign, updateAfterSign} from '../../contract.action'

interface AfterSignProps extends CommonFunction {
  contractId?: string
  projectId?: string
  afterSignId?: string
  initAfterSign: any
  fetchClientInfoFromProject: (projectId) => void
  partClientInfo: Data<any>
  addAfterSign: (options) => void
  addAfterSignSuccess: boolean
  newAfterSign: Data<any>
  updateAfterSign: (options) => void
  updateAfterSignSuccess: boolean
}

class AfterSign extends React.Component<AfterSignProps> {
  _nodeData: any
  _progress: any
  _signatoryList: any
  _pmList: any
  _bdList: any
  _attachment: any
  initNodeDateList = []
  initProgressList = []
  state = {
    valid: true,

    indication: '',
    serviceTypes: [],
    centerNumber: '',
    enrollmentCount: '',
    servicePeriod: '',
    crcMoneyUnit: '',
    crcMoneyValue: '',
    pmServeFeeUnit: '',
    pmServeFeeValue: '',
    replacementFee: '',
    taxes: '',
    taxRate: '',
    paymentNode: '',
    payer: '',
    contractSignDate: null,
    takeEffectDate: null,
    endDate: '',
    chargingType: '',
    remark: '',
    centerName: '',
    researchProduct: '',
    trailPeriod: '',
    contractDeadLine: '',
    trailPhase: '',
    pmWorkingHours: '',
    crcWorkingHours: '',
    kpi: null,

    nodeDateList: [],
    progressList: [],
    signatoryList: [],
    pmList: [],
    bdList: [],
    attachmentList: []
  }

  add = () => {
    this.props.addAfterSign({
      "contractAfterSignedVo": {
        "contract_info_id": this.props.contractId,
        "project_indication": this.state.indication,
        "project_service_type": this.state.serviceTypes.join(','),
        "project_center_number": this.state.centerNumber,
        "project_group_number": this.state.enrollmentCount,
        "project_service_stage": this.state.servicePeriod,
        "cost_detail_crc_service_fee_unit": this.state.crcMoneyUnit,
        "cost_detail_crc_service_fee_value": this.state.crcMoneyValue,
        "cost_detail_pm_service_fee_unit": this.state.pmServeFeeUnit,
        "cost_detail_pm_service_fee_value": this.state.pmServeFeeValue,
        "cost_detail_acting_mat_fee": this.state.replacementFee,
        "cost_detail_taxes_fee": this.state.taxes,
        "cost_detail_taxes_rate": this.state.taxRate,
        "payment_node": this.state.paymentNode,
        "payer": this.state.payer,
        "contract_award_date": this.state.contractSignDate,
        "effective_date": this.state.takeEffectDate,
        "end_date": this.state.endDate,
        "billing_way": this.state.chargingType,
        "billing_way_remark": this.state.remark,
        "center_name": this.state.centerName,
        "research_product": this.state.researchProduct,
        "test_stage": this.state.trailPeriod,
        "contract_deadline": this.state.contractDeadLine,
        "test_phase": this.state.trailPhase,
        "pm_contract_working_hours": this.state.pmWorkingHours,
        "crc_contract_working_hours": this.state.crcWorkingHours,
        "kpi": this.state.kpi,
      },
      "contractSignedList": this._signatoryList.getData(),
      "pmList": this._pmList.getData(),
      "bdList": this._bdList.getData(),
      "fileList": this._attachment.getData(),
      "paymentNodeList": this._getPaymentNode()
    })
  }

  update = () => {
    this.props.updateAfterSign({
      "contractAfterSignedVo": {
        "after_signed_id": this.props.afterSignId,
        "contract_info_id": this.props.contractId,
        "project_indication": this.state.indication,
        "project_service_type": this.state.serviceTypes.join(','),
        "project_center_number": this.state.centerNumber,
        "project_group_number": this.state.enrollmentCount,
        "project_service_stage": this.state.servicePeriod,
        "cost_detail_crc_service_fee_unit": this.state.crcMoneyUnit,
        "cost_detail_crc_service_fee_value": this.state.crcMoneyValue,
        "cost_detail_pm_service_fee_unit": this.state.pmServeFeeUnit,
        "cost_detail_pm_service_fee_value": this.state.pmServeFeeValue,
        "cost_detail_acting_mat_fee": this.state.replacementFee,
        "cost_detail_taxes_fee": this.state.taxes,
        "cost_detail_taxes_rate": this.state.taxRate,
        "payment_node": this.state.paymentNode,
        "payer": this.state.payer,
        "contract_award_date": this.state.contractSignDate,
        "effective_date": this.state.takeEffectDate,
        "end_date": this.state.endDate,
        "billing_way": this.state.chargingType,
        "billing_way_remark": this.state.remark,
        "center_name": this.state.centerName,
        "research_product": this.state.researchProduct,
        "test_stage": this.state.trailPeriod,
        "contract_deadline": this.state.contractDeadLine,
        "test_phase": this.state.trailPhase,
        "pm_contract_working_hours": this.state.pmWorkingHours,
        "crc_contract_working_hours": this.state.crcWorkingHours,
        "kpi": this.state.kpi,
      },
      "contractSignedList": this._signatoryList.getData(),
      "pmList": this._pmList.getData(),
      "bdList": this._bdList.getData(),
      "fileList": this._attachment.getData(),
      "paymentNodeList": this._getPaymentNode()
    })
  }

  _getPaymentNode() {
    if (this.state.paymentNode == '1') {
      return this._nodeData.getData()
    } else {
      return this._progress.getData()
    }
  }

  checkRemark = () => {
    if (this.state.chargingType != '5') {
      this.setState({remark: ''})
    }
  }

  handlePaymentNodeChange = (v) => {
    this.setState({paymentNode: v})
    if (v == '1') {
      this.setState({progressList: this.initProgressList})
    } else if (v == '2') {
      this.setState({nodeDateList: this.initNodeDateList})
    }
  }

  componentWillMount() {
    if (this.props.initAfterSign) {
      this.initNodeDateList = this.props.initAfterSign.nodeDateList
      this.initProgressList = this.props.initAfterSign.progressList
      this.setState(this.props.initAfterSign)
    }
  }

  componentWillReceiveProps(nextProps: AfterSignProps) {
    if (!this.props.addAfterSignSuccess && nextProps.addAfterSignSuccess) {
      this.props.showSuccess('添加签署后成功！')
      this.props.clearState(CONTRACT.ADD_AFTER_SIGN)
      this.setState(nextProps.newAfterSign)
    }
    if (!this.props.updateAfterSignSuccess && nextProps.updateAfterSignSuccess) {
      this.props.showSuccess('更新签署后成功！')
      this.props.clearState(CONTRACT.UPDATE_AFTER_SIGN)
    }
    if (!this.props.partClientInfo.loaded && nextProps.partClientInfo.loaded) {
      const {indication, serviceTypes, centerNumber, enrollmentCount} = nextProps.partClientInfo.data
      if (notEmpty(indication) && isEmpty(this.state.indication)) {
        this.setState({indication})
      }
      if (this.state.serviceTypes.length == 0) {
        this.setState({serviceTypes})
      }
      if (notEmpty(centerNumber) && isEmpty(this.state.centerNumber)) {
        this.setState({centerNumber})
      }
      if (notEmpty(enrollmentCount) && isEmpty(this.state.enrollmentCount)) {
        this.setState({enrollmentCount})
      }
    }
  }

  render() {
    console.log(this.state.attachmentList)
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <div className="bb">
          <InputGroup label="客户模板" inputType={NECESSARY}>
            <LabelAndInput
              label="适应症" required={true} name="indication"
              value={this.state.indication} onChange={v => this.setState({indication: v})}
            />
            <LabelAndInput1 label="服务类别">
              <CheckGroup
                options={serviceTypeOptions}
                value={this.state.serviceTypes} onChange={v => this.setState({serviceTypes: v})}
              />
            </LabelAndInput1>
            <LabelAndInput
              label="中心数" required={true} name="centerNumber"
              format={regex.INTEGER}
              value={this.state.centerNumber} onChange={v => this.setState({centerNumber: v})}
            />
            <LabelAndInput
              label="入组例数" required={true} name="enrollmentCount"
              format={regex.INTEGER}
              value={this.state.enrollmentCount} onChange={v => this.setState({enrollmentCount: v})}
            />
            <LabelAndInput
              label="服务周期" required={true} name="servicePeriod"
              value={this.state.servicePeriod} onChange={v => this.setState({servicePeriod: v})}
            />
          </InputGroup>
          <TextAndButton text="关联项目后，项目信息中的部分信息直接复制到合同信息中">
            <Button className="small default"
                    disabled={!this.props.projectId}
                    onClick={() => this.props.fetchClientInfoFromProject(this.props.projectId)}>
              从项目中复制
            </Button>
          </TextAndButton>
        </div>
        <InputGroup className="bb" label="费用明细" inputType={NECESSARY}>
          <LabelAndInput1 label="CRC服务费">
            <Row>
              <MoneyUnit
                required={true} name="crcMoneyUnit"
                value={this.state.crcMoneyUnit} onChange={v => this.setState({crcMoneyUnit: v})}/>
              <MoneyInput
                width="150px" required={true} name="crcMoneyValue"
                value={this.state.crcMoneyValue} onChange={v => this.setState({crcMoneyValue: v})}
              />
            </Row>
          </LabelAndInput1>
          <LabelAndInput1 label="PM服务费">
            <Row>
              <MoneyUnit
                required={true} name="pmServeFeeUnit"
                value={this.state.pmServeFeeUnit} onChange={v => this.setState({pmServeFeeUnit: v})}/>
              <MoneyInput
                width="150px" required={true} name="pmServeFeeValue"
                value={this.state.pmServeFeeValue} onChange={v => this.setState({pmServeFeeValue: v})}
              />
            </Row>
          </LabelAndInput1>
          <LabelAndInput label="代垫费" value={this.state.replacementFee} onChange={v => this.setState({replacementFee: v})}/>
          <LabelAndInput label="税费" format={regex.INTEGER} value={this.state.taxes} onChange={v => this.setState({taxes: v})}/>
          <LabelAndInput label="税率" value={this.state.taxRate} onChange={v => this.setState({taxRate: v})}/>
        </InputGroup>
        <div className="pb5 bb">
          <InputGroup label="付款节点" inputType={NECESSARY}>
            <Radio.Group
              required={true} name="paymentNode"
              value={this.state.paymentNode} onChange={this.handlePaymentNodeChange}
            >
              <Radio value="1">按日期</Radio>
              <Radio value="2">按进度</Radio>
            </Radio.Group>
            {
              this.state.paymentNode == '1' && (
                <NodeDate
                  ref={c => this._nodeData = c}
                  required={true}
                  parentId={this.props.afterSignId}
                  list={this.state.nodeDateList} onChange={list => this.setState({nodeDateList: list})}
                />
              )
            }
            {
              this.state.paymentNode == '2' && (
                <Progress
                  ref={c => this._progress = c}
                  required={true}
                  parentId={this.props.afterSignId}
                  showAdd={true} list={this.state.progressList} onChange={list => this.setState({progressList: list})}/>
              )
            }
          </InputGroup>
          <div className="tip">先选择付款节点类型，然后逐个添加节点</div>
        </div>

        <LabelAndInput1 className="bb" label="合同签署方" inputType={NECESSARY}>
          <ContractSignatory
            ref={c => this._signatoryList = c}
            parentId={this.props.afterSignId}
            required={true}
            list={this.state.signatoryList} onChange={list => this.setState({signatoryList: list})}/>
        </LabelAndInput1>

        <LabelAndInput
          className="bb" label="付款方" inputType={NECESSARY}
          required={true} name="payer"
          value={this.state.payer} onChange={v => this.setState({payer: v})}
        />

        <LabelAndInput1 className="bb" label="合同签署日期" inputType={NECESSARY}>
          <DatePicker
            required={true} name="contractSignDate"
            value={this.state.contractSignDate} onChange={v => this.setState({contractSignDate: v})}
          />
        </LabelAndInput1>
        <LabelAndInput1 className="bb" label="生效日期" inputType={NECESSARY}>
          <DatePicker
            required={true} name="takeEffectDate"
            value={this.state.takeEffectDate} onChange={v => this.setState({takeEffectDate: v})}
          />
        </LabelAndInput1>
        <LabelAndInput
          className="bb" label="终止日期" inputType={NECESSARY}
          required={true} name="endDate"
          value={this.state.endDate} onChange={v => this.setState({endDate: v})}
        />

        <LabelAndInput1 label="计费方式" inputType={NECESSARY} className="bb">
          <Radio.Group
            required={true} name="chargingType"
            value={this.state.chargingType} onChange={v => this.setState({chargingType: v}, this.checkRemark)}>
            <div className="pb5 mb5 bb">
              <Radio value="1">按例</Radio>
              <Radio value="2">按访视</Radio>
              <Radio value="3">按FTE</Radio>
              <Radio value="4">按Task</Radio>
            </div>
            <div>
              <Radio value="5">其它，请备注：</Radio>
              <Input
                width="250px" disabled={this.state.chargingType != '5'}
                value={this.state.remark} onChange={v => this.setState({remark: v})}
              />
            </div>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput1 className="bb" label="PM" inputType={IMPORTANT}>
          <PM
            ref={c => this._pmList = c}
            parentId={this.props.afterSignId}
            list={this.state.pmList} onChange={list => this.setState({pmList: list})}/>
        </LabelAndInput1>

        <LabelAndInput
          className="bb" label="中心名称" inputType={IMPORTANT} placeholder="请输入，不同中心用“、”隔开"
          value={this.state.centerName} onChange={v => this.setState({centerName: v})}
        />
        <LabelAndInput1 className="bb" label="协同BD" inputType={IMPORTANT}>
          <CoordinateBD
            ref={c => this._bdList = c}
            parentId={this.props.afterSignId}
            list={this.state.bdList} onChange={list => this.setState({bdList: list})}/>
        </LabelAndInput1>

        <LabelAndInput
          className="bb" label="研究产品"
          value={this.state.researchProduct} onChange={v => this.setState({researchProduct: v})}
        />
        <LabelAndInput
          className="bb" label="试验分期"
          value={this.state.trailPeriod} onChange={v => this.setState({trailPeriod: v})}
        />
        <LabelAndInput
          className="bb" label="合同期限"
          value={this.state.contractDeadLine} onChange={v => this.setState({contractDeadLine: v})}
        />

        <LabelAndInput1 className="bb" label="试验阶段" inputType={IMPORTANT}>
          <div style={{width: '250px'}}>
            <Select1 options={trailPhaseOptions} value={this.state.trailPhase} onChange={v => this.setState({trailPhase: v})}/>
          </div>
        </LabelAndInput1>
        <LabelAndInput
          className="bb" label="PM合同工时" inputType={IMPORTANT}
          value={this.state.pmWorkingHours} onChange={v => this.setState({pmWorkingHours: v})}
        />
        <LabelAndInput
          className="bb" label="CRC合同工时" inputType={IMPORTANT}
          value={this.state.crcWorkingHours} onChange={v => this.setState({crcWorkingHours: v})}
        />

        <LabelAndInput1 className="bb" label="KPI" inputType={IMPORTANT}>
          <Radio.Group value={this.state.kpi} onChange={v => this.setState({kpi: v})}>
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <div className="bb">
          <div className="mt5 mb5">合同扫描件</div>
          <div>
            <Attachment
              ref={c => this._attachment = c} title="添加扫描件"
              fileList={this.state.attachmentList} onChange={v => this.setState({attachmentList: v})}/>
          </div>
        </div>

        {
          this.props.afterSignId && (
            <Update disabled={!this.state.valid || !notEmpty(this.state.paymentNode)} onClick={this.update}/>
          )
        }
        {
          !this.props.afterSignId && (
            <Save disabled={!this.props.contractId || !this.state.valid || !notEmpty(this.state.paymentNode)} onClick={this.add}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    addAfterSignSuccess: state.contract.addAfterSignSuccess,
    updateAfterSignSuccess: state.contract.updateAfterSignSuccess,
    newAfterSign: state.newAfterSign,
    contractId: props.contractId,
    projectId: props.projectId,
    afterSignId: props.afterSignId,
    initAfterSign: props.initAfterSign,
    partClientInfo: state.partClientInfo
  }
}

export default connect(mapStateToProps, {
  fetchClientInfoFromProject, addAfterSign, updateAfterSign
})(addCommonFunction(AfterSign))
