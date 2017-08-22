/**
 * Created by jiangyukun on 2017/7/18.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import Button from '../../components/button/Button'
import PageCountNav from '../../components/nav/PageCountNav'
import AddContractDialog from './dialog/AddContractDialog'
import UpdateContractDialog from './dialog/UpdateContractDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import {handleListData} from '../common/common.helper'
import {getContractType} from './contract.helper'
import {fetchList, removeContract} from './contract.action'
import {CONTRACT} from '../../core/constants/types'

interface ContractProps extends AppFunctionPage {
  contractList: any
  updateContractSuccess: boolean
  addContractSuccess: boolean
  updateBdBdpcSuccess: boolean
  removeContract: (contractId) => void
  removeContractSuccess: boolean
  addBeforeSignSuccess: boolean
  updateBeforeSignSuccess: boolean
}

class Contract extends React.Component<ContractProps> {
  state = {
    index: -1,
    currentPage: 0,
    showAddDialog: false,
    showEditDialog: false,
    showDeleteConfirm: false
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
    })
  }

  refreshCurrentPage = () => {
    this.toPage(this.state.currentPage)
  }

  removeContract = () => {
    let item = this.props.contractList.data.list[this.state.index]
    this.props.removeContract(item.contractId)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: ContractProps) {
    if (!this.props.addContractSuccess && nextProps.addContractSuccess) {
      this.toPage(0)
    }
    if (!this.props.updateContractSuccess && nextProps.updateContractSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.updateBdBdpcSuccess && nextProps.updateBdBdpcSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.addBeforeSignSuccess && nextProps.addBeforeSignSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.updateBeforeSignSuccess && nextProps.updateBeforeSignSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.removeContractSuccess && nextProps.removeContractSuccess) {
      this.props.showSuccess('删除合同成功！')
      this.props.clearState(CONTRACT.REMOVE_CONTRACT)
      const {total} = handleListData(this.props.contractList)
      if (total % 10 == 1) {
        this.toPage(0)
      } else {
        this.refreshCurrentPage()
      }
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.contractList)
    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page project">
        {
          this.state.showAddDialog && (
            <AddContractDialog
              onExited={() => this.setState({showAddDialog: false})}
            />
          )
        }
        {
          this.state.showEditDialog && (
            <UpdateContractDialog
              contractId={item.contractId}
              onExited={() => this.setState({showEditDialog: false})}
            />
          )
        }
        {
          this.state.showDeleteConfirm && (
            <Confirm
              message="确定删除此合同吗？"
              onExited={() => this.setState({showDeleteConfirm: false})}
              onConfirm={this.removeContract}
            />
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showAddDialog: true})}>创建</Button>
        </div>

        <FixHeadList total={total}>
          <FixHead>
            <FixHead.Item>合同名称</FixHead.Item>
            <FixHead.Item>合同编号</FixHead.Item>
            <FixHead.Item>合同类型</FixHead.Item>
            <FixHead.Item>BD</FixHead.Item>
            <FixHead.Item>BDPC</FixHead.Item>
            <FixHead.Item>操作</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item.contractId}
                          selected={this.state.index == index}
                          onClick={() => this.setState({index})}
                  >
                    <FixRow.Item>{item.contractName}</FixRow.Item>
                    <FixRow.Item>{item.contractCode}</FixRow.Item>
                    <FixRow.Item>{getContractType(item.contractType)}</FixRow.Item>
                    <FixRow.Item>{item.bd}</FixRow.Item>
                    <FixRow.Item>{item.bdpc}</FixRow.Item>
                    <FixRow.Item>
                      <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>查看</Button>
                      <Button className="small danger" onClick={() => this.setState({showDeleteConfirm: true, index})}>删除</Button>
                    </FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.contract,
    contractList: state.contractList
  }
}

export default connect(mapStateToProps, {fetchList, removeContract})(Contract)
