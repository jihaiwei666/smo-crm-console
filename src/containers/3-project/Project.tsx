/**
 * Created by jiangyukun on 2017/7/18.
 */
import AppFunctionPage from '../common/interface/AppFunctionPage'

import React from 'react'
import {connect} from 'react-redux'

import './project.scss'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import {handleListData} from '../../reducers/data.reducer'
import Button from '../../components/button/Button'

import {fetchList} from './project.action'

interface ProjectProps extends AppFunctionPage {
  projectList: any
}

class Project extends React.Component<ProjectProps> {
  state = {
    index: -1,
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
    const {total, list, loading, loaded} = handleListData(this.props.projectList)

    return (
      <div className="project">
        <FixHeadList>
          <FixHead>
            <FixHead.Item>客户名称</FixHead.Item>
            <FixHead.Item>项目名称</FixHead.Item>
            <FixHead.Item>项目编码</FixHead.Item>
            <FixHead.Item>BD</FixHead.Item>
            <FixHead.Item>BDPC</FixHead.Item>
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
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
                    <FixRow.Item>{item['']}</FixRow.Item>
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
    projectList: state.projectList
  }
}

export default connect(mapStateToProps, {fetchList})(Project)
