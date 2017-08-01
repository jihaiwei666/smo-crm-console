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
import Input from '../../../../components/form/Input'
import Data from '../../../common/interface/Data'

import {fetchProjectList, fetchContractCodePrefix} from '../../contract.action'

interface ContractBasicInfoProps {
  fetchProjectList: () => void
  projectList: Data<any[]>
  fetchContractCodePrefix: (projectId) => void
  newContractCodePrefix: string
}

class ContractBasicInfo extends React.Component<ContractBasicInfoProps> {
  state = {
    contractName: '',
    projectId: '',
  }

  handleProjectChange = (v) => {
    this.props.fetchContractCodePrefix(v)
    this.setState({projectId: v})
  }

  componentDidMount() {
    this.props.fetchProjectList()
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

        <div className="bb">
          <LabelAndInput1 label="合同编号" inputType={NECESSARY}>
            <Input width="30%" disabled={true} placeholder="选择关联项目后自动产生" className="m5"/>
            -
            <Input width="20%" className="m5" placeholder="请输入流水号"/>
            -
            <Input width="30%" className="m5" placeholder="请输入协同BD缩写"/>
          </LabelAndInput1>
          <div className="tip">合同编号格式为：项目编号-流水号（3位数字）-协同BD，项目编号关联项目后产生</div>
        </div>
        <div className="bb">
          <LabelAndInput label="是否首次合作" disabled={true} placeholder="尚未确定"/>
          <div className="tip">由系统检测该客户是否有历史合同，不可修改</div>
        </div>

        <LabelAndInput1 className="pb10 bb" label="关联项目" inputType={NECESSARY}>
          <Select1 options={this.props.projectList.data || []}
                   value={this.state.projectId} onChange={this.handleProjectChange}
          />
        </LabelAndInput1>
        <Save/>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    projectList: state.contractProjectList
  }
}

export default connect(mapStateToProps, {
  fetchProjectList, fetchContractCodePrefix
})(ContractBasicInfo)
