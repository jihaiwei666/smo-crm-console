/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'

import LabelAndInput from '../../../common/LabelAndInput'
import {NECESSARY} from '../../../common/Label'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Select1 from 'app-core/common/Select1'

import Save from '../../../common/Save'
import Update from '../../../common/Update'
import Input from '../../../../components/form/Input'
import Data from '../../../common/interface/Data'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {fetchProjectList, fetchContractCodePrefix, addContract, updateContract} from '../../contract.action'
import {CONTRACT} from '../../../../core/constants/types'

interface AddContractBasicInfoProps extends CommonFunction {
  contractId?: string
  fetchProjectList: () => void
  projectList: Data<any[]>
  fetchContractCodePrefix: (projectId) => void
  fetchCodePrefixSuccess: boolean
  newContractCodePrefix: string
  isFirstOperation: boolean
  addContract: (options) => void
  updateContract: (options) => void
}

class AddContractBasicInfo extends React.Component<AddContractBasicInfoProps> {
  state = {
    contractName: '',
    codePrefix: '',
    isFirstOperation: '',
    serialNumber: '',
    bdCode: '',
    projectId: '',
  }

  handleProjectChange = (v) => {
    this.props.fetchContractCodePrefix(v)
    this.setState({projectId: v})
  }

  add = () => {
    this.props.addContract({
      "contract_name": this.state.contractName,
      "contract_project_info_code": this.state.codePrefix,
      "contract_serial_code": this.state.serialNumber,
      "contract_bd_code": this.state.bdCode,
      "project_info_id": this.state.projectId,
    })
  }

  update = () => {
    this.props.updateContract({
      "contract_info_id": this.props.contractId,
      "contract_name": this.state.contractName,
      "contract_project_info_code": this.state.codePrefix,
      "contract_serial_code": this.state.serialNumber,
      "contract_bd_code": this.state.bdCode,
      "project_info_id": this.state.projectId,
    })
  }

  componentDidMount() {
    this.props.fetchProjectList()
  }

  componentWillReceiveProps(nextProps: AddContractBasicInfoProps) {
    if (!this.props.fetchCodePrefixSuccess && nextProps.fetchCodePrefixSuccess) {
      this.setState({codePrefix: nextProps.newContractCodePrefix})
      this.setState({isFirstOperation: nextProps.isFirstOperation ? '是' : '否'})
      this.props.clearState(CONTRACT.FETCH_CONTRACT_CODE_PREFIX)
    }
  }

  render() {
    return (
      <div>
        <div className="bb">
          <LabelAndInput label="合同名称" inputType={NECESSARY}
                         value={this.state.contractName} onChange={v => this.setState({contractName: v})}
          />
          <div className="tip">项目名称只能输入汉字、英文、数字、-、（、），项目编码-申办方-项目名称-中心名称</div>
        </div>
        <LabelAndInput1 className="pb10 bb" label="关联项目" inputType={NECESSARY}>
          <Select1 options={this.props.projectList.data || []}
                   value={this.state.projectId} onChange={this.handleProjectChange}
          />
        </LabelAndInput1>
        <div className="bb">
          <LabelAndInput1 label="合同编号" inputType={NECESSARY}>
            <Input width="30%" disabled={true} placeholder="选择关联项目后自动产生" className="m5"
                   value={this.state.codePrefix || '无项目编号'}/>
            -
            <Input width="20%" className="m5" placeholder="请输入流水号"
                   value={this.state.serialNumber} onChange={e => this.setState({serialNumber: e.target.value})}
            />
            -
            <Input width="30%" className="m5" placeholder="请输入协同BD缩写"
                   value={this.state.bdCode} onChange={e => this.setState({bdCode: e.target.value})}
            />
          </LabelAndInput1>
          <div className="tip">合同编号格式为：项目编号-流水号（3位数字）-协同BD，项目编号关联项目后产生</div>
        </div>
        <div className="bb">
          <LabelAndInput label="是否首次合作" disabled={true} placeholder="尚未确定" value={this.state.isFirstOperation}/>
          <div className="tip">由系统检测该客户是否有历史合同，不可修改</div>
        </div>

        {
          this.props.contractId && (
            <Update onClick={this.update}/>
          )
        }
        {
          !this.props.contractId && (
            <Save onClick={this.add}/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.contract,
    projectList: state.contractProjectList,
    contractId: props.contractId
  }
}

export default connect(mapStateToProps, {
  fetchProjectList, fetchContractCodePrefix, addContract, updateContract
})(addCommonFunction(AddContractBasicInfo))
