/**
 * Created by jiangyukun on 2017/7/7.
 */
import AppFunctionPage from '../common/interface/AppFunctionPage'

import React from 'react'
import {connect} from 'react-redux'

import './client.scss'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import * as actions from './client.action'
import AddClientDialog from './dialog/AddClientDialog'
import UpdateClientDialog from './dialog/UpdateClientDialog'
import {handleListData} from '../../reducers/data.reducer'
import {CLIENTS} from '../../core/constants/types'

interface ClientsProps extends AppFunctionPage {
  clientList: any[]
  fetchList: any

  updateCustomerSuccess: boolean
  updateBdAndBdpcSuccess: boolean
  addSupplierSuccess: boolean
  updateSupplierSuccess: boolean
}

class Clients extends React.Component<ClientsProps> {
  state = {
    index: -1,
    showAddClientDialog: false,
    showEditClientDialog: true,
    showDeleteClientConfirm: false,

    currentPage: 0,
  }

  toPage = (newPage) => {
    if (newPage && newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
    })
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: ClientsProps) {
    if (!this.props.updateCustomerSuccess && nextProps.updateCustomerSuccess) {
      this.props.showSuccess('更新客户信息成功！')
      this.props.clearState(CLIENTS.UPDATE_CUSTOMER)
    }
    if (!this.props.updateBdAndBdpcSuccess && nextProps.updateBdAndBdpcSuccess) {
      this.props.showSuccess('更新 所有人、所属BDPC 成功！')
      this.props.clearState(CLIENTS.UPDATE_CUSTOMER)
    }
    if (!this.props.addSupplierSuccess && nextProps.addSupplierSuccess) {
      this.props.showSuccess('添加供应商成功！')
      this.props.clearState(CLIENTS.ADD_SUPPLIER)
    }
    if (!this.props.updateSupplierSuccess && nextProps.updateSupplierSuccess) {
      this.props.showSuccess('更新供应商信息成功！')
      this.props.clearState(CLIENTS.UPDATE_SUPPLIER)
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.clientList)
    const item = list[this.state.index] || {}

    let customerId = item.customerId
    if (process.env.NODE_ENV != 'production') {
      customerId = '170712104134682784'
    }

    return (
      <div className="clients">
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
          <Button onClick={() => this.setState({showAddClientDialog: true})}>创建</Button>
          <Button>导入数据</Button>
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
                    <FixRow.Item>{item['customerCategory']}</FixRow.Item>
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

export default connect(mapStateToProps, actions)(Clients)
