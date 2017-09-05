/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'
import Select1 from 'app-core/common/Select1'

import InputUnit from '../../../common/InputUnit'
import Update from '../../../common/Update'
import LabelAndInput1 from '../../../common/LabelAndInput1'

import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {CONTRACT} from '../../../../core/constants/types'
import {EVENT_NAMES, default as eventBus} from '../../../../core/event'
import {fetchBD, fetchBDPC} from '../../../../actions/app.action'
import {updateBdAndBdpc, fetchContractBdBdpc} from '../../contract.action'

interface ContractBdBdpcProps extends CommonFunction {
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
      this.setState(this.props.initBdAndBdpc)
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
      this.setState(nextProps.contractBdBdpc.data)
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
      <div>
        <InputUnit>
          <LabelAndInput1 label="所属BD">
            <Select1 disabled={!this.props.contractId} options={BDList}
                     showClear={true}
                     value={this.state.bd} onChange={v => this.setState({bd: v})}
            />
          </LabelAndInput1>
          <div className="input-unit-illustrate">默认所属BD为关联客户的所属BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit>
          <LabelAndInput1 label="所属BDPC">
            <Select1
              disabled={!this.props.contractId} options={BDPCList}
              showClear={true}
              value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
            />
          </LabelAndInput1>
          <div className="input-unit-illustrate">默认所属BDPC为关联客户的所属BDPC，有争议时由BDPC负责人线下确认后修改</div>
        </InputUnit>
        <Update disabled={!this.props.contractId} onClick={this.updateBdAndBdpc}/>
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
})(addCommonFunction(ContractBdBdpc))
