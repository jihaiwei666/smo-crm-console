/**
 * 报价后
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {Row, Part} from 'app-core/layout/'
import Form from 'app-core/form/Form'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Input from '../../../../components/form/Input'
import Radio from '../../../../components/form/radio/Radio'
import Button from '../../../../components/button/Button'
import MoneyUnit from '../../../common/MoneyUnit'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import {addAfterQuotation, updateAfterQuotation} from '../../project.action'
import {getDateStr} from '../../../../core/utils/dateUtils'
import ProjectState from '../../ProjectState'

interface AfterQuotationProps extends ProjectState {
  projectId?: string
  afterQuotationId?: string
  addAfterQuotation: (options) => void

  initAfterQuotation: any
  updateAfterQuotation: (options) => void
}

class AfterQuotation extends React.Component<AfterQuotationProps> {
  state = {
    valid: false,

    serviceChargeUnit: '',
    serviceChargeValue: '',
    contractMoneyUnit: '',
    contractMoneyValue: '',

    is_A_Order: null,
    pmWorkingHours: '',
    crcWorkingHours: '',
    involveYearMonth: '',
    bidDate: null,
    bookLanguage: '',
    pptLanguage: '',

  }

  save = () => {
    if (this.props.afterQuotationId) {
      this.props.updateAfterQuotation({
        "projectAfterOffer": {
          "after_offer_id": this.props.afterQuotationId,
          "project_info_id": this.props.projectId,
          "service_charge_unit": this.state.serviceChargeUnit,
          "service_charge_value": this.state.serviceChargeValue,
          "contract_unit": this.state.contractMoneyUnit,
          "contract_value": this.state.contractMoneyValue,
          "is_success_order": this.state.is_A_Order,
          "pm_working_hours": this.state.pmWorkingHours,
          "crc_working_hours": this.state.crcWorkingHours,
          "intervention_time": this.state.involveYearMonth,
          "bidding_time": getDateStr(this.state.bidDate),
          "bid_language": this.state.bookLanguage,
          "ppt_language": this.state.pptLanguage,
        },
        "priceFiles": []
      })
    } else {
      this.props.addAfterQuotation({
        "projectAfterOffer": {
          "project_info_id": this.props.projectId,
          "service_charge_unit": this.state.serviceChargeUnit,
          "service_charge_value": this.state.serviceChargeValue,
          "contract_unit": this.state.contractMoneyUnit,
          "contract_value": this.state.contractMoneyValue,
          "is_success_order": this.state.is_A_Order,
          "pm_working_hours": this.state.pmWorkingHours,
          "crc_working_hours": this.state.crcWorkingHours,
          "intervention_time": this.state.involveYearMonth,
          "bidding_time": getDateStr(this.state.bidDate),
          "bid_language": this.state.bookLanguage,
          "ppt_language": this.state.pptLanguage,
        },
        "priceFiles": []
      })
    }
  }

  componentWillMount() {
    if (this.props.initAfterQuotation) {
      this.setState(this.props.initAfterQuotation)
    }
  }

  componentWillReceiveProps(nextProps: AfterQuotationProps) {
    if (!this.props.addAfterQuotationSuccess && nextProps.addAfterQuotationSuccess) {
      this.setState(nextProps.newAfterQuotation)
    }
  }

  render() {
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <LabelAndInput1 label="服务费" inputType={NECESSARY}>
          <Row>
            <MoneyUnit
              required={true} name="serviceChargeUnit"
              value={this.state.serviceChargeUnit} onChange={v => this.setState({serviceChargeUnit: v})}/>
            <Input
              width="200px" required={true} name="serviceChargeValue"
              value={this.state.serviceChargeValue} onChange={v => this.setState({serviceChargeValue: v})}/>
          </Row>
        </LabelAndInput1>
        <LabelAndInput1 className="bb" label="合同额" inputType={NECESSARY}>
          <Row>
            <MoneyUnit
              required={true} name="contractMoneyUnit"
              value={this.state.contractMoneyUnit} onChange={v => this.setState({contractMoneyUnit: v})}/>
            <Input
              width="200px" required={true} name="contractMoneyValue"
              value={this.state.contractMoneyValue} onChange={v => this.setState({contractMoneyValue: v})}/>
          </Row>
        </LabelAndInput1>
        <LabelAndInput1 className="bb" label="是否成单" inputType={IMPORTANT}>
          <Radio.Group value={this.state.is_A_Order} onChange={v => this.setState({is_A_Order: v})}>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput label="预估PM工时" inputType={IMPORTANT}
                       value={this.state.pmWorkingHours} onChange={v => this.setState({pmWorkingHours: v})}
        />
        <LabelAndInput label="预估CRC工时" inputType={IMPORTANT}
                       value={this.state.crcWorkingHours} onChange={v => this.setState({crcWorkingHours: v})}
        />
        <LabelAndInput label="预计介入时间" inputType={IMPORTANT}
                       value={this.state.involveYearMonth} onChange={v => this.setState({involveYearMonth: v})}
        />
        <LabelAndInput1 className="bb" label="现场竞标时间">
          <DatePicker
            value={this.state.bidDate} onChange={v => this.setState({bidDate: v})}
          />
        </LabelAndInput1>

        <LabelAndInput1 className="bb" label="标书语言">
          <Radio.Group value={this.state.bookLanguage} onChange={v => this.setState({bookLanguage: v})}>
            <Radio value="1">中文</Radio>
            <Radio value="2">English</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 className="bb" label="竞标PPT语言">
          <Radio.Group value={this.state.pptLanguage} onChange={v => this.setState({pptLanguage: v})}>
            <Radio value="1">中文</Radio>
            <Radio value="2">English</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <div className="bb">
          <LabelAndInput1 label="报价文档">
            <Button>上传</Button>
          </LabelAndInput1>
          <div className="tip">只需要上传最终版报价，旧版本请删除</div>
        </div>

        {
          this.props.afterQuotationId && (
            <Update onClick={this.save} disabled={!this.state.valid}/>
          )
        }
        {
          !this.props.afterQuotationId && (
            <Save disabled={!this.props.projectId || !this.state.valid} onClick={this.save}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.project,
    projectId: props.projectId,
    afterQuotationId: props.afterQuotationId,
    initAfterQuotation: props.initAfterQuotation
  }
}

export default connect(mapStateToProps, {
  addAfterQuotation, updateAfterQuotation
})(AfterQuotation)
