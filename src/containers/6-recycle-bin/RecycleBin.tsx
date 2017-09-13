/**
 * 回收站
 * Created by jiangyukun on 2017/7/18.
 */
import React from 'react'
import {connect} from 'react-redux'
import ScrollContainer from 'app-core/core/ScrollContainer'

import DownloadFile from '../../components/file/DownloadFile'

import Data from '../common/interface/Data'
import AppFunctionPage from '../common/interface/AppFunctionPage'
import {handlePageListData} from '../../reducers/page-list.reducer'
import {fetchList} from './recycle-bin.action'

interface RecycleBinProps extends AppFunctionPage {
  recycleBinList: Data<any>
}

class RecycleBin extends React.Component<RecycleBinProps> {
  start = 0
  state = {
    index: -1,
  }

  loadMore = () => {
    const {total, list} = handlePageListData(this.props.recycleBinList)
    if (total <= list.length) return
    this.start++
    this.props.fetchList(this.start)
  }

  componentDidMount() {
    this.props.fetchList(this.start)
  }

  render() {
    const {total, list, loading, loaded} = handlePageListData(this.props.recycleBinList)

    return (
      <div className="app-function-page">
        <ScrollContainer className="recycle-bin-container" onScrollBottom={this.loadMore}>
          {
            list.map((item, index) => {
              return (
                <div key={index} className="m10">
                <span className="mr10">
                  {item.name}
                </span>
                  <DownloadFile url={item.url}>
                    下载
                  </DownloadFile>
                </div>
              )
            })
          }
          {
            list.length < total && (
              <a className="load-more" onClick={this.loadMore}>加载更多</a>
            )
          }
        </ScrollContainer>
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
