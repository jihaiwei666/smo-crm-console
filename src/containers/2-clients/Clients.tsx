/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import {connect} from 'react-redux'

import './clients.scss'
import Button from '../../components/button/Button'

import * as actions from './clients.action'
import AddClientDialog from './dialog/AddClientDialog'

interface ClientsProps {
  fetchList: any
}

class Clients extends React.Component<ClientsProps> {
  state = {
    showAddClientDialog: true,
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
    // this.toPage(0)
  }

  render() {
    return (
      <div className="clients">
        {
          this.state.showAddClientDialog && (
            <AddClientDialog
              onExited={() => this.setState({showAddClientDialog: false})}/>
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showAddClientDialog: true})}>创建</Button>
          <Button>导入数据</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(Clients)
