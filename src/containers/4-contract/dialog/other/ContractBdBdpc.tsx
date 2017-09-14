/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Select1 from 'app-core/common/Select1'

import InputUnit from '../../../common/InputUnit'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import MT15 from '../../../../components/layout/MT15'
import Update from '../../../common/Update'

import Data from '../../../common/interface/Data'
import CommonFunctionAndRoleCode from '../../../common/interface/CommonFunctionAndRoleCode'
import getCommonFunctionAndRoleCode from '../../../_frameset/hoc/getCommonFunctionAndRoleCode'
import {roleCategory} from '../../../7-account-manage/account-manage.constant'
import {CONTRACT} from '../../../../core/constants/types'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {checkHavePermission, showBdBdpcUpdate} from '../../../../core/permission'
import {fetchBD, fetchBDPC} from '../../../../actions/app.action'
import {updateBdAndBdpc, fetchContractBdBdpc} from '../../contract.action'

interface ContractBdBdpcProps extends CommonFunctionAndRoleCode {
  contractId?: string
  fetchBD: () => void
  BDList: Data<any>
  fetchBDPC: () => void
  BDPCList: Data<any>

  initBdAndBdpc?: any
  updateBdAndBdpc: any
  updateBdBdpcSuccess: boolean
  fetchContractBdBdpc: (contractId) => void
  contractBdBdpc: Data<any>
}

class ContractBdBdpc extends React.Component<ContractBdBdpcProps> {
  bdName = ''
  state = {
    bd: '',
    bdpc: ''
  }

  updateBdAndBdpc = () => {
    this.props.updateBdAndBdpc({
      "contract_info_id": this.props.contractId,
      "contract_the_bd": this.state.bd,
      "contract_the_bdpc": this.state.bdpc
    })
  }

  refreshBdBdpc = () => {
    this.props.fetchContractBdBdpc(this.props.contractId)
  }

  componentDidMount() {
    if (this.props.initBdAndBdpc) {
      const {bd, bdName, bdpc} = this.props.initBdAndBdpc
      this.setState({bd, bdpc})
      this.bdName = bdName
    }
    this.props.fetchBD()
    this.props.fetchBDPC()
    eventBus.addListener(EVENT_NAMES.ADD_CONTRACT_SUCCESS, this.refreshBdBdpc)
  }

  componentWillReceiveProps(nextProps: ContractBdBdpcProps) {
    if (!this.props.updateBdBdpcSuccess && nextProps.updateBdBdpcSuccess) {
      this.props.showSuccess('更新BD/BDPC成功！')
      this.props.clearState(CONTRACT.UPDATE_BD_AND_BDPC)
    }
    if (!this.props.contractBdBdpc.loaded && nextProps.contractBdBdpc.loaded) {
      const {bd, bdName, bdpc} = nextProps.contractBdBdpc.data
      this.setState({bd, bdpc})
      this.bdName = bdName
    }
  }

  componentWillUnmount() {
    eventBus.removeListener(EVENT_NAMES.ADD_CONTRACT_SUCCESS, this.refreshBdBdpc)
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
        <InputUnit>
          <LabelAndInput1 label="所属BD">
            <Select1 disabled={!this.props.contractId || !checkHavePermission(this.props.roleCode, this.props.roleCode == roleCategory.bdLeader)}
                     options={BDList} showClear={true} notMatchText={this.bdName}
                     value={this.state.bd} onChange={v => this.setState({bd: v})}
            />
          </LabelAndInput1>
          <div className="input-unit-illustrate">默认所属BD为关联客户的所属BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit>
          <LabelAndInput1 label="所属BDPC">
            <Select1
              disabled={!this.props.contractId || !checkHavePermission(this.props.roleCode, this.props.roleCode == roleCategory.bdpcLeader)}
              options={BDPCList} showClear={true}
              value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
            />
          </LabelAndInput1>
          <div className="input-unit-illustrate">默认所属BDPC为关联客户的所属BDPC，有争议时由BDPC负责人线下确认后修改</div>
        </InputUnit>
        {
          checkHavePermission(this.props.roleCode, showBdBdpcUpdate(this.props.roleCode)) && (
            <Update disabled={!this.props.contractId} onClick={this.updateBdAndBdpc}/>
          )
        }
        {
          !checkHavePermission(this.props.roleCode, showBdBdpcUpdate(this.props.roleCode)) && (<MT15/>)
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    contractId: props.contractId,
    updateBdBdpcSuccess: state.contract.updateBdBdpcSuccess,
    BDList: state.BDList,
    BDPCList: state.BDPCList,
    contractBdBdpc: state.contractBdBdpc
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, updateBdAndBdpc, fetchContractBdBdpc
})(getCommonFunctionAndRoleCode(ContractBdBdpc))
