/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import {connect} from 'react-redux'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import {NECESSARY} from '../../../common/Label'
import Radio from '../../../../components/form/radio/Radio'
import Save from '../../../common/Save'
import Input from '../../../../components/form/Input'

import {addBeforeSign, updateContract} from '../../contract.action'

interface BeforeSignProps {
  addBeforeSign: (options) => void
  updateContract: (options) => void
}

class BeforeSign extends React.Component<BeforeSignProps> {
  state = {
    contractType: null,
    templateType: null,
    remark: ''
  }

  render() {
    return (
      <div>
        <LabelAndInput1 className="pb5 bb" label="合同类型" inputType={NECESSARY}>
          <Radio.Group value={this.state.contractType} onChange={v => this.setState({contractType: v})}>
            <Radio value="1">大项目主合同</Radio>
            <Radio value="2">CRC三方协议</Radio>
            <Radio value="3">思默和Site两方协议</Radio>
            <div className="mt5">
              <Radio value="4">其它，请备注：</Radio>
              <Input width="300px" disabled={this.state.contractType != 4}
                     value={this.state.remark} onChange={e => this.setState({remark: e.target.value})}/>
            </div>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 className="pb5 bb" label="合同模板">
          <Radio.Group value={this.state.templateType} onChange={v => this.setState({templateType: v})}>
            <Radio value="1">思默模板</Radio>
            <Radio value="2">客户模板</Radio>
          </Radio.Group>
        </LabelAndInput1>
        <Save/>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {}
}

export default connect(mapStateToProps, {
  addBeforeSign, updateContract
})(BeforeSign)
