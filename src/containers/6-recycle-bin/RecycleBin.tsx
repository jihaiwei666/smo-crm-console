/**
 * 回收站
 * Created by jiangyukun on 2017/7/18.
 */
import React from 'react'
import {connect} from 'react-redux'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import Data from '../common/interface/Data'
import {handleListData} from '../common/common.helper'
import {fetchList} from './recycle-bin.action'

interface RecycleBinProps extends AppFunctionPage {
  recycleBinList: Data<any>
}

class RecycleBin extends React.Component<RecycleBinProps> {
  state = {
    index: -1,
    currentPage: 0,
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList(newPage)
  }

  componentDidMount() {
    this.toPage(0)
  }

  render() {
    const {total, list, loading, loaded} = handleListData(this.props.recycleBinList)
    return (
      <div className="app-function-page">
        {
          list.map((item, index) => {
            return (
              <div key={index} className="m10">
                <span className="mr10">
                  {item.name}
                </span>
                <a target="__blank" href={item.url}>下载</a>
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recycleBinList: state.recycleBinList
  }
}

export default connect(mapStateToProps, {fetchList})(RecycleBin)
