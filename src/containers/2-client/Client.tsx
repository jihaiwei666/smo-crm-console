/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'

import './client.scss'
import ClientState from './ClientState'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import {fetchList} from './client.action'
import AddClientDialog from './dialog/AddClientDialog'
import UpdateClientDialog from './dialog/UpdateClientDialog'
import {handleListData} from '../../reducers/data.reducer'
import PageCountNav from '../../components/nav/PageCountNav'
import FilterButton from '../common/FilterButton'
import FilterItem from '../../components/query-filter/FilterItem'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import {customerTypeOptions, customerOwnerOptions, createOptions} from './customer.constant'
import tipAndClear from './tipAndClear'
import {getCustomerType} from './client.helper'

interface ClientsProps extends AppFunctionPage, ClientState {
  clientList: any[]
}

class Clients extends React.Component<ClientsProps> {
  state = {
    index: -1,
    showAddClientDialog: false,
    showEditClientDialog: false,
    showDeleteClientConfirm: false,

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

  componentDidMount() {
    this.toPage(0)
  }

  componentDidUpdate() {
    setTimeout(() => tipAndClear(this), 0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.clientList)
    const item = list[this.state.index] || {}

    let customerId = item.customerId
    /*if (process.env.NODE_ENV != 'production') {
      customerId = '170813095012658230'
    }*/

    return (
      <div className="app-function-page clients">
        {
          this.state.showAddClientDialog && (
            <AddClientDialog
              onExited={() => this.setState({showAddClientDialog: false})}/>
          )
        }
        {
          this.state.showEditClientDialog && (
            <UpdateClientDialog
              customerId={customerId}
              onExited={() => this.setState({showEditClientDialog: false})}/>
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showAddClientDialog: true})}>
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
                      <Button className="small" onClick={() => this.setState({showEditClientDialog: true, index})}>查看</Button>
                      <Button className="small danger" onClick={() => this.setState({showDeleteClientConfirm: true, index})}>删除</Button>
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
    ...state.client,
    clientList: state.clientList
  }
}

export default connect(mapStateToProps, {fetchList})(Clients)
