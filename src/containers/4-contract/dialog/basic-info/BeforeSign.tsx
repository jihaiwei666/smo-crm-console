/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import {NECESSARY} from '../../../common/Label'
import Radio from '../../../../components/form/radio/Radio'
import Save from '../../../common/Save'

interface BeforeSignProps {

}

class BeforeSign extends React.Component<BeforeSignProps> {
  state = {
    templateType: null
  }

  render() {
    return (
      <div>
        <LabelAndInput1 className="pb5 bb" label="合同类型" inputType={NECESSARY}/>
        <LabelAndInput1 className="pb5 bb" label="合同模板">
          <Radio.Group value={this.state.templateType}>
            <Radio value="1">思默模板</Radio>
            <Radio value="2">客户模板</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <Save/>
      </div>
    )
  }
}

export default BeforeSign
