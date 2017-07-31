/**
 * 报价后
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {Row, Part} from 'app-core/layout/'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Input from '../../../../components/form/Input'
import Select1 from 'app-core/common/Select1'
import Radio from '../../../../components/form/radio/Radio'
import Button from '../../../../components/button/Button'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import {MONEY_UNIT} from '../../project.constant'
import {addAfterQuotation, updateAfterQuotation} from '../../project.action'
import {getDateStr} from '../../../../core/utils/dateUtils'

interface AfterQuotationProps {
  projectId?: string
  afterQuotationId?: string
  addAfterQuotation: (options) => void
  updateAfterQuotation: (options) => void
}

class AfterQuotation extends React.Component<AfterQuotationProps> {
  state = {
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
      this.props.updateAfterQuotation({})
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

  render() {
    return (
      <div>
        <LabelAndInput1 label="服务费">
          <Row>
            <div style={{width: '70px', marginRight: '15px'}}>
              <Select1
                className="small" options={MONEY_UNIT}
                value={this.state.serviceChargeUnit}
                onChange={v => this.setState({serviceChargeUnit: v})}
              />
            </div>
            <Part>
              <Input value={this.state.serviceChargeValue} onChange={e => this.setState({serviceChargeValue: e.target.value})}/>
            </Part>
          </Row>
        </LabelAndInput1>
        <LabelAndInput1 label="合同额">
          <Row>
            <div style={{width: '70px', marginRight: '15px'}}>
              <Select1 className="small" options={MONEY_UNIT} value={this.state.contractMoneyUnit} onChange={v => this.setState({contractMoneyUnit: v})}/>
            </div>
            <Part>
              <Input value={this.state.contractMoneyValue} onChange={e => this.setState({contractMoneyValue: e.target.value})}/>
            </Part>
          </Row>
        </LabelAndInput1>
        <LabelAndInput1 label="是否成单">
          <Radio.Group value={this.state.is_A_Order} onChange={v => this.setState({is_A_Order: v})}>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput label="预估PM工时" inputType={NECESSARY}
                       value={this.state.pmWorkingHours} onChange={v => this.setState({pmWorkingHours: v})}
        />
        <LabelAndInput label="预估CRC工时" inputType={NECESSARY}
                       value={this.state.crcWorkingHours} onChange={v => this.setState({crcWorkingHours: v})}
        />
        <LabelAndInput label="预计介入时间" inputType={NECESSARY}
                       value={this.state.involveYearMonth} onChange={v => this.setState({involveYearMonth: v})}
        />
        <LabelAndInput1 label="现场竞标时间" inputType={NECESSARY}>
          <DatePicker
            value={this.state.bidDate} onChange={v => this.setState({bidDate: v})}
          />
        </LabelAndInput1>

        <LabelAndInput1 label="标书语言">
          <Radio.Group value={this.state.bookLanguage} onChange={v => this.setState({bookLanguage: v})}>
            <Radio value="1">中文</Radio>
            <Radio value="2">English</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 label="竞标PPT语言">
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
            <Update onClick={this.save}/>
          )
        }
        {
          !this.props.afterQuotationId && (
            <Save disabled={!this.props.projectId} onClick={this.save}/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    projectId: props.projectId,
  }
}

export default connect(mapStateToProps, {
  addAfterQuotation, updateAfterQuotation
})(AfterQuotation)
