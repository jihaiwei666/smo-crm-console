/**
 * Created by jiangyukun on 2017/7/3.
 */
import AppFunctionPage from '../common/interface/AppFunctionPage'

import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import AddAccountDialog from './dialog/AddAccountDialog'
import UpdateAccountDialog from './dialog/UpdateAccountDialog'

import {accountStatus} from './account-manage.constant'
import {handleListData} from '../common/common.helper'
import {getPositionName} from './account-manage.helper'
import * as actions from './account-manage.action'

interface AccountManageProps extends AppFunctionPage {
  accountList: any
  addAccount: any
  updateAccount: any
  disableAccount: any
  resetPassword: any

  addAccountSuccess: boolean
  updateAccountSuccess: boolean
  disableAccountSuccess: boolean
  resetPasswordSuccess: boolean
}

class AccountManage extends React.Component<AccountManageProps> {
  state = {
    index: -1,
    currentPage: 0,
    showAddDialog: false,
    showEditDialog: false,
    showDisabledConfirm: false
  }

  toPage = (newPage?: number) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage)
  }

  disableAccount = () => {
    const item = this.props.accountList.data.list[this.state.index]
    this.props.disableAccount(item['user_id'], item['account_status'] === accountStatus.disabled ? accountStatus.enabled : accountStatus.disabled)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: AccountManageProps) {
    if (!this.props.addAccountSuccess && nextProps.addAccountSuccess) {
      this.props.showSuccess('新增账号成功！')
      this.toPage(0)
    }
    if (!this.props.updateAccountSuccess && nextProps.updateAccountSuccess) {
      this.props.showSuccess('更新账号信息成功！')
      this.toPage()
    }
    if (!this.props.disableAccountSuccess && nextProps.disableAccountSuccess) {
      const item = this.props.accountList.data.list[this.state.index]
      const msg = item['account_status'] === accountStatus.disabled ? '禁用账号信息成功! ' : '启用账号信息成功! '
      this.props.showSuccess(msg)
      this.toPage()
    }
    if (!this.props.resetPasswordSuccess && nextProps.resetPasswordSuccess) {
      this.props.showSuccess('重置密码成功！')
    }
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.accountList)

    const item = list[this.state.index] || {}

    return (
      <div className="app-function-page account-manage">
        {
          this.state.showAddDialog && (
            <AddAccountDialog
              addAccount={this.props.addAccount}
              addAccountSuccess={this.props.addAccountSuccess}
              onExited={() => this.setState({showAddDialog: false})}/>
          )
        }
        {
          this.state.showEditDialog && (
            <UpdateAccountDialog
              accountInfo={item}
              updateAccount={this.props.updateAccount}
              updateAccountSuccess={this.props.updateAccountSuccess}
              resetPassword={this.props.resetPassword}
              resetPasswordSuccess={this.props.resetPasswordSuccess}
              onExited={() => this.setState({showEditDialog: false})}
            />
          )
        }
        {
          this.state.showDisabledConfirm && (
            <Confirm
              message={list[this.state.index]['account_status'] === accountStatus.disabled ? '确定停用此账号吗?' : '确定启用此账号吗?'}
              onExited={() => this.setState({showDisabledConfirm: false})} onConfirm={this.disableAccount}/>
          )
        }

        <div className="m10">
          <Button onClick={() => this.setState({showAddDialog: true})}>创建账号</Button>
        </div>
        <FixHeadList>
          <FixHead>
            <FixHead.Item>账号</FixHead.Item>
            <FixHead.Item>姓名</FixHead.Item>
            <FixHead.Item>简称（用于生成编号）</FixHead.Item>
            <FixHead.Item>岗位类别</FixHead.Item>
            <FixHead.Item>操作</FixHead.Item>
          </FixHead>
          <FixBody>
            {
              list.map((item, index) => {
                return (
                  <FixRow key={item['user_id']}
                          onClick={() => this.setState({index})}
                          selected={this.state.index == index}>
                    <FixRow.Item>{item['user_account']}</FixRow.Item>
                    <FixRow.Item>{item['user_name']}</FixRow.Item>
                    <FixRow.Item>{item['user_short_name']}</FixRow.Item>
                    <FixRow.Item>{getPositionName(item['post_type'])}</FixRow.Item>
                    <FixRow.Item>
                      <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>修改</Button>
                      <Button className="small danger"
                              onClick={() => this.setState({
                                showDisabledConfirm: true,
                                index
                              })}>{item['account_status'] === accountStatus.disabled ? '停用' : '已停用'}</Button>
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
    ...state.accountManage,
    accountList: state.accountList
  }
}

export default connect(mapStateToProps, actions)(AccountManage)
