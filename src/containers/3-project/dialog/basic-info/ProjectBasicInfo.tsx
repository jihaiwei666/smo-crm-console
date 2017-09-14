/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Form from 'app-core/form/Form'
import Select1 from 'app-core/common/Select1'

import Data from '../../../common/interface/Data'
import {NECESSARY} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import MT15 from '../../../../components/layout/MT15'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import CommonFunctionAndRoleCode from '../../../common/interface/CommonFunctionAndRoleCode'
import getCommonFunctionAndRoleCode from '../../../_frameset/hoc/getCommonFunctionAndRoleCode'
import {customerType} from '../../../2-customer/customer.constant'
import {PROJECT} from '../../../../core/constants/types'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {isAdmin} from '../../../7-account-manage/account-manage.helper'
import {checkHavePermission} from '../../../../core/permission'
import {fetchClientList, addProjectBaseInfo, updateProjectBaseInfo} from '../../project.action'

interface ProjectBasicInfoProps extends CommonFunctionAndRoleCode {
  projectId?: string
  baseInfo?: any
  fetchClientList: () => void
  clientList: Data<any[]>
  addProjectBaseInfo: (options) => void
  addProjectInfoSuccess: boolean
  updateProjectBaseInfo: (options) => void
  updateProjectInfoSuccess: boolean
  onProjectNameChange: (projectName) => void
  editAuthority: boolean
}

class ProjectBasicInfo extends React.Component<ProjectBasicInfoProps> {
  static defaultProps = {
    editAuthority: true
  }

  oldProjectName = ''
  relativeClientName = ''
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

  triggerCroClient = (clientList) => {
    if (!this.state.relativeClient) return
    let matchClient = clientList.find(client => client.value == this.state.relativeClient)
    if (!matchClient) return
    if (matchClient.roleType == customerType.cro) {
      eventBus.emit(EVENT_NAMES.PROJECT_CLIENT_ROLE_CRO, matchClient.text)
    }
    eventBus.emit(EVENT_NAMES.PROJECT_CLIENT_CHANGE, matchClient.text)
  }

  componentWillMount() {
    if (this.props.baseInfo) {
      const {projectName, projectCode, relativeClient, relativeClientName} = this.props.baseInfo
      this.setState({projectName, projectCode, relativeClient})
      this.oldProjectName = projectName
      this.relativeClientName = relativeClientName
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
      this.triggerCroClient(nextProps.clientList.data)
      eventBus.emit(EVENT_NAMES.PROJECT_CREATE)
    }
    if (!this.props.updateProjectInfoSuccess && nextProps.updateProjectInfoSuccess) {
      this.props.showSuccess('更新项目信息成功！')
      this.props.clearState(PROJECT.UPDATE_PROJECT_INFO)
      this.props.onProjectNameChange(this.state.projectName)
      this.triggerCroClient(nextProps.clientList.data)
      if (this.oldProjectName != this.state.projectName) {
        eventBus.emit(EVENT_NAMES.PROJECT_NAME_UPDATED)
      }
    }
    if (!this.props.clientList.loaded && nextProps.clientList.loaded) {
      let clientList = nextProps.clientList.data
      this.triggerCroClient(clientList)
    }
  }

  render() {
    return (
      <Form className="--module-item" onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority}>
        <div className="input-row">
          <LabelAndInput
            label="项目名称" inputType={NECESSARY}
            required={true} name="projectName"
            value={this.state.projectName} onChange={v => this.setState({projectName: v})}
          />
          <div className="tip">项目名称只能输入汉字、英文、数字、-、（、）</div>
        </div>

        <div className="input-row">
          <LabelAndInput
            label="项目编码" placeholder="暂未生成"
            disabled={!checkHavePermission(this.props.roleCode, isAdmin(this.props.roleCode))}
            value={this.state.projectCode} onChange={v => this.setState({projectCode: v})}
          />
          <div className="tip">有合同关联后，则生成项目编码（SM-年份-月份-BD缩写-流水号，如SM201705LXX001）</div>
        </div>

        <LabelAndInput1 label="关联客户" inputType={NECESSARY} className="input-row">
          <Select1
            width="250px"
            required={true} name="relativeClient"
            options={this.props.clientList.data || []} notMatchText={this.relativeClientName}
            value={this.state.relativeClient} onChange={v => this.setState({relativeClient: v})}/>
        </LabelAndInput1>

        {
          this.props.editAuthority && this.props.projectId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
        {
          this.props.editAuthority && !this.props.projectId && (
            <Save disabled={!this.state.valid} onClick={this.add}/>
          )
        }
        {
          !this.props.editAuthority && (<MT15/>)
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
})(getCommonFunctionAndRoleCode(ProjectBasicInfo))
