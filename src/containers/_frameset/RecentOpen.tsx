/**
 * Created by jiangyukun on 2017/7/21.
 */
import React from 'react'

import UpdateCustomerDialog from '../2-customer/dialog/UpdateCustomerDialog'
import UpdateProjectDialog from '../3-project/dialog/UpdateProjectDialog'
import UpdateContractDialog from '../4-contract/dialog/UpdateContractDialog'

import List from '../common/interface/List'
import {handleListData} from '../common/common.helper'
import {getRecentOpenTypeText} from '../common/common.helper'

interface RecentOpenProps {
  recentOpenList: List<any>
}

class RecentOpen extends React.Component<RecentOpenProps> {
  state = {
    module: '',
    moduleId: ''
  }

  render() {
    let {list} = handleListData(this.props.recentOpenList)

    return (
      <div className="recent-open">
        {
          this.state.module == '1' && this.state.moduleId && (
            <UpdateCustomerDialog
              customerId={this.state.moduleId}
              onExited={() => this.setState({moduleId: ''})}
            />
          )
        }
        {
          this.state.module == '2' && this.state.moduleId && (
            <UpdateProjectDialog
              projectId={this.state.moduleId}
              onExited={() => this.setState({moduleId: ''})}
            />
          )
        }
        {
          this.state.module == '3' && this.state.moduleId && (
            <UpdateContractDialog
              contractId={this.state.moduleId}
              onExited={() => this.setState({moduleId: ''})}
            />
          )
        }

        <header>最近打开</header>
        <main>
          <ul className="nav-items">
            {
              list.map(item => {
                return (
                  <li key={item.id} onClick={() => this.setState({module: item.module, moduleId: item.moduleId})}>
                    <a>
                      <span className="recent-open-type">
                        {getRecentOpenTypeText(item.module)}
                      </span>
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
