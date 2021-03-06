/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {connect} from 'react-redux'

import Button from '../../../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../../../components/fix-head-list/'
import AddCDA_Dialog from '../cda/AddCDA_Dialog'
import LookCDA_Dialog from './LookCDA_Dialog'
import UpdateCDA_Dialog from '../cda/UpdateCDA_Dialog'

import Data from '../../../common/interface/Data'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {fetchProjectList, fetchContactList} from '../../customer.action'
import {fetchCdaList, addCda} from './cda.action'

interface CDAProps extends CommonFunction {
  customerId: string
  fetchCdaList: (customerId) => void
  cdaList: Data<any[]>
  addCdaSuccess: boolean
  updateCdaSuccess: boolean
  removeCdaSuccess: boolean
  editAuthority: boolean
}

class CDA extends React.Component<CDAProps> {
  static defaultProps = {
    editAuthority: true
  }

  cdaList = []
  state = {
    showAddCDA: false,
    showLookDialog: false,
    showEditDialog: false,

    index: -1
  }

  componentDidMount() {
    if (this.props.customerId) {
      this.props.fetchCdaList(this.props.customerId)
    }
  }

  componentWillReceiveProps(nextProps: CDAProps) {
    if (!this.props.addCdaSuccess && nextProps.addCdaSuccess) {
      this.props.fetchCdaList(this.props.customerId)
    }
    if (!this.props.updateCdaSuccess && nextProps.updateCdaSuccess) {
      this.props.fetchCdaList(this.props.customerId)
    }
    if (!this.props.removeCdaSuccess && nextProps.removeCdaSuccess) {
      this.props.fetchCdaList(this.props.customerId)
    }
    if (!this.props.cdaList.loaded && nextProps.cdaList.loaded) {
      this.cdaList = nextProps.cdaList.data
    }
  }

  render() {
    const list = this.cdaList || []
    const item = list[this.state.index] || {}
    return (
      <div className="customer-cda --module-item">
        {
          this.state.showAddCDA && (
            <AddCDA_Dialog
              customerId={this.props.customerId}
              onExited={() => this.setState({showAddCDA: false})}
            />
          )
        }

        {
          this.state.showLookDialog && (
            <LookCDA_Dialog
              canEdit={false}
              customerId={this.props.customerId}
              cdaId={item.cdaId}
              onExited={() => this.setState({showLookDialog: false})}
            />
          )
        }

        {
          this.state.showEditDialog && (
            <UpdateCDA_Dialog
              customerId={this.props.customerId}
              cdaId={item.cdaId}
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
                      {
                        this.props.editAuthority && (
                          <Button className="small" onClick={() => this.setState({showEditDialog: true})}>编辑</Button>
                        )
                      }
                    </FixRow.Item>
                  </FixRow>
                )
              })
            }

          </FixBody>
        </FixHeadList>
        <div className="m10 text-right">
          <Button className="small" disabled={!this.props.customerId || !this.props.editAuthority} onClick={() => this.setState({showAddCDA: true})}>添加</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    addCdaSuccess: state.customer.addCdaSuccess,
    updateCdaSuccess: state.customer.updateCdaSuccess,
    removeCdaSuccess: state.customer.removeCdaSuccess,
    customerId: props.customerId,
    cdaList: state.cdaList
  }
}

export default connect(mapStateToProps, {
  fetchCdaList, addCda, fetchProjectList, fetchContactList
})(addCommonFunction(CDA))
