/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import './account-manage.scss'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import AddAccountDialog from './dialog/AddAccountDialog'
import UpdateAccountDialog from './dialog/UpdateAccountDialog'

import * as actions from './account-manage.action'
import {ACCOUNT_MANAGE} from '../../core/constants/types'

class AccountManage extends React.Component<any> {
  state = {
    index: -1,
    currentPage: 0,
    showAddDialog: false,
    showEditDialog: false,
    showDisabledConfirm: false
  }

  disableAccount = () => {
    const item = this.props.accountList.data.list[this.state.index]
    this.props.disableAccount(item['user_id'])
  }

  componentDidMount() {
    this.props.fetchList(this.state.currentPage)
  }

  componentDidUpdate() {
    if (this.props.addAccountSuccess) {
      this.props.showSuccess('添加账号成功！')
      this.props.clearState(ACCOUNT_MANAGE.ADD_ACCOUNT)
    }
    if (this.props.updateAccountSuccess) {
      this.props.showSuccess('更新账号信息成功！')
      this.props.clearState(ACCOUNT_MANAGE.UPDATE_ACCOUNT)
    }
  }

  render() {
    const {data, loading, loaded} = this.props.accountList
    let total = 0, list = []
    if (data) {
      total = data.total
      list = data.list
    }
    const item = list[this.state.index] || {}

    return (
      <div className="account-manage">
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
            <Confirm message="确定停用此账号吗？" onExited={() => this.setState({showDisabledConfirm: false})} onConfirm={() => null}/>
          )
        }

        <div className="m10">
          <Button onClick={() => this.setState({showAddDialog: true})}>创建账号</Button>
        </div>
        <FixHeadList weights={[]}>
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
                    <FixRow.Item>{item['user_short_name']}</FixRow.Item>
                    <FixRow.Item>{item['user_name']}</FixRow.Item>
                    <FixRow.Item>{item['post_type']}</FixRow.Item>
                    <FixRow.Item>
                      <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>修改</Button>
                      <Button className="small" onClick={() => this.setState({showDisabledConfirm: true, index})}>停用</Button>
                    </FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={() => null}/>
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
