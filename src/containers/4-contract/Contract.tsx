/**
 * Created by jiangyukun on 2017/7/18.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import Button from '../../components/button/Button'
import PageCountNav from '../../components/nav/PageCountNav'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import AddContractDialog from './dialog/AddContractDialog'
import UpdateContractDialog from './dialog/UpdateContractDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import {handleListData, getNameAndEmail, getOperation} from '../common/common.helper'
import {getContractType} from './contract.helper'
import {fetchList, removeContract} from './contract.action'
import FilterItem from '../../components/query-filter/FilterItem'
import Input from '../../components/form/Input'
import FilterOptions from '../../components/query-filter/FilterOptions'
import FilterButton from '../common/FilterButton'
import {filter} from './contract.constant'

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
    showDeleteConfirm: false,
    showFilter: false,

    contractName: '',
    contractCode: '',
    contractType: '',
    bd: '',
    bdpc: ''
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
      "contract_name": this.state.contractName,
      "contract_code": this.state.contractCode,
      "contract_type": this.state.contractType,
      "customer_the_bd": this.state.bd,
      "customer_the_bdpc": this.state.bdpc,
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
    const buttonOperation = getOperation(this.props.contractList)
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
          {
            buttonOperation.canCreate && (
              <Button onClick={() => this.setState({showAddDialog: true})}>创建</Button>
            )
          }
          <div className="pull-right">
            <FilterButton onClick={() => this.setState({showFilter: !this.state.showFilter})}/>
          </div>
        </div>
        {
          this.state.showFilter && (
            <div className="query-filter">
              <FilterItem label="合同名称">
                <Input
                  className="small"
                  placeholder="请输入合同名称"
                  value={this.state.contractName} onChange={v => this.setState({contractName: v})}
                />
              </FilterItem>
              <FilterItem label="合同编号">
                <Input
                  className="small"
                  placeholder="请输入合同编号"
                  value={this.state.contractCode} onChange={v => this.setState({contractCode: v})}
                />
              </FilterItem>
              <FilterItem label="合同类型">
                <FilterOptions options={filter.contractType} useSelect={true} value={this.state.contractType} onChange={v => this.setState({contractType: v})}/>
              </FilterItem>
              <FilterItem label="所属BD">
                <FilterOptions options={[{value: '1', text: '只看我的'}]} value={this.state.bd} onChange={v => this.setState({bd: v})}/>
              </FilterItem>
              <FilterItem label="所属BDPC">
                <FilterOptions options={[{value: '1', text: '只看我的'}]} value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}/>
              </FilterItem>
              <div className="bt clearfix">
                <div className="pull-right mt7">
                  <Button
                    className="default"
                    onClick={() => this.setState({contractName: '', contractCode: '', contractType: '', bd: '', bdpc: ''})}
                  >清除</Button>
                  <Button onClick={() => this.toPage(0)}>确定</Button>
                </div>
              </div>
            </div>
          )
        }
        <FixHeadList total={total} weights={[3, 2, 1, 2, 2, 1]}>
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
                    <FixRow.Item>{getNameAndEmail(item.bdName, item.bd)}</FixRow.Item>
                    <FixRow.Item>{getNameAndEmail(item.bdpcName, item.bdpc)}</FixRow.Item>
                    <FixRow.Item>
                      {
                        item.operation.canEdit && (
                          <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>查看</Button>
                        )
                      }
                      {
                        item.operation.canDelete && (
                          <Button className="small danger" onClick={() => this.setState({showDeleteConfirm: true, index})}>删除</Button>
                        )
                      }
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
