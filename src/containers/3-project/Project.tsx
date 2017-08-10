/**
 * Created by jiangyukun on 2017/7/18.
 */
import AppFunctionPage from '../common/interface/AppFunctionPage'

import React from 'react'
import {connect} from 'react-redux'

import './project.scss'
import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import Button from '../../components/button/Button'
import AddProjectDialog from './dialog/AddProjectDialog'

import {fetchList} from './project.action'
import {handleListData} from '../../reducers/data.reducer'
import UpdateProjectDialog from './dialog/UpdateProjectDialog'
import PageCountNav from '../../components/nav/PageCountNav'

interface ProjectProps extends AppFunctionPage {
  projectList: any
}

class Project extends React.Component<ProjectProps> {
  state = {
    index: -1,
    currentPage: 0,
    showAddDialog: false,
    showEditDialog: false,
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
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
    const item = list[this.state.index]

    return (
      <div className="app-function-page project">
        {
          this.state.showAddDialog && (
            <AddProjectDialog
              onExited={() => this.setState({showAddDialog: false})}
            />
          )
        }
        {
          this.state.showEditDialog && (
            <UpdateProjectDialog
              projectId={item.projectId}
              onExited={() => this.setState({showEditDialog: false})}
            />
          )
        }
        <div className="m15">
          <Button onClick={() => this.setState({showAddDialog: true})}>创建</Button>
        </div>
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
                  <FixRow key={item.projectId}
                          selected={this.state.index == index}
                          onClick={() => this.setState({index})}
                  >
                    <FixRow.Item>{item['customerName']}</FixRow.Item>
                    <FixRow.Item>{item['projectName']}</FixRow.Item>
                    <FixRow.Item>{item['projectCode']}</FixRow.Item>
                    <FixRow.Item>{item['bd']}</FixRow.Item>
                    <FixRow.Item>{item['bdpc']}</FixRow.Item>
                    <FixRow.Item>
                      <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>查看</Button>
                      <Button className="small danger" onClick={() => this.setState({showDeleteConfirm: true, index})}>删除</Button>
                    </FixRow.Item>
                  </FixRow>
                )
              })
            }
          </FixBody>
        </FixHeadList>
        <PageCountNav currentPage={this.state.currentPage} total={total} onPageChange={this.toPage}/>
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
