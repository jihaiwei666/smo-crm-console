/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import pages from '../../core/pages'

import Chunk from './Chunk'
import AccountManage from './lazy-page/account__manage'
import TodoRemind from './lazy-page/todo__remind'
import Clients from './lazy-page/clients'

class PageContent extends React.Component<any> {
  mapper: {}

  componentWillMount() {
    const {todoRemind, clients, accountManage, project,} = pages
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage}/>,
      [todoRemind]: () => <Chunk load={TodoRemind}/>,
      [clients]: () => <Chunk load={Clients}/>,
    }
  }

  render() {
    const {match} = this.props
    const {todoRemind, clients, accountManage} = pages
    return (
      <div style={{height: '100%', overflow: 'hidden'}}>
        <Route path={`${match.url}/${accountManage}`} component={this.mapper[accountManage]}/>
        <Route path={`${match.url}/${todoRemind}`} component={this.mapper[todoRemind]}/>
        <Route path={`${match.url}/${clients}`} component={this.mapper[clients]}/>
      </div>
    )
  }
}

export default PageContent
