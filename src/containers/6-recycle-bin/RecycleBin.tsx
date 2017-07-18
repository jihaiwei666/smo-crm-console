/**
 * 回收站
 * Created by jiangyukun on 2017/7/18.
 */
import AppFunctionPage from '../common/interface/AppFunctionPage'

import React from 'react'
import {connect} from 'react-redux'

import {fetchList} from './recycle-bin.action'

interface RecycleBinProps extends AppFunctionPage {

}

class RecycleBin extends React.Component<RecycleBinProps> {
  state = {
    index: -1,
    currentPage: 0,
  }

  toPage = (newPage) => {
    if (newPage && newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage)
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    return null
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, {fetchList})(RecycleBin)
