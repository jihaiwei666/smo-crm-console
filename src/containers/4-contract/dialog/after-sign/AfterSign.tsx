/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import {connect} from 'react-redux'
import DatePicker from 'antd/lib/date-picker'
import {Row, Part} from 'app-core/layout/'

import InputGroup from '../../../common/InputGroup'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import {NECESSARY} from '../../../common/Label'
import Input from '../../../../components/form/Input'
import MoneyUnit from '../../../common/MoneyUnit'
import Radio from '../../../../components/form/radio/Radio'

import {serviceTypeOptions} from '../../contract.constant'
import {fetchPartAfterSignInfoFromProject, addAfterSign, updateAfterSign} from '../../contract.action'

interface AfterSignProps {
  projectId: string
  fetchPartAfterSignInfoFromProject: (projectId) => void
  addAfterSign: (options) => void
}

class AfterSign extends React.Component<AfterSignProps> {
  state = {
    serviceTypes: [],
    centerNumber: '',
    enrollmentCount: '',
    servicePeriod: '',
    crcMoneyUnit: '',
    crcMoneyValue: '',
    replacementFee: '',
    taxes: '',
    taxRate: '',
    paymentNode: '',
    payer: '',
    contractSignDate: null,
    takeEffectDate: null,
    endDate: '',

    kpi: null,
  }

  add = () => {
    this.props.addAfterSign({
      "contractAfterSignedVo": {
        "contract_info_id": '',
        "project_indication": '',
        "project_service_type": '',
        "project_center_number": '',
        "project_group_number": '',
        "project_service_stage": '',
        "cost_detail_crc_service_fee_unit": '',
        "cost_detail_crc_service_fee_value": '',
        "cost_detail_pm_service_fee_unit": '',
        "cost_detail_pm_service_fee_value": '',
        "cost_detail_acting_mat_fee": '',
        "cost_detail_taxes_fee": '',
        "cost_detail_taxes_rate": '',
        "payment_node": '',
        "payer": '',
        "contract_award_date": '',
        "effective_date": '',
        "end_date": '',
        "billing_way": '',
        "billing_way_remark": '',
        "center_name": '',
        "synergy_bd": '',
        "research_product": '',
        "test_stage": '',
        "contract_deadline": '',
        "test_phase": '',
        "pm_contract_working_hours": '',
        "crc_contract_working_hours": '',
        "kpi": '',
      }
    })
  }

  componentDidMount() {
    if (this.props.projectId) {
      this.props.fetchPartAfterSignInfoFromProject(this.props.projectId)
    }
  }

  render() {
    return (
      <div>
        <div>
          <InputGroup label="客户模板" inputType={NECESSARY}>
            <LabelAndInput label="适应症"/>
            <LabelAndInput1 label="服务类别">
              <CheckGroup options={serviceTypeOptions} value={this.state.serviceTypes} onChange={v => this.setState({serviceTypes: v})}/>
            </LabelAndInput1>
            <LabelAndInput label="中心数" value={this.state.centerNumber}/>
            <LabelAndInput label="入组例数" value={this.state.enrollmentCount}/>
            <LabelAndInput label="服务周期" value={this.state.servicePeriod}/>
          </InputGroup>
          <div className="tip">关联项目后，项目信息中的部分信息直接复制到合同信息中</div>
        </div>
        <InputGroup label="费用明细" inputType={NECESSARY}>
          <LabelAndInput1 label="CRC服务费">
            <Row>
              <MoneyUnit value={this.state.crcMoneyUnit} onChange={v => this.setState({crcMoneyUnit: v})}/>
              <Input width="150px" value={this.state.crcMoneyValue}/>
            </Row>
          </LabelAndInput1>
          <LabelAndInput label="代垫费" value={this.state.replacementFee}/>
          <LabelAndInput label="税费" value={this.state.taxes}/>
          <LabelAndInput label="税率" value={this.state.taxRate}/>
        </InputGroup>
        <div>
          <LabelAndInput1 label="付款节点" inputType={NECESSARY}>
            <Radio.Group value={this.state.paymentNode}>
              <Radio value="1">按日期</Radio>
              <Radio value="2">按进度</Radio>
            </Radio.Group>
          </LabelAndInput1>
          <div className="tip">先选择付款节点类型，然后逐个添加节点</div>
        </div>

        <LabelAndInput label="合同签署方" inputType={NECESSARY}>

        </LabelAndInput>

        <LabelAndInput label="付款方" inputType={NECESSARY} value={this.state.payer}/>

        <LabelAndInput1 label="合同签署日期">
          <DatePicker value={this.state.contractSignDate}/>
        </LabelAndInput1>
        <LabelAndInput1 label="生效日期">
          <DatePicker value={this.state.takeEffectDate}/>
        </LabelAndInput1>
        <LabelAndInput label="终止日期" inputType={NECESSARY} value={this.state.endDate}/>

        <LabelAndInput1 label="计费方式">
        </LabelAndInput1>

        <LabelAndInput1 label="PM">
        </LabelAndInput1>

        <LabelAndInput label="中心名称" placeholder="请输入，不同中心用“、”隔开"/>
        <LabelAndInput1 label="协同BD">
        </LabelAndInput1>

        <LabelAndInput label="研究产品"/>
        <LabelAndInput label="试验分期"/>
        <LabelAndInput label="合同期限"/>

        <LabelAndInput1 label="试验阶段">
        </LabelAndInput1>
        <LabelAndInput label="PM合同工时"/>
        <LabelAndInput label="CRC合同工时"/>

        <LabelAndInput1 label="KPI">
          <Radio.Group value={this.state.kpi} onChange={v => this.setState({kpi: v})}>
            <Radio value="1">是</Radio>
            <Radio value="0">否</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 label="合同扫描件">
        </LabelAndInput1>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    projectId: props.projectId
  }
}

export default connect(mapStateToProps, {
  fetchPartAfterSignInfoFromProject, addAfterSign, updateAfterSign
})(AfterSign)
