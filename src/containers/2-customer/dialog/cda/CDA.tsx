/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'

import Data from '../../../common/interface/Data'
import Button from '../../../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../../../components/fix-head-list/'
import AddCDA_Dialog from '../cda/AddCDA_Dialog'
import LookCDA_Dialog from '../cda/LookCDA_Dialog'
import UpdateCDA_Dialog from '../cda/UpdateCDA_Dialog'

import {fetchProjectList, fetchContactList} from '../../customer.action'
import {fetchCdaList, fetchCDA_Detail, addCda, updateCda, removeCda} from './cda.action'
import {CUSTOMER} from '../../../../core/constants/types'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'

interface CDAProps extends CommonFunction {
  customerId: string
  cdaList?: Data<any[]>
  fetchCdaList: (customerId) => void
  fetchProjectList: (customerId) => void
  customerProjectData: any
  fetchContactList: (customerId) => void
  customerContactData: any
  fetchCDA_Detail: (cdaId: string) => void
  cdaDetail: any
  addCda: any
  addCdaSuccess: boolean
  updateCda: (options) => void
  updateCdaSuccess: boolean
  removeCda: (cdaId: string) => void
  removeCdaSuccess: boolean
}

class CDA extends React.Component<CDAProps> {
  cdaList = []
  state = {
    showAddCDA: false,
    showLookDialog: false,
    showEditDialog: false,

    index: -1
  }

  componentDidMount() {
    this.props.fetchCdaList(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: CDAProps) {
    if (!this.props.addCdaSuccess && nextProps.addCdaSuccess) {
      this.props.showSuccess('添加CDA成功！')
      this.props.clearState(CUSTOMER.ADD_CDA)
      this.props.fetchCdaList(this.props.customerId)
    }
    if (!this.props.updateCdaSuccess && nextProps.updateCdaSuccess) {
      this.props.showSuccess('更新CDA成功！')
      this.props.clearState(CUSTOMER.UPDATE_CDA)
      this.props.fetchCdaList(this.props.customerId)
    }
    if (!this.props.removeCdaSuccess && nextProps.removeCdaSuccess) {
      this.props.showSuccess('删除CDA成功！')
      this.props.clearState(CUSTOMER.REMOVE_CDA)
      this.props.fetchCdaList(this.props.customerId)
    }
  }

  render() {
    const {loaded, data} = this.props.cdaList
    const list = data || []
    const item = list[this.state.index] || {}
    return (
      <div className="p5">
        {
          this.state.showAddCDA && (
            <AddCDA_Dialog
              customerId={this.props.customerId}
              fetchProjectList={this.props.fetchProjectList}
              customerProjectData={this.props.customerProjectData}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              addCda={this.props.addCda}
              addCdaSuccess={this.props.addCdaSuccess}
              onExited={() => this.setState({showAddCDA: false})}
            />
          )
        }

        {
          this.state.showLookDialog && (
            <LookCDA_Dialog
              customerId={this.props.customerId}
              cdaId={item.cdaId}
              fetchCDA_Detail={this.props.fetchCDA_Detail}
              cdaDetail={this.props.cdaDetail}
              fetchProjectList={this.props.fetchProjectList}
              customerProjectData={this.props.customerProjectData}
              onExited={() => this.setState({showLookDialog: false})}
            />
          )
        }

        {
          this.state.showEditDialog && (
            <UpdateCDA_Dialog
              customerId={this.props.customerId}
              cdaId={item.cdaId}
              fetchCDA_Detail={this.props.fetchCDA_Detail}
              cdaDetail={this.props.cdaDetail}
              fetchProjectList={this.props.fetchProjectList}
              customerProjectData={this.props.customerProjectData}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              updateCda={this.props.updateCda}
              updateCdaSuccess={this.props.updateCdaSuccess}
              removeCda={this.props.removeCda}
              removeCdaSuccess={this.props.removeCdaSuccess}
              onExited={() => this.setState({showEditDialog: false})}
            />
          )
        }
        <FixHeadList>
          <FixHead>
            <FixHead.Item>起始日期</FixHead.Item>
            <FixHead.Item>结束日期</FixHead.Item>
            <FixHead.Item>备注</FixHead.Item>
            <FixHead.Item>操作</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item.cdaId} selected={this.state.index == index}
                          onClick={() => this.setState({index})}
                  >
                    <FixRow.Item>{item.startDate}</FixRow.Item>
                    <FixRow.Item>{item.endDate}</FixRow.Item>
                    <FixRow.Item>{item.remark}</FixRow.Item>
                    <FixRow.Item>
                      <Button className="small" onClick={() => this.setState({showLookDialog: true})}>查看</Button>
                      <Button className="small" onClick={() => this.setState({showEditDialog: true})}>编辑</Button>
                    </FixRow.Item>
                  </FixRow>
                )
              })
            }

          </FixBody>
        </FixHeadList>
        <div className="m10 text-right">
          <Button className="small" disabled={!this.props.customerId} onClick={() => this.setState({showAddCDA: true})}>添加</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.customer,
    customerId: props.customerId,
    cdaList: state.cdaList,
    cdaDetail: state.cdaDetail,
    customerProjectData: state.customerProjectData,
    customerContactData: state.customerContactData
  }
}

export default connect(mapStateToProps, {
  fetchCdaList, fetchCDA_Detail, addCda, updateCda, removeCda, fetchProjectList, fetchContactList
})(addCommonFunction(CDA))
