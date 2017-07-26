/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'

import './client.scss'
import AppFunctionPage from '../common/interface/AppFunctionPage'
import ClientState from './ClientState'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import {fetchList} from './client.action'
import AddClientDialog from './dialog/AddClientDialog'
import UpdateClientDialog from './dialog/UpdateClientDialog'
import {handleListData} from '../../reducers/data.reducer'
import {CLIENTS} from '../../core/constants/types'
import PageCountNav from '../../components/nav/PageCountNav'

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
  }

  toPage = (newPage?: number) => {
    if (newPage && newPage != this.state.currentPage) {
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
    setTimeout(() => this.tipAndClear(), 0)
  }

  tipAndClear() {
    if (this.props.addCustomerSuccess) {
      this.props.showSuccess('添加客户信息成功！')
      this.props.clearState(CLIENTS.ADD_CUSTOMER)
      this.toPage(0)
    }
    if (this.props.updateCustomerSuccess) {
      this.props.showSuccess('更新客户信息成功！')
      this.props.clearState(CLIENTS.UPDATE_CUSTOMER)
      this.refreshCurrentPage()
    }
    if (this.props.updateBdAndBdpcSuccess) {
      this.props.showSuccess('更新 所有人、所属BDPC 成功！')
      this.props.clearState(CLIENTS.UPDATE_BD_AND_BDPC)
      this.refreshCurrentPage()
    }
    if (this.props.addSubCompanySuccess) {
      this.props.showSuccess('添加子公司成功！')
      this.props.clearState(CLIENTS.ADD_SUB_COMPANY)
    }
    if (this.props.updateSubCompanySuccess) {
      this.props.showSuccess('更新子公司信息成功！')
      this.props.clearState(CLIENTS.UPDATE_SUB_COMPANY)
    }
    if (this.props.removeSubCompanySuccess) {
      this.props.showSuccess('删除子公司信息成功！')
      this.props.clearState(CLIENTS.REMOVE_SUB_COMPANY)
    }
    if (this.props.addContactSuccess) {
      this.props.showSuccess('添加联系人成功！')
      this.props.clearState(CLIENTS.ADD_CONTACT)
    }
    if (this.props.updateContactSuccess) {
      this.props.showSuccess('更新联系人信息成功！')
      this.props.clearState(CLIENTS.UPDATE_CONTACT)
    }
    if (this.props.removeContactSuccess) {
      this.props.showSuccess('删除联系人成功！')
      this.props.clearState(CLIENTS.REMOVE_CONTACT)
    }
    if (this.props.addVisitRecordSuccess) {
      this.props.showSuccess('添加随访记录成功！')
      this.props.clearState(CLIENTS.ADD_VISIT_RECORD)
    }
    if (this.props.updateVisitRecordSuccess) {
      this.props.showSuccess('更新随访记录成功！')
      this.props.clearState(CLIENTS.UPDATE_VISIT_RECORD)
    }
    if (this.props.removeVisitRecordSuccess) {
      this.props.showSuccess('删除随访记录成功！')
      this.props.clearState(CLIENTS.REMOVE_VISIT_RECORD)
    }
    if (this.props.addCdaSuccess) {
      this.props.showSuccess('添加CDA成功！')
      this.props.clearState(CLIENTS.ADD_CDA)
    }
    if (this.props.updateCdaSuccess) {
      this.props.showSuccess('更新CDA成功！')
      this.props.clearState(CLIENTS.UPDATE_CDA)
    }
    if (this.props.removeCdaSuccess) {
      this.props.showSuccess('删除CDA成功！')
      this.props.clearState(CLIENTS.REMOVE_CDA)
    }
    if (this.props.addSupplierSuccess) {
      this.props.showSuccess('添加供应商成功！')
      this.props.clearState(CLIENTS.ADD_SUPPLIER)
    }
    if (this.props.updateSupplierSuccess) {
      this.props.showSuccess('更新供应商信息成功！')
      this.props.clearState(CLIENTS.UPDATE_SUPPLIER)
    }
    if (this.props.addRfiSuccess) {
      this.props.showSuccess('新增RFI信息成功！')
      this.props.clearState(CLIENTS.ADD_RFI)
    }
    if (this.props.updateRfiSuccess) {
      this.props.showSuccess('更新RFI信息成功！')
      this.props.clearState(CLIENTS.UPDATE_RFI)
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.clientList)
    const item = list[this.state.index] || {}

    let customerId = item.customerId
    /*if (process.env.NODE_ENV != 'production') {
      customerId = '170712104134682784'
    }*/

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
