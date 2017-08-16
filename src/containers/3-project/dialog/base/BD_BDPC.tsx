/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Label from '../../../common/Label'
import InputUnit from '../../../common/InputUnit'
import Update from '../../../common/Update'
import {PROJECT} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'

interface BD_BDPC_Props extends CommonFunction {
  disabled: boolean
  fetchBD: () => void
  BDList: any
  fetchBDPC: () => void
  BDPCList: any

  initBdAndBdpc?: any
  updateBdAndBdpc: any
  updateBd_BdpcSuccess: boolean
}

class BD_BDPC extends React.Component<BD_BDPC_Props> {
  state = {
    bd: '',
    bdpc: ''
  }

  update = () => {
    this.props.updateBdAndBdpc(this.state.bd, this.state.bdpc)
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

  componentWillReceiveProps(nextProps: BD_BDPC_Props) {
    if (!this.props.updateBd_BdpcSuccess && nextProps.updateBd_BdpcSuccess) {
      this.props.showSuccess('更新BD/BDPC成功！')
      this.props.clearState(PROJECT.UPDATE_BD_AND_BDPC)
    }
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
          <FlexDiv>
            <Label>所属BD</Label>
            <Part>
              <Select1 disabled={this.props.disabled} options={BDList}
                       showClear={true}
                       value={this.state.bd} onChange={v => this.setState({bd: v})}
              />
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">默认所属BD为关联客户的所属BD，有争议时由BD负责人线下确认后修改</div>
        </InputUnit>

        <InputUnit>
          <FlexDiv>
            <Label>所属BDPC</Label>
            <Part>
              <Select1 disabled={this.props.disabled} options={BDPCList}
                       showClear={true}
                       value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}
              />
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">默认所属BDPC为关联客户的所属BDPC，有争议时由BDPC负责人线下确认后修改</div>
        </InputUnit>
        <Update disabled={this.props.disabled} onClick={this.update}/>
      </div>
    )
  }
}

export default addCommonFunction(BD_BDPC)
