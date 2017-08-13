/**
 * Created by jiangyukun on 2017/7/21.
 */
import React from 'react'
import List from '../common/interface/List'
import {handlePageListData} from '../../reducers/page-list.reducer'

interface RecentOpenProps {
  recentOpenList: List<any>
}

class RecentOpen extends React.Component<RecentOpenProps> {
  render() {
    let {list} = handlePageListData(this.props.recentOpenList)

    return (
      <div className="recent-open">
        <header>最近打开</header>
        <main>
          <ul className="nav-items">
            {
              list.map((item, index) => {
                return (
                  <li key={index}>
                    <a>
                      {item.name}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </main>
      </div>
    )
  }
}

export default RecentOpen
