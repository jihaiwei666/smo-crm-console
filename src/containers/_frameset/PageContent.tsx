/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'

import {Route} from 'react-router-dom'
import {getPath} from '../../core/env'

import AccountManage from '../7-account-manage/AccountManage'

interface PageContentProps {
  match: any
}

class PageContent extends React.Component<PageContentProps> {
  render() {
    const {match} = this.props
    return (
      <div>
        <Route path={`${match.url}/account-manage`} component={AccountManage}/>
      </div>
    )
  }
}

export default PageContent
