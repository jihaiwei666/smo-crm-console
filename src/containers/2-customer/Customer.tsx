/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import CustomerState from './CustomerState'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import AddCustomerDialog from './dialog/AddCustomerDialog'
import UpdateCustomerDialog from './dialog/UpdateCustomerDialog'
import {handleListData} from '../../reducers/data.reducer'
import PageCountNav from '../../components/nav/PageCountNav'
import FilterButton from '../common/FilterButton'
import FilterItem from '../../components/query-filter/FilterItem'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import {customerTypeOptions, customerOwnerOptions, createOptions} from './customer.constant'
import {fetchList} from './customer.action'
import {getCustomerType} from './customer.helper'

interface CustomerProps extends AppFunctionPage, CustomerState {
  customerList: any[]
}

class Customer extends React.Component<CustomerProps> {
  state = {
    index: -1,
    showAddDialog: false,
    showEditDialog: false,
    showDeleteConfirm: false,

    currentPage: 0,
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
    })
  }

  refreshCurrentPage = () => {
    this.toPage(this.state.currentPage)
  }

  removeCustomer = () => {

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
    if (!this.props.updateBdAndBdpcSuccess && nextProps.updateBdAndBdpcSuccess) {
      this.refreshCurrentPage()
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.customerList)
    const item = list[this.state.index] || {}

    let customerId = item.customerId
    /*if (process.env.NODE_ENV != 'production') {
      customerId = '170813095012658230'
    }*/

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
          <Button onClick={() => this.setState({showAddDialog: true})}>
            <img className="btn-icon" src={require('./icon/create-cust.svg')}/>
            创建
          </Button>
          <Button>导入数据</Button>
          <div className="pull-right">
            <FilterButton show={true} onChange={() => null}/>
          </div>
        </div>

        <div className="query-filter">
          <FilterItem
            label="客户类型" itemList={customerTypeOptions}
            value={this.state.customerType} onChange={v => this.setState({customerType: v})}
          />
          <FilterItem
            label="客户所有人" itemList={customerOwnerOptions}
            value={this.state.customerOwner} onChange={v => this.setState({customerOwner: v})}
          />
          <FilterItem
            label="创建人" itemList={createOptions}
            value={this.state.creator} onChange={v => this.setState({creator: v})}
          />
        </div>

        <FixHeadList>
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
    ...state.customer,
    customerList: state.customerList
  }
}

export default connect(mapStateToProps, {fetchList})(Customer)
