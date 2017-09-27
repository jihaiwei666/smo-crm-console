/**
 * 报价后
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import {Row} from 'app-core/layout/'
import Form from 'app-core/form/Form'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import MoneyInput from '../../../../components/form/MoneyInput'
import Radio from '../../../../components/form/radio/Radio'
import MoneyUnit from '../../../common/MoneyUnit'
import SingleFile from '../../../common/file/SingleFile'
import DatePicker from '../../../../components/form/DatePicker'
import MonthPicker from '../../../../components/form/MonthPicker'
import MT15 from '../../../../components/layout/MT15'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {PROJECT} from '../../../../core/constants/types'
import {getDateStr, getYearMonth} from '../../../../core/utils/dateUtils'
import {addAfterQuotation, updateAfterQuotation} from '../../project.action'

interface AfterQuotationProps extends CommonFunction {
  projectId?: string
  afterQuotationId?: string
  initAfterQuotation: any
  addAfterQuotation: (options) => void
  addAfterQuotationSuccess: boolean
  newAfterQuotation: any

  updateAfterQuotation: (options) => void
  updateAfterQuotationSuccess: boolean
  editAuthority: boolean
}

class AfterQuotation extends React.Component<AfterQuotationProps> {
  static defaultProps = {
    editAuthority: true
  }

  _priceFile: any
  state = {
    valid: false,

    serviceChargeUnit: '',
    serviceChargeValue: '',
    contractMoneyUnit: '',
    contractMoneyValue: '',

    is_A_Order: null,
    pmWorkingHours: '',
    crcWorkingHours: '',
    involveYearMonth: null,
    bidDate: null,
    bookLanguage: '',
    pptLanguage: '',
    priceFile: null
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
          "intervention_time": getYearMonth(this.state.involveYearMonth),
          "bidding_time": getDateStr(this.state.bidDate),
          "bid_language": this.state.bookLanguage,
          "ppt_language": this.state.pptLanguage,
        },
        "priceFile": this._priceFile.getData()
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
          "intervention_time": getYearMonth(this.state.involveYearMonth),
          "bidding_time": getDateStr(this.state.bidDate),
          "bid_language": this.state.bookLanguage,
          "ppt_language": this.state.pptLanguage,
        },
        "priceFile": this._priceFile.getData()
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
      this.props.showSuccess('添加报价后信息成功！')
      this.props.clearState(PROJECT.ADD_AFTER_QUOTATION)
      this.setState(nextProps.newAfterQuotation)
    }
    if (!this.props.updateAfterQuotationSuccess && nextProps.updateAfterQuotationSuccess) {
      this.props.showSuccess('更新报价后信息成功！')
      this.props.clearState(PROJECT.UPDATE_AFTER_QUOTATION)
    }
  }

  render() {
    return (
      <Form className="--module-item" onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority}>
        <LabelAndInput1 label="服务费" inputType={NECESSARY}>
          <Row>
            <MoneyUnit
              required={true} name="serviceChargeUnit"
              value={this.state.serviceChargeUnit} onChange={v => this.setState({serviceChargeUnit: v})}/>
            <MoneyInput
              width="200px" required={true} name="serviceChargeValue" placeholder="请输入数字"
              value={this.state.serviceChargeValue} onChange={v => this.setState({serviceChargeValue: v})}/>
          </Row>
        </LabelAndInput1>
        <LabelAndInput1 className="bb" label="合同额" inputType={NECESSARY}>
          <Row>
            <MoneyUnit
              required={true} name="contractMoneyUnit"
              value={this.state.contractMoneyUnit} onChange={v => this.setState({contractMoneyUnit: v})}/>
            <MoneyInput
              width="200px" required={true} name="contractMoneyValue" placeholder="请输入数字"
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
        <LabelAndInput1 label="预计介入时间" inputType={IMPORTANT}>
          <MonthPicker
            placeholder="请输入年月"
            value={this.state.involveYearMonth} onChange={v => this.setState({involveYearMonth: v})}
          />
        </LabelAndInput1>
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

        <div className="input-row">
          <LabelAndInput1 label="报价文档">
            <SingleFile
              ref={c => this._priceFile = c}
              file={this.state.priceFile}
              onChange={file => this.setState({priceFile: file})}
              onClear={() => this.setState({priceFile: null})}
              accept="*"
              disabled={!this.props.editAuthority}
            />
          </LabelAndInput1>
          <div className="tip">只需要上传最终版报价，旧版本请删除</div>
        </div>

        {
          this.props.editAuthority && this.props.afterQuotationId && (
            <Update onClick={this.save} disabled={!this.state.valid}/>
          )
        }
        {
          this.props.editAuthority && !this.props.afterQuotationId && (
            <Save disabled={!this.props.projectId || !this.state.valid} onClick={this.save}/>
          )
        }
        {
          !this.props.editAuthority && (<MT15/>)
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    newAfterQuotation: state.project.newAfterQuotation,
    addAfterQuotationSuccess: state.project.addAfterQuotationSuccess,
    updateAfterQuotationSuccess: state.project.updateAfterQuotationSuccess,
    projectId: props.projectId,
    afterQuotationId: props.afterQuotationId,
    initAfterQuotation: props.initAfterQuotation
  }
}

export default connect(mapStateToProps, {
  addAfterQuotation, updateAfterQuotation
})(addCommonFunction(AfterQuotation))
