/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import pages from '../../core/pages'

import Chunk from './Chunk'
import AccountManage from './lazy-page/account__manage'
import TodoRemind from './lazy-page/todo__remind'

class PageContent extends React.Component<any> {
  mapper: {}

  componentWillMount() {
    const {todoRemind, accountManage, project,} = pages
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage}/>,
      [todoRemind]: () => <Chunk load={TodoRemind}/>
    }
  }

  render() {
    const {match} = this.props
    const {todoRemind, accountManage} = pages
    return (
      <div style={{height: '100%', overflow: 'hidden'}}>
        <Route path={`${match.url}/${accountManage}`} component={this.mapper[accountManage]}/>
        <Route path={`${match.url}/${todoRemind}`} component={this.mapper[todoRemind]}/>
      </div>
    )
  }
}

export default PageContent
