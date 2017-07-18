/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import pages from '../../core/pages'

import Chunk from './Chunk'
import AccountManage from './lazy-page/account__manage'
import TodoRemind from './lazy-page/todo__remind'
import Client from './lazy-page/client'
import Project from './lazy-page/project'
import Contract from './lazy-page/contract'
import RecycleBin from './lazy-page/recycle__bin'

class PageContent extends React.Component<any> {
  mapper: {}

  componentWillMount() {
    const {todoRemind, client, accountManage, project, contract, recycleBin} = pages
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage}/>,
      [todoRemind]: () => <Chunk load={TodoRemind}/>,
      [client]: () => <Chunk load={Client}/>,
      [project]: () => <Chunk load={Project}/>,
      [contract]: () => <Chunk load={Contract}/>,
      [recycleBin]: () => <Chunk load={RecycleBin}/>,
    }
  }

  render() {
    const {match} = this.props
    const {todoRemind, client, accountManage, project, contract, recycleBin} = pages
    return (
      <div style={{height: '100%', overflow: 'hidden'}}>
        <Route path={`${match.url}/${accountManage}`} component={this.mapper[accountManage]}/>
        <Route path={`${match.url}/${todoRemind}`} component={this.mapper[todoRemind]}/>
        <Route path={`${match.url}/${client}`} component={this.mapper[client]}/>
        <Route path={`${match.url}/${project}`} component={this.mapper[project]}/>
        <Route path={`${match.url}/${contract}`} component={this.mapper[contract]}/>
        <Route path={`${match.url}/${recycleBin}`} component={this.mapper[recycleBin]}/>
      </div>
    )
  }
}

export default PageContent
