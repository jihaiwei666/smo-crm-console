/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
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

interface AfterSignProps {

}

class AfterSign extends React.Component<AfterSignProps> {
  state = {
    serviceTypes: [],
    crcMoneyUnit: '',
    kpi: null,
  }

  render() {
    return (
      <div>
        <div>
          <InputGroup label="客户模板" inputType={NECESSARY}>
            <LabelAndInput label="适应症"/>
            <LabelAndInput1 label="服务类别">
              <CheckGroup options={[]} value={this.state.serviceTypes} onChange={v => this.setState({})}/>
            </LabelAndInput1>
            <LabelAndInput label="中心数"/>
            <LabelAndInput label="入组例数"/>
            <LabelAndInput label="服务周期"/>
          </InputGroup>
          <div className="tip">关联项目后，项目信息中的部分信息直接复制到合同信息中</div>
        </div>
        <InputGroup label="费用明细" inputType={NECESSARY}>
          <LabelAndInput1 label="CRC服务费">
            <Row>
              <MoneyUnit value={this.state.crcMoneyUnit} onChange={v => this.setState({crcMoneyUnit: v})}/>
              <Input width="150px"/>
            </Row>
          </LabelAndInput1>
          <LabelAndInput label="代垫费"/>
          <LabelAndInput label="税费"/>
          <LabelAndInput label="税率"/>
        </InputGroup>
        <div>
          <LabelAndInput1 label="付款节点" inputType={NECESSARY}>

          </LabelAndInput1>
          <div className="tip">先选择付款节点类型，然后逐个添加节点</div>
        </div>

        <LabelAndInput label="合同签署方" inputType={NECESSARY}>

        </LabelAndInput>

        <LabelAndInput label="付款方" inputType={NECESSARY}/>

        <LabelAndInput1 label="合同签署日期">
          <DatePicker/>
        </LabelAndInput1>
        <LabelAndInput1 label="生效日期">
          <DatePicker/>
        </LabelAndInput1>
        <LabelAndInput1 label="终止日期"/>

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

export default AfterSign
