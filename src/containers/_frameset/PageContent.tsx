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

class PageContent extends React.Component<any> {
  mapper: {}

  componentWillMount() {
    const {todoRemind, customer, accountManage, project, report, contract, recycleBin} = pages
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage}/>,
      [todoRemind]: () => <Chunk load={TodoRemind}/>,
      [customer]: () => <Chunk load={Customer}/>,
      [project]: () => <Chunk load={Project}/>,
      [contract]: () => <Chunk load={Contract}/>,
      [report]: () => <Chunk load={Report}/>,
      [recycleBin]: () => <Chunk load={RecycleBin}/>,
    }
  }

  render() {
    const {match} = this.props
    const {todoRemind, customer, accountManage, project, contract, report, recycleBin} = pages
    return (
      <div className="page-content">
        <Route path={`${match.url}/${accountManage}`} component={this.mapper[accountManage]}/>
        <Route path={`${match.url}/${todoRemind}`} component={this.mapper[todoRemind]}/>
        <Route path={`${match.url}/${customer}`} component={this.mapper[customer]}/>
        <Route path={`${match.url}/${project}`} component={this.mapper[project]}/>
        <Route path={`${match.url}/${contract}`} component={this.mapper[contract]}/>
        <Route path={`${match.url}/${report}`} component={this.mapper[report]}/>
        <Route path={`${match.url}/${recycleBin}`} component={this.mapper[recycleBin]}/>
      </div>
    )
  }
}

export default PageContent
