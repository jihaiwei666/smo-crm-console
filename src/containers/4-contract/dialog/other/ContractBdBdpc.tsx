/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'

import {CONTRACT} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import BD_BDPC from '../../../common/BD_BDPC'

import {fetchBD, fetchBDPC} from '../../../../actions/app.action'
import {updateBdAndBdpc} from '../../contract.action'
import Data from '../../../common/interface/Data'

interface ContractBdBdpcProps extends CommonFunction {
  contractId: string
  fetchBD: () => void
  BDList: Data<any>
  fetchBDPC: () => void
  BDPCList: Data<any>

  initBdAndBdpc?: any
  updateBdAndBdpc: any
  updateBdBdpcSuccess: boolean
}

class ContractBdBdpc extends React.Component<ContractBdBdpcProps> {
  state = {
    bd: '',
    bdpc: ''
  }

  updateBdAndBdpc = (bd, bdpc) => {
    this.props.updateBdAndBdpc({
      "contract_info_id": this.props.contractId,
      "contract_the_bd": bd,
      "contract_the_bdpc": bdpc
    })
  }

  componentWillReceiveProps(nextProps: ContractBdBdpcProps) {
    if (!this.props.updateBdBdpcSuccess && nextProps.updateBdBdpcSuccess) {
      this.props.showSuccess('更新BD/BDPC成功！')
      this.props.clearState(CONTRACT.UPDATE_BD_AND_BDPC)
    }
  }

  render() {
    return (
      <BD_BDPC
        disabled={!this.props.contractId}
        initBdAndBdpc={this.props.initBdAndBdpc}
        fetchBD={this.props.fetchBD}
        BDList={this.props.BDList}
        fetchBDPC={this.props.fetchBDPC}
        BDPCList={this.props.BDPCList}
        updateBdAndBdpc={this.updateBdAndBdpc}
        updateBdBdpcSuccess={this.props.updateBdBdpcSuccess}/>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    contractId: props.contractId,
    updateBdBdpcSuccess: state.contract.updateBdBdpcSuccess,
    BDList: state.BDList,
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, updateBdAndBdpc
})(addCommonFunction(ContractBdBdpc))
