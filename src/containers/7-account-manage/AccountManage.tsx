/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {connect} from 'react-redux'

import './account-manage.scss'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import PageCountNav from '../../components/nav/PageCountNav'
import AddAccountDialog from './dialog/AddAccountDialog'

import * as actions from './account-manage.action'

class AccountManage extends React.Component<any> {
  state = {
    index: -1,
    showAdd: false
  }

  componentDidMount() {
    this.props.fetchList(0)
  }

  render() {
    const {data, loading, loaded} = this.props.accountList
    let total = 0, list = []
    if (data) {
      total = data.total
      list = data.list
    }

    return (
      <div className="account-manage">
        {
          this.state.showAdd && (
            <AddAccountDialog onExited={() => this.setState({showAdd: false})}/>
          )
        }

        <div className="m10">
          <Button onClick={() => this.setState({showAdd: true})}>创建账号</Button>
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
                    <FixRow.Item>{item['']}</FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={0} total={total} onPageChange={() => null}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    accountList: state.accountList
  }
}

export default connect(mapStateToProps, actions)(AccountManage)
