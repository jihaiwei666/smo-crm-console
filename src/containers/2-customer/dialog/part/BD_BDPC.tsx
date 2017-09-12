/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Label from '../../../common/Label'
import InputUnit from '../../../common/InputUnit'
import Button from '../../../../components/button/Button'
import MT15 from '../../../../components/layout/MT15'
import Update from '../../../common/Update'
import ApplyBdpcFollowUpDialog from '../ApplyBdpcFollowUpDialog'

import CustomerState from '../../CustomerState'
import Data from '../../../common/interface/Data'
import CommonFunctionAndRoleCode from '../../../common/interface/CommonFunctionAndRoleCode'
import getCommonFunctionAndRoleCode from '../../../_frameset/hoc/getCommonFunctionAndRoleCode'
import {CUSTOMER} from '../../../../core/constants/types'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {checkHavePermission, showBdBdpcUpdate} from '../../../../core/permission'
import {roleCategory} from '../../../7-account-manage/account-manage.constant'
import {fetchBD, fetchBDPC} from '../../../../actions/app.action'
import {applyBdpcFollowUp, updateBdAndBdpc, fetchCustomerBdBdpc} from '../../customer.action'

interface BD_BDPC_Props extends CustomerState, CommonFunctionAndRoleCode {
  customerId: string
  fetchBD: () => void
  BDList: any
  fetchBDPC: () => void
  BDPCList: any
  initBdAndBdpc?: any
  canApplyBdpcFollow: boolean
  updateBdAndBdpc: (options) => void
  applyBdpcFollowUp: (options) => void

  fetchCustomerBdBdpc: (customerId) => void
  customerBdBdpc: Data<any>
}

class BD_BDPC extends React.Component<BD_BDPC_Props> {
  canApplyBdpcFollow = true
  state = {
    showApply: false,

    owner: '',
    bdpc: ''
  }

  update = () => {
    this.props.updateBdAndBdpc({
      "customer_info_id": this.props.customerId,
      "customer_owner": this.state.owner,
      "customer_the_bdpc": this.state.bdpc
    })
  }

  refreshBdBdpc = () => {
    this.props.fetchCustomerBdBdpc(this.props.customerId)
  }

  componentWillMount() {
    if (this.props.initBdAndBdpc) {
      this.setState(this.props.initBdAndBdpc)
    }
    this.canApplyBdpcFollow = this.props.canApplyBdpcFollow
  }

  componentDidMount() {
    eventBus.addListener(EVENT_NAMES.MSA_UPDATE, this.refreshBdBdpc)
    this.props.fetchBD()
    this.props.fetchBDPC()
  }

  componentWillReceiveProps(nextProps: BD_BDPC_Props) {
    if (!this.props.updateBdAndBdpcSuccess && nextProps.updateBdAndBdpcSuccess) {
      this.props.showSuccess('更新 所有人、所属BDPC 成功！')
      this.props.clearState(CUSTOMER.UPDATE_BD_AND_BDPC)
    }
    if (!this.props.customerBdBdpc.loaded && nextProps.customerBdBdpc.loaded) {
      this.setState(nextProps.customerBdBdpc.data)
    }
    if (!this.props.applyBdpcFollowUpSuccess && nextProps.applyBdpcFollowUpSuccess) {
      this.canApplyBdpcFollow = false
    }
  }

  componentWillUnmount() {
    eventBus.removeListener(EVENT_NAMES.MSA_UPDATE, this.refreshBdBdpc)
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
      <div className="--module-item">
        {
          this.state.showApply && (
            <ApplyBdpcFollowUpDialog
              customerId={this.props.customerId}
              fetchBDPC={this.props.fetchBDPC}
              BDPCList={this.props.BDPCList}
              applyBdpcFollowUp={this.props.applyBdpcFollowUp}
              applyBdpcFollowUpSuccess={this.props.applyBdpcFollowUpSuccess}
              onExited={() => this.setState({showApply: false})}
            />
          )
        }

        <InputUnit>
          <FlexDiv>
            <Label>客户所有人</Label>
            <Part>
              <Select1 disabled={!this.props.customerId || !checkHavePermission(this.props.roleCode, this.props.roleCode == roleCategory.bdLeader)}
                       options={BDList} showClear={true}
                       value={this.state.owner} onChange={v => this.setState({owner: v})}
                       lazyLoad={true} onFirstOpen={this.props.fetchBD} loadSuccess={this.props.BDList.loaded}
              />
            </Part>
          </FlexDiv>
          <div className="tip mt5">客户所有人为产生相关项目或产生MSA后，系统自动匹配BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit className="clearfix">
          <FlexDiv>
            <Label>所属BDPC</Label>
            <Part>
              <Select1 disabled={!this.props.customerId || !checkHavePermission(this.props.roleCode, this.props.roleCode == roleCategory.bdpcLeader)}
                       options={BDPCList} showClear={true}
                       value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
                       lazyLoad={true} onFirstOpen={this.props.fetchBDPC} loadSuccess={this.props.BDPCList.loaded}
              />
            </Part>
          </FlexDiv>
          <div className="tip mt5">确定所属BD后，由所属BD点击申请BDPC跟进，BDPC确认后产生。有争议时BDPC负责人确认后修改</div>
          <div className="pull-right">
            <Button className="small" disabled={!this.props.customerId || !this.canApplyBdpcFollow}
                    onClick={() => this.setState({showApply: true})}>申请BDPC跟进</Button>
          </div>

        </InputUnit>
        {
          checkHavePermission(this.props.roleCode, showBdBdpcUpdate(this.props.roleCode)) && (
            <Update disabled={!this.props.customerId} onClick={this.update}/>
          )
        }
        {
          !checkHavePermission(this.props.roleCode, showBdBdpcUpdate(this.props.roleCode)) && (
            <MT15/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    initBdAndBdpc: props.initBdAndBdpc,
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    customerBdBdpc: state.customerBdBdpc
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, applyBdpcFollowUp, updateBdAndBdpc, fetchCustomerBdBdpc
})(getCommonFunctionAndRoleCode(BD_BDPC))
