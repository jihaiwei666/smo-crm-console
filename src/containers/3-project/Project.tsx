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

import ProjectState from './ProjectState'
import {handleListData, getNameAndEmail, getOperation} from '../common/common.helper'
import {PROJECT} from '../../core/constants/types'
import {fetchList, removeProject} from './project.action'
import FilterItem from '../../components/query-filter/FilterItem'
import FilterOptions from '../../components/query-filter/FilterOptions'
import Input from '../../components/form/Input'
import FilterButton from '../common/FilterButton'

interface ProjectProps extends AppFunctionPage, ProjectState {
  projectList: any
  removeProject: (projectId) => void
}

class Project extends React.Component<ProjectProps> {
  state = {
    index: -1,
    showFilter: false,
    showAddDialog: false,
    showEditDialog: false,
    showDeleteConfirm: false,

    currentPage: 0,
    customerName: '',
    projectName: '',
    projectCode: '',
    bd: '',
    bdpc: ''
  }

  toPage = (newPage) => {
    if (newPage == null) newPage = this.state.currentPage
    if (newPage != this.state.currentPage) {
      this.setState({currentPage: newPage})
    }
    this.props.fetchList({
      "start": newPage,
      "limit": 10,
      "customer_name": this.state.customerName,
      "project_info_name": this.state.projectName,
      "project_info_code": this.state.projectCode,
      "project_the_bd": this.state.bd,
      "project_the_bdpc": this.state.bdpc,
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
    const buttonOperation = getOperation(this.props.projectList)
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
          {
            buttonOperation.canCreate && (
              <Button onClick={() => this.setState({showAddDialog: true})}>创建</Button>
            )
          }
          <div className="pull-right">
            <FilterButton onClick={() => this.setState({showFilter: !this.state.showFilter})}/>
          </div>
        </div>
        {
          this.state.showFilter && (
            <div className="query-filter">
              <FilterItem label="客户名称">
                <Input
                  className="small"
                  placeholder="请输入客户名称"
                  value={this.state.customerName} onChange={v => this.setState({customerName: v})}
                />
              </FilterItem>
              <FilterItem label="项目名称">
                <Input
                  className="small"
                  placeholder="请输入客户名称"
                  value={this.state.projectName} onChange={v => this.setState({projectName: v})}
                />
              </FilterItem>
              <FilterItem label="项目名称">
                <Input
                  className="small"
                  placeholder="项目编码"
                  value={this.state.projectCode} onChange={v => this.setState({projectCode: v})}
                />
              </FilterItem>
              <FilterItem label="所属BD">
                <FilterOptions options={[{value: '1', text: '只看我的'}]} value={this.state.bd} onChange={v => this.setState({bd: v})}/>
              </FilterItem>
              <FilterItem label="所属BDPC">
                <FilterOptions options={[{value: '1', text: '只看我的'}]} value={this.state.bdpc} onChange={v => this.setState({bdpc: v})}/>
              </FilterItem>
              <div className="bt clearfix">
                <div className="pull-right mt7">
                  <Button
                    className="default"
                    onClick={() => this.setState({customerName: '', projectName: '', projectCode: '', bd: '', bdpc: ''})}
                  >清除</Button>
                  <Button onClick={() => this.toPage(0)}>确定</Button>
                </div>
              </div>
            </div>
          )
        }
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
                      {
                        item.operation.canEdit && (
                          <Button className="small" onClick={() => this.setState({showEditDialog: true, index})}>查看</Button>
                        )
                      }
                      {
                        item.operation.canDelete && (
                          <Button className="small danger" onClick={() => this.setState({showDeleteConfirm: true, index})}>删除</Button>
                        )
                      }
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
