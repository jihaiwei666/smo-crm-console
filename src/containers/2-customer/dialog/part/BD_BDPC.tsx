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
import Save from '../../../common/Save'
import ApplyBdpcFollowUpDialog from '../ApplyBdpcFollowUpDialog'
import {applyBdpcFollowUp, updateBdAndBdpc} from '../../customer.action'
import CustomerState from '../../CustomerState'
import {fetchBD, fetchBDPC} from '../../../../actions/app.action'

interface BD_BDPC_Props extends CustomerState {
  customerId: string
  fetchBD: () => void
  BDList: any
  fetchBDPC: () => void
  BDPCList: any
  updateBdAndBdpc: any
  applyBdpcFollowUp: (options) => void

  initBdAndBdpc?: any
}

class BD_BDPC extends React.Component<BD_BDPC_Props> {
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

  componentWillMount() {
    if (this.props.initBdAndBdpc) {
      this.setState(this.props.initBdAndBdpc)
    }
  }

  componentDidMount() {
    this.props.fetchBD()
    this.props.fetchBDPC()
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
              <Select1 disabled={!this.props.customerId} options={BDList}
                       showClear={true}
                       value={this.state.owner} onChange={v => this.setState({owner: v})}
                       lazyLoad={true} onFirstOpen={this.props.fetchBD} loadSuccess={this.props.BDList.loaded}
              />
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">客户所有人为产生相关项目或产生MSA后，系统自动匹配BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit className="clearfix">
          <FlexDiv>
            <Label>所属BDPC</Label>
            <Part>
              <Select1 disabled={!this.props.customerId} options={BDPCList}
                       showClear={true}
                       value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
                       lazyLoad={true} onFirstOpen={this.props.fetchBDPC} loadSuccess={this.props.BDPCList.loaded}
              />
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">确定所属BD后，由所属BD点击申请BDPC跟进，BDPC确认后产生。有争议时BDPC负责人确认后修改</div>
          <div className="pull-right">
            <Button className="small" disabled={!this.props.customerId} onClick={() => this.setState({showApply: true})}>申请BDPC跟进</Button>
          </div>

        </InputUnit>
        <Save disabled={!this.props.customerId} onClick={this.update}/>
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
    BDPCList: state.BDPCList
  }
}

export default connect(mapStateToProps, {
  fetchBD, fetchBDPC, applyBdpcFollowUp, updateBdAndBdpc
})(BD_BDPC)
