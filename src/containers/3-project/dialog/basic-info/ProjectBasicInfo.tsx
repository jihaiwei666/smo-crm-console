/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Form from 'app-core/form/Form'

import Data from '../../../common/interface/Data'
import {NECESSARY} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Select1 from 'app-core/common/Select1'
import Save from '../../../common/Save'

import {fetchClientList, addProjectBaseInfo, updateProjectBaseInfo} from '../../project.action'
import Update from '../../../common/Update'
import {PROJECT} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'

interface ProjectBasicInfoProps extends CommonFunction {
  projectId?: string
  baseInfo?: any
  fetchClientList: () => void
  clientList: Data<any[]>
  addProjectBaseInfo: (options) => void
  addProjectInfoSuccess: boolean
  updateProjectBaseInfo: (options) => void
  updateProjectInfoSuccess: boolean
  onProjectNameChange: (projectName) => void
}

class ProjectBasicInfo extends React.Component<ProjectBasicInfoProps> {
  state = {
    valid: true,
    projectName: '',
    projectCode: '',
    relativeClient: ''
  }

  add = () => {
    this.props.addProjectBaseInfo({
      "project_info_name": this.state.projectName,
      "project_info_code": this.state.projectCode,
      "customer_info_id": this.state.relativeClient
    })
  }

  update = () => {
    this.props.updateProjectBaseInfo({
      "project_info_id": this.props.projectId,
      "project_info_name": this.state.projectName,
      "project_info_code": this.state.projectCode,
      "customer_info_id": this.state.relativeClient
    })
  }

  componentWillMount() {
    if (this.props.baseInfo) {
      this.setState(this.props.baseInfo)
    }
  }

  componentDidMount() {
    this.props.fetchClientList()
  }

  componentWillReceiveProps(nextProps: ProjectBasicInfoProps) {
    if (!this.props.addProjectInfoSuccess && nextProps.addProjectInfoSuccess) {
      this.props.showSuccess('添加项目信息成功！')
      this.props.clearState(PROJECT.ADD_PROJECT_INFO)
      this.props.onProjectNameChange(this.state.projectName)
    }
    if (!this.props.updateProjectInfoSuccess && nextProps.updateProjectInfoSuccess) {
      this.props.showSuccess('更新项目信息成功！')
      this.props.clearState(PROJECT.UPDATE_PROJECT_INFO)
      this.props.onProjectNameChange(this.state.projectName)
    }
  }

  render() {
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <div className="input-row">
          <LabelAndInput
            label="项目名称" inputType={NECESSARY}
            required={true} name="projectName"
            value={this.state.projectName} onChange={v => this.setState({projectName: v})}
          />
          <div className="tip">项目名称只能输入汉字、英文、数字、-、（、）</div>
        </div>

        <div className="input-row">
          <LabelAndInput label="项目编码"
                         value={this.state.projectCode} onChange={v => this.setState({projectCode: v})}
          />
          <div className="tip">有合同关联后，则生成项目编码（SM-年份-月份-BD缩写-流水号，如SM201705LXX001）</div>
        </div>

        <LabelAndInput1 label="关联客户" inputType={NECESSARY}>
          <Select1
            width="250px"
            required={true} name="relativeClient"
            options={this.props.clientList.data || []}
            value={this.state.relativeClient} onChange={v => this.setState({relativeClient: v})}/>
        </LabelAndInput1>

        {
          this.props.projectId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
        {
          !this.props.projectId && (
            <Save disabled={!this.state.valid} onClick={this.add}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    addProjectInfoSuccess: state.project.addProjectInfoSuccess,
    updateProjectInfoSuccess: state.project.updateProjectInfoSuccess,
    projectId: props.projectId,
    clientList: state.projectClientList,
  }
}

export default connect(mapStateToProps, {
  fetchClientList, addProjectBaseInfo, updateProjectBaseInfo
})(addCommonFunction(ProjectBasicInfo))
