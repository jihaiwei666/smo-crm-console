/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import CustomerState from './CustomerState'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import Input from '../../components/form/Input'
import FilterOptions from '../../components/query-filter/FilterOptions'
import PageCountNav from '../../components/nav/PageCountNav'
import FilterButton from '../common/FilterButton'
import FilterItem from '../../components/query-filter/FilterItem'
import AddCustomerDialog from './dialog/AddCustomerDialog'
import UpdateCustomerDialog from './dialog/UpdateCustomerDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import Data from '../common/interface/Data'
import {customerTypeOptions, customerOwnerOptions, createOptions} from './customer.constant'
import {CUSTOMER} from '../../core/constants/types'
import {handleListData, getOperation} from '../common/common.helper'
import {getCustomerType} from './customer.helper'
import {fetchList, removeCustomer} from './customer.action'

interface CustomerProps extends AppFunctionPage, CustomerState {
  customerList: Data<any>
  removeCustomer: (customerId) => void
}

const showEdit = process.env.NODE_ENV != 'production'

class Customer extends React.Component<CustomerProps> {
  state = {
    index: -1,
    showAddDialog: true,
    showEditDialog: false,
    showDeleteConfirm: false,

    currentPage: 0,
    showFilter: false,
    customerName: '',
    customerType: '',
    customerOwner: '',
    creator: '',
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
      "customer_name": this.state.customerName,
      "customer_type": this.state.customerType,
      "customer_owner": this.state.customerOwner,
      "create_person": this.state.creator,
    })
  }

  refreshCurrentPage = () => {
    this.toPage(this.state.currentPage)
  }

  removeCustomer = () => {
    let item = this.props.customerList.data.list[this.state.index]
    this.props.removeCustomer(item.customerId)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: CustomerProps) {
    if (!this.props.addCustomerSuccess && nextProps.addCustomerSuccess) {
      this.toPage(0)
    }
    if (!this.props.updateCustomerSuccess && nextProps.updateCustomerSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.removeCustomerSuccess && nextProps.removeCustomerSuccess) {
      this.props.showSuccess('删除客户成功！')
      this.props.clearState(CUSTOMER.REMOVE_CUSTOMER)
      const {total} = handleListData(this.props.customerList)
      if (total % 10 == 1) {
        this.toPage(0)
      } else {
        this.refreshCurrentPage()
      }
    }
    if (!this.props.updateBdAndBdpcSuccess && nextProps.updateBdAndBdpcSuccess) {
      this.refreshCurrentPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.customerList)
    const operation = getOperation(this.props.customerList)
    const item = list[this.state.index] || {}

    let customerId = item.customerId
    if (!customerId && process.env.NODE_ENV != 'production') {
      customerId = '170824000310391664'
    }

    return (
      <div className="app-function-page customer">
        {
          this.state.showAddDialog && (
            <AddCustomerDialog
              onExited={() => this.setState({showAddDialog: false})}/>
          )
        }
        {
          this.state.showEditDialog && (
            <UpdateCustomerDialog
              customerId={customerId}
              onExited={() => this.setState({showEditDialog: false})}/>
          )
        }
        {
          this.state.showDeleteConfirm && (
            <Confirm
              message="确定删除此客户吗？"
              onExited={() => this.setState({showDeleteConfirm: false})}
              onConfirm={this.removeCustomer}
            />
          )
        }

        <div className="m15">
          {
            operation.canCreate && (
              <Button onClick={() => this.setState({showAddDialog: true})}>
                <img className="btn-icon" src={require('./icon/create-cust.svg')}/>创建
              </Button>
            )
          }
          <div className="pull-right">
            <FilterButton onClick={() => this.setState({showFilter: !this.state.showFilter})}/>
          </div>
        </div>

        {
          this.state.showFilter && (
            <div className="query-filter">
              <FilterItem label="客户名称">
                <Input
                  className="small"
                  placeholder="请输入客户名称"
                  value={this.state.customerName} onChange={v => this.setState({customerName: v})}
                />
              </FilterItem>
              <FilterItem label="客户类型">
                <FilterOptions options={customerTypeOptions} value={this.state.customerType} onChange={v => this.setState({customerType: v})}/>
              </FilterItem>
              <FilterItem label="客户所有人">
                <FilterOptions options={customerOwnerOptions} value={this.state.customerOwner} onChange={v => this.setState({customerOwner: v})}/>
              </FilterItem>
              <FilterItem label="创建人">
                <FilterOptions options={createOptions} value={this.state.creator} onChange={v => this.setState({creator: v})}/>
              </FilterItem>
              <div className="bt clearfix">
                <div className="pull-right mt7">
                  <Button
                    className="default"
                    onClick={() => this.setState({customerName: '', customerType: '', customerOwner: '', creator: ''})}
                  >清除</Button>
                  <Button onClick={() => this.toPage(0)}>确定</Button>
                </div>
              </div>
            </div>
          )
        }

        <FixHeadList total={total}>
          <FixHead>
            <FixHead.Item>客户名称</FixHead.Item>
            <FixHead.Item>客户类型</FixHead.Item>
            <FixHead.Item>客户所有人</FixHead.Item>
            <FixHead.Item>创建人</FixHead.Item>
            <FixHead.Item>操作</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item.customerId}
                          selected={this.state.index == index}
                          onClick={() => this.setState({index})}
                  >
                    <FixRow.Item>{item['customerName']}</FixRow.Item>
                    <FixRow.Item>{getCustomerType(item['customerCategory'])}</FixRow.Item>
                    <FixRow.Item>{item['customerOwner']}</FixRow.Item>
                    <FixRow.Item>{item['customerCreator']}</FixRow.Item>
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
    ...state.customer,
    customerList: state.customerList
  }
}

export default connect(mapStateToProps, {fetchList, removeCustomer})(Customer)
