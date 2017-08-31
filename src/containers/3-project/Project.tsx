/**
 * Created by jiangyukun on 2017/7/18.
 */
import React from 'react'
import {connect} from 'react-redux'
import Confirm from 'app-core/common/Confirm'

import {FixHeadList, FixHead, FixBody, FixRow} from '../../components/fix-head-list/'
import Button from '../../components/button/Button'
import AddProjectDialog from './dialog/AddProjectDialog'

import AppFunctionPage from '../common/interface/AppFunctionPage'
import UpdateProjectDialog from './dialog/UpdateProjectDialog'
import PageCountNav from '../../components/nav/PageCountNav'

import {fetchList, removeProject} from './project.action'
import {handleListData, getNameAndEmail} from '../common/common.helper'
import ProjectState from './ProjectState'
import {PROJECT} from '../../core/constants/types'

interface ProjectProps extends AppFunctionPage, ProjectState {
  projectList: any
  removeProject: (projectId) => void
}

class Project extends React.Component<ProjectProps> {
  state = {
    index: -1,
    currentPage: 0,
    showAddDialog: false,
    showEditDialog: false,
    showDeleteConfirm: false
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

  refreshCurrentPage = () => {
    this.toPage(this.state.currentPage)
  }

  removeProject = () => {
    let item = this.props.projectList.data.list[this.state.index]
    this.props.removeProject(item.projectId)
  }

  componentDidMount() {
    this.toPage(0)
  }

  componentWillReceiveProps(nextProps: ProjectProps) {
    if (!this.props.addProjectInfoSuccess && nextProps.addProjectInfoSuccess) {
      this.toPage(0)
    }
    if (!this.props.updateProjectInfoSuccess && nextProps.updateProjectInfoSuccess) {
      this.toPage(0)
    }
    if (!this.props.updateBd_BdpcSuccess && nextProps.updateBd_BdpcSuccess) {
      this.refreshCurrentPage()
    }
    if (!this.props.removeProjectSuccess && nextProps.removeProjectSuccess) {
      this.props.showSuccess('删除项目成功！')
      this.props.clearState(PROJECT.REMOVE_PROJECT)
      const {total} = handleListData(this.props.projectList)
      if (total % 10 == 1) {
        this.toPage(0)
      } else {
        this.refreshCurrentPage()
      }
    }
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
        {
          this.state.showDeleteConfirm && (
            <Confirm
              message="确定删除此项目吗？"
              onExited={() => this.setState({showDeleteConfirm: false})}
              onConfirm={this.removeProject}
            />
          )
        }

        <div className="m15">
          <Button onClick={() => this.setState({showAddDialog: true})}>创建</Button>
        </div>
        <FixHeadList total={total} weights={[1, 1, 1, 2, 2, 1]}>
          <FixHead>
            <FixHead.Item>项目名称</FixHead.Item>
            <FixHead.Item>客户名称</FixHead.Item>
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
                    <FixRow.Item>{item['projectName']}</FixRow.Item>
                    <FixRow.Item>{item['customerName']}</FixRow.Item>
                    <FixRow.Item>{item['projectCode']}</FixRow.Item>
                    <FixRow.Item>{getNameAndEmail(item.bdName, item.bd)}</FixRow.Item>
                    <FixRow.Item>{getNameAndEmail(item.bdpcName, item.bdpc)}</FixRow.Item>
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
    ...state.project,
    projectList: state.projectList
  }
}

export default connect(mapStateToProps, {fetchList, removeProject})(Project)
