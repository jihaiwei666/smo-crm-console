/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import pages from '../../core/pages'

import Chunk from './Chunk'
import AccountManage from './lazy-page/account__manage'
import TodoRemind from './lazy-page/todo__remind'
import Customer from './lazy-page/customer'
import Project from './lazy-page/project'
import Contract from './lazy-page/contract'
import RecycleBin from './lazy-page/recycle__bin'
import Report from './lazy-page/report'
import {roleCategory} from '../7-account-manage/account-manage.constant'

interface PageContentProps {
  roleCode: number
  match: any
}

class PageContent extends React.Component<PageContentProps> {
  mapper: {}

  componentWillMount() {
    const {todoRemind, customer, accountManage, project, report, contract, recycleBin} = pages
    const roleCode = this.props.roleCode
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage} roleCode={roleCode}/>,
      [todoRemind]: () => <Chunk load={TodoRemind} roleCode={roleCode}/>,
      [customer]: () => <Chunk load={Customer} roleCode={roleCode}/>,
      [project]: () => <Chunk load={Project} roleCode={roleCode}/>,
      [contract]: () => <Chunk load={Contract} roleCode={roleCode}/>,
      [report]: () => <Chunk load={Report} roleCode={roleCode}/>,
      [recycleBin]: () => <Chunk load={RecycleBin} roleCode={roleCode}/>,
    }
  }

  render() {
    const {match} = this.props
    const {todoRemind, customer, accountManage, project, contract, report, recycleBin} = pages
    return (
      <div className="page-content">
        <Route path={`${match.url}/${todoRemind}`} component={this.mapper[todoRemind]}/>
        <Route path={`${match.url}/${customer}`} component={this.mapper[customer]}/>
        {
          this.props.roleCode != roleCategory.finance && (
            <Route path={`${match.url}/${project}`} component={this.mapper[project]}/>
          )
        }
        <Route path={`${match.url}/${contract}`} component={this.mapper[contract]}/>
        <Route path={`${match.url}/${report}`} component={this.mapper[report]}/>
        {
          this.props.roleCode == roleCategory.systemManage && (
            <Route path={`${match.url}/${recycleBin}`} component={this.mapper[recycleBin]}/>
          )
        }
        {
          this.props.roleCode == roleCategory.systemManage && (
            <Route path={`${match.url}/${accountManage}`} component={this.mapper[accountManage]}/>
          )
        }
      </div>
    )
  }
}

export default PageContent
