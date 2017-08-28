/**
 * Created by jiangyukun on 2017/8/1.
 */
import React from 'react'
import {connect} from 'react-redux'
import Form from 'app-core/form/Form'

import Input from '../../../../components/form/Input'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import {NECESSARY} from '../../../common/Label'
import Radio from '../../../../components/form/radio/Radio'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import {addBeforeSign, updateBeforeSign} from '../../contract.action'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {CONTRACT} from '../../../../core/constants/types'

interface BeforeSignProps extends CommonFunction {
  contractId?: string
  beforeSignId?: string
  addBeforeSign: (options) => void
  addBeforeSignSuccess: boolean
  initBeforeSign: any
  updateBeforeSign: (options) => void
  updateBeforeSignSuccess: boolean
}

class BeforeSign extends React.Component<BeforeSignProps> {
  state = {
    valid: true,
    contractType: null,
    remark: '',
    templateType: null
  }

  add = () => {
    this.props.addBeforeSign({
      "contract_info_id": this.props.contractId,
      "contract_type": this.state.contractType,
      "contract_type_remark": this.state.remark,
      "contract_template": this.state.templateType,
    })
  }

  update = () => {
    this.props.updateBeforeSign({
      "contract_info_id": this.props.contractId,
      "before_signed_id": this.props.beforeSignId,
      "contract_type": this.state.contractType,
      "contract_type_remark": this.state.remark,
      "contract_template": this.state.templateType,
    })
  }

  checkRemark = () => {
    if (this.state.contractType != '4') {
      this.setState({remark: ''})
    }
  }

  componentWillMount() {
    if (this.props.initBeforeSign) {
      this.setState(this.props.initBeforeSign)
    }
  }

  componentWillReceiveProps(nextProps: BeforeSignProps) {
    if (!this.props.addBeforeSignSuccess && nextProps.addBeforeSignSuccess) {
      this.props.showSuccess('添加签署前成功！')
      this.props.clearState(CONTRACT.ADD_BEFORE_SIGN)
    }
    if (!this.props.updateBeforeSignSuccess && nextProps.updateBeforeSignSuccess) {
      this.props.showSuccess('更新签署前成功！')
      this.props.clearState(CONTRACT.UPDATE_BEFORE_SIGN)
    }
  }

  render() {
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <LabelAndInput1 className="pb5 bb" label="合同类型" inputType={NECESSARY}>
          <Radio.Group
            required={true} name="contractType"
            value={this.state.contractType} onChange={v => this.setState({contractType: v}, this.checkRemark)}
          >
            <Radio value="1">大项目主合同</Radio>
            <Radio value="2">CRC三方协议</Radio>
            <Radio value="3">思默和Site两方协议</Radio>
            <div className="mt5">
              <Radio value="4">其它，请备注：</Radio>
              <Input width="300px" disabled={this.state.contractType != 4}
                     value={this.state.remark} onChange={v => this.setState({remark: v})}/>
            </div>
          </Radio.Group>
        </LabelAndInput1>
        <LabelAndInput1 className="pb5 bb" label="合同模板">
          <Radio.Group value={this.state.templateType} onChange={v => this.setState({templateType: v})}>
            <Radio value="1">思默模板</Radio>
            <Radio value="2">客户模板</Radio>
          </Radio.Group>
        </LabelAndInput1>
        {
          !this.props.beforeSignId && (
            <Save disabled={!this.props.contractId || !this.state.valid} onClick={this.add}/>
          )
        }
        {
          this.props.beforeSignId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    addBeforeSignSuccess: state.contract.addBeforeSignSuccess,
    updateBeforeSignSuccess: state.contract.updateBeforeSignSuccess,
    contractId: props.contractId,
    beforeSignId: props.beforeSignId,
    initBeforeSign: props.initBeforeSign
  }
}

export default connect(mapStateToProps, {
  addBeforeSign, updateBeforeSign
})(addCommonFunction(BeforeSign))
