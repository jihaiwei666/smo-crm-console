/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import {Route} from 'react-router-dom'

import pages from '../../core/pages'

import Chunk from './Chunk'
import AccountManage from './lazy-page/t'


class PageContent extends React.Component<any> {
  mapper: {}

  componentWillMount() {
    const {accountManage} = pages
    this.mapper = {
      [accountManage]: () => <Chunk load={AccountManage}/>
    }
  }

  render() {
    const {match} = this.props
    const {accountManage} = pages
    return (
      <div style={{height: '100%'}}>
        <Route path={`${match.url}/account-manage`} component={this.mapper[accountManage]}/>
      </div>
    )
  }
}

export default PageContent
