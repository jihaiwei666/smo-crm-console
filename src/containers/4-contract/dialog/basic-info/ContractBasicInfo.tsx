/**
 * Created by jiangyukun on 2017/7/31.
 */
import React from 'react'
import {connect} from 'react-redux'

import LabelAndInput from '../../../common/LabelAndInput'
import {NECESSARY} from '../../../common/Label'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Select1 from 'app-core/common/Select1'
import Form from 'app-core/form/Form'

import Save from '../../../common/Save'
import Update from '../../../common/Update'
import Input from '../../../../components/form/Input'
import Data from '../../../common/interface/Data'

import CommonFunctionAndRoleCode from '../../../common/interface/CommonFunctionAndRoleCode'
import getCommonFunctionAndRoleCode from '../../../_frameset/hoc/getCommonFunctionAndRoleCode'
import {CONTRACT} from '../../../../core/constants/types'
import {getIsFirstOperation} from '../../contract.helper'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {fetchProjectList, fetchContractCodePrefix, addContract, updateContract} from '../../contract.action'
import {checkHavePermission} from '../../../../core/permission'

interface ContractBasicInfoProps extends CommonFunctionAndRoleCode {
  contractId?: string
  initBaseInfo?: any
  fetchProjectList: () => void
  projectList: Data<any[]>
  fetchContractCodePrefix: (projectId) => void
  fetchCodePrefixSuccess: boolean
  newContractCodePrefix: string
  isFirstOperation: boolean
  addContract: (options) => void
  addContractSuccess: boolean
  updateContract: (options) => void
  updateContractSuccess: boolean
  onProjectIdChange: (projectId) => void
  onContractNameChange: (contractName) => void
  editAuthority: boolean
}

class ContractBasicInfo extends React.Component<ContractBasicInfoProps> {
  static defaultProps = {
    editAuthority: true
  }

  oldContractName = ''
  projectName = ''
  state = {
    valid: true,
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
      "is_first_cooperation": this.state.isFirstOperation
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
      "is_first_cooperation": this.state.isFirstOperation
    })
  }

  componentWillMount() {
    if (this.props.initBaseInfo) {
      this.setState(this.props.initBaseInfo)
      this.oldContractName = this.props.initBaseInfo.contractName
      this.projectName = this.props.initBaseInfo.projectName
    }
  }

  componentDidMount() {
    this.props.fetchProjectList()
  }

  componentWillReceiveProps(nextProps: ContractBasicInfoProps) {
    if (!this.props.fetchCodePrefixSuccess && nextProps.fetchCodePrefixSuccess) {
      this.setState({codePrefix: nextProps.newContractCodePrefix})
      this.setState({isFirstOperation: nextProps.isFirstOperation})
      this.props.clearState(CONTRACT.FETCH_CONTRACT_CODE_PREFIX)
    }
    if (!this.props.addContractSuccess && nextProps.addContractSuccess) {
      this.props.showSuccess('添加合同信息成功！')
      this.props.clearState(CONTRACT.ADD_CONTRACT)
      this.props.onProjectIdChange(this.state.projectId)
      this.props.onContractNameChange(this.state.contractName)
      eventBus.emit(EVENT_NAMES.ADD_CONTRACT_SUCCESS)
    }
    if (!this.props.updateContractSuccess && nextProps.updateContractSuccess) {
      this.props.showSuccess('更新合同信息成功！')
      this.props.clearState(CONTRACT.UPDATE_CONTRACT)
      this.props.onProjectIdChange(this.state.projectId)
      this.props.onContractNameChange(this.state.contractName)
      if (this.oldContractName != this.state.contractName) {
        eventBus.emit(EVENT_NAMES.CONTRACT_NAME_UPDATED)
      }
    }
  }

  render() {
    return (
      <Form className="--module-item" onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority}>
        <div className="input-row">
          <LabelAndInput
            label="合同名称" inputType={NECESSARY}
            required={true} name="contractName"
            value={this.state.contractName} onChange={v => this.setState({contractName: v})}
          />
          <div className="tip">项目名称只能输入汉字、英文、数字、-、（、），项目编码-申办方-项目名称-中心名称</div>
        </div>
        <LabelAndInput1 className="pb10 bb" label="关联项目" inputType={NECESSARY}>
          {
            this.props.editAuthority && (
              <div style={{width: '300px'}}>
                <Select1
                  options={this.props.projectList.data || []}
                  required={true} name="projectId"
                  value={this.state.projectId} onChange={this.handleProjectChange}
                />
              </div>
            )
          }
          {
            !this.props.editAuthority && (
              <div className="p5">{this.projectName}</div>
            )
          }
        </LabelAndInput1>
        <div className="input-row">
          <LabelAndInput1 label="合同编号" inputType={NECESSARY}>
            <Input width="30%" disabled={true} placeholder="选择关联项目后自动产生" className="m5"
                   value={this.state.codePrefix || '暂无项目编号'}/>
            -
            <Input width="20%" className="m5" placeholder="请输入流水号"
                   required={true} name="serialNumber"
                   format={/^\d{3}$/}
                   value={this.state.serialNumber} onChange={v => this.setState({serialNumber: v})}
            />
            -
            <Input width="30%" className="m5" placeholder="请输入协同BD缩写"
                   required={true} name="bdCode"
                   value={this.state.bdCode} onChange={v => this.setState({bdCode: v})}
            />
          </LabelAndInput1>
          <div className="tip">合同编号格式为：项目编号-流水号（3位数字）-协同BD，项目编号关联项目后产生</div>
        </div>
        <div className="input-row">
          {
            this.props.contractId && checkHavePermission(this.props.roleCode) && (
              <LabelAndInput1 label="是否首次合作">
                <Select1 width="250px" options={[{value: '1', text: '是'}, {value: '2', text: '否'}]}
                         value={this.state.isFirstOperation} onChange={v => this.setState({isFirstOperation: v})}
                />
              </LabelAndInput1>
            )
          }
          {
            !(this.props.contractId && checkHavePermission(this.props.roleCode)) && (
              <LabelAndInput label="是否首次合作" disabled={true} placeholder="尚未确定" value={getIsFirstOperation(this.state.isFirstOperation)}/>
            )
          }
          <div className="tip">由系统检测该客户是否有历史合同，不可修改</div>
        </div>

        {
          this.props.editAuthority && this.props.contractId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
        {
          this.props.editAuthority && !this.props.contractId && (
            <Save disabled={!this.state.valid} onClick={this.add}/>
          )
        }
        {
          !this.props.editAuthority && (<div className="m15"></div>)
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.contract,
    projectList: state.contractProjectList,
    contractId: props.contractId,
    onProjectIdChange: props.onProjectIdChange
  }
}

export default connect(mapStateToProps, {
  fetchProjectList, fetchContractCodePrefix, addContract, updateContract
})(getCommonFunctionAndRoleCode(ContractBasicInfo))
