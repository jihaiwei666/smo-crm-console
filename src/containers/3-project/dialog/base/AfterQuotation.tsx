/**
 * 报价前
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Input from '../../../../components/form/Input'
import Select1 from 'app-core/common/Select1'
import Radio from '../../../../components/form/radio/Radio'
import TextArea from 'app-core/form/TextArea'
import Button from '../../../../components/button/Button'
import Save from '../../../common/Save'

interface AfterQuotationProps {

}

class AfterQuotation extends React.Component<AfterQuotationProps> {
  state = {
    projectName: '',
    categoryList: [],
    isArrangeBid: null
  }

  render() {
    return (
      <div>
        <LabelAndInput1 label="服务费">

        </LabelAndInput1>
        <LabelAndInput1 label="合同额">

        </LabelAndInput1>
        <LabelAndInput1 label="是否成单">
          <Radio.Group value={this.state.isArrangeBid}>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </LabelAndInput1>


        <LabelAndInput label="预估PM工时" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="预估CRC工时" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="预计介入时间" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="现场竞标时间" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />

        <LabelAndInput1 label="标书语言">
          <Radio.Group value={this.state.isArrangeBid}>
            <Radio value="1">中文</Radio>
            <Radio value="2">English</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 label="竞标PPT语言">
          <Radio.Group value={this.state.isArrangeBid}>
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
        <Save/>
      </div>
    )
  }
}

export default AfterQuotation
