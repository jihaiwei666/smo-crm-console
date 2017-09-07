/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Select1 from 'app-core/common/Select1'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import Update from '../../../common/Update'

import Data from '../../../common/interface/Data'
import getCommonFunctionAndRoleCode from '../../../_frameset/hoc/getCommonFunctionAndRoleCode'
import CommonFunctionAndRoleCode from '../../../common/interface/CommonFunctionAndRoleCode'
import {PROJECT} from '../../../../core/constants/types'
import {fetchBDPC, fetchBD} from '../../../../actions/app.action'
import {updateBdAndBdpc, fetchProjectBdBdpc} from '../../project.action'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {showBdBdpcUpdate} from '../../../common/common.helper'

interface ProjectBD_BDPCProps extends CommonFunctionAndRoleCode {
  projectId: string
  fetchBD: () => void
  BDList: any
  fetchBDPC: () => void
  BDPCList: any

  initBdAndBdpc?: any
  updateBdAndBdpc: any
  updateBd_BdpcSuccess: boolean
  fetchProjectBdBdpc: (projectId) => void
  projectBdBdpc: Data<any>
}

class ProjectBD_BDPC extends React.Component<ProjectBD_BDPCProps> {
  state = {
    bd: '',
    bdpc: ''
  }

  update = () => {
    this.props.updateBdAndBdpc({
      "project_info_id": this.props.projectId,
      "customer_owner": this.state.bd,
      "customer_the_bdpc": this.state.bdpc
    })
  }

  refreshBdBdpc = () => {
    this.props.fetchProjectBdBdpc(this.props.projectId)
  }

  componentWillMount() {
    if (this.props.initBdAndBdpc) {
      this.setState(this.props.initBdAndBdpc)
    }
  }

  componentDidMount() {
    this.props.fetchBD()
    this.props.fetchBDPC()
    eventBus.addListener(EVENT_NAMES.PROJECT_CREATE, this.refreshBdBdpc)
  }

  componentWillReceiveProps(nextProps: ProjectBD_BDPCProps) {
    if (!this.props.updateBd_BdpcSuccess && nextProps.updateBd_BdpcSuccess) {
      this.props.showSuccess('更新BD/BDPC成功！')
      this.props.clearState(PROJECT.UPDATE_BD_AND_BDPC)
    }
    if (!this.props.projectBdBdpc.loaded && nextProps.projectBdBdpc.loaded) {
      this.setState(nextProps.projectBdBdpc.data)
    }
  }

  componentWillUnmount() {
    eventBus.removeListener(EVENT_NAMES.PROJECT_CREATE, this.refreshBdBdpc)
  }

  render() {
    let BDList = [], BDPCList = []
    if (this.props.BDList.loaded) {
      BDList = this.props.BDList.data
    }
    if (this.props.BDPCList.loaded) {
      BDPCList = this.props.BDPCList.data
    }

    return (
      <div>
        <div className="input-row">
          <LabelAndInput1 label="所属BD">
            <Select1 disabled={this.props.projectId == ''} options={BDList}
                     showClear={true}
                     value={this.state.bd} onChange={v => this.setState({bd: v})}
            />
          </LabelAndInput1>
          <div className="tip">默认所属BD为关联客户的所属BD，有争议时由BD负责人线下确认后修改</div>
        </div>

        <div className="input-row">
          <LabelAndInput1 label="所属BDPC">
            <Select1 disabled={this.props.projectId == ''} options={BDPCList}
                     showClear={true}
                     value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
            />
          </LabelAndInput1>
          <div className="tip">默认所属BDPC为关联客户的所属BDPC，有争议时由BDPC负责人线下确认后修改</div>
        </div>
        <Update disabled={this.props.projectId == ''} onClick={this.update}/>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    projectBdBdpc: state.projectBdBdpc,
    updateBd_BdpcSuccess: state.project.updateBd_BdpcSuccess,
    projectId: props.projectId
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, updateBdAndBdpc, fetchProjectBdBdpc
})(getCommonFunctionAndRoleCode(ProjectBD_BDPC))