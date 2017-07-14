/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import './clients.scss'
import Button from '../../components/button/Button'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'

import * as actions from './clients.action'
import AddClientDialog from './dialog/AddClientDialog'
import UpdateClientDialog from './dialog/UpdateClientDialog'
import {handleListData} from '../../reducers/data.reducer'

interface ClientsProps extends AppFunctionPage {
  clientList: any[]
  fetchList: any
}

class Clients extends React.Component<ClientsProps> {
  state = {
    index: -1,
    showAddClientDialog: false,
    showEditClientDialog: false,
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

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.clientList)
    const item = list[this.state.index]

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
              customerId={item.customerId}
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
    ...state.clients,
    clientList: state.clientList
  }
}

export default connect(mapStateToProps, actions)(Clients)
