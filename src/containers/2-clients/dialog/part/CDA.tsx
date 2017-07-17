/**
 * Created by jiangyukun on 2017/7/10.
 */
import CommonFunction from '../../../common/interface/CommonFunction'

import React from 'react'
import {connect} from 'react-redux'
import Button from '../../../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../../../components/fix-head-list/'
import Save from '../../../common/Save'
import AddCDA_Dialog from '../cda/AddCDA_Dialog'
import LookCDA_Dialog from '../cda/LookCDA_Dialog'
import UpdateCDA_Dialog from '../cda/UpdateCDA_Dialog'

import {fetchCDA_Detail, addCDA, updateCDA, removeCDA, fetchProjectList, fetchContactList} from '../../clients.action'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {CLIENTS} from '../../../../core/constants/types'

interface CDAProps extends CommonFunction {
  customerId: string
  cdaList: any[]
  fetchProjectList: (customerId) => void
  customerProjectData: any
  fetchContactList: (customerId) => void
  customerContactData: any
  fetchCDA_Detail: (cdaId: string) => void
  cdaDetail: any
  addCDA: any
  addCDASuccess: boolean
  updateCDA: (options) => void
  updateCDASuccess: boolean
  removeCDA: (cdaId: string) => void
  removeCDASuccess: boolean
}

class CDA extends React.Component<CDAProps> {
  state = {
    showAddCDA: false,
    showLookDialog: false,
    showEditDialog: false,

    index: -1
  }

  componentWillReceiveProps(nextProps: CDAProps) {
    if (!this.props.addCDASuccess && nextProps.addCDASuccess) {
      this.props.showSuccess('添加CDA成功！')
      this.props.clearState(CLIENTS.ADD_CDA)
    }
  }

  render() {
    const item = this.props.cdaList[this.state.index] || {}
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
              addCDA={this.props.addCDA}
              onExited={() => this.setState({showAddCDA: false})}
            />
          )
        }

        {
          this.state.showLookDialog && (
            <LookCDA_Dialog
              customerId={this.props.customerId}
              cdaId={item.id}
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
              fetchProjectList={this.props.fetchProjectList}
              customerProjectData={this.props.customerProjectData}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              updateCDA={this.props.updateCDA}
              updateCDASuccess={this.props.updateCDASuccess}
              removeCDA={this.props.removeCDA}
              removeCDASuccess={this.props.removeCDASuccess}
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
              this.props.cdaList.map((item, index) => {
                return (
                  <FixRow key={item.id} selected={this.state.index == index}
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
          <Button className="small" onClick={() => this.setState({showAddCDA: true})}>添加</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    customerId: props.customerId,
    cdaList: props.cdaList,
    cdaDetail: state.cdaDetail,
    customerProjectData: state.customerProjectData,
    customerContactData: state.customerContactData
  }
}

export default connect(mapStateToProps, {
  fetchCDA_Detail, addCDA, updateCDA, removeCDA, fetchProjectList, fetchContactList
})(addCommonFunction(CDA))
