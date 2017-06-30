/**
 * Created by jiangyukun on 2016/11/26.
 */
import React from 'react'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
import {Provider} from 'react-redux'

import './app.scss'
import SimoCrmApp from './_frameset/SimoCrmApp'

import {getPathPrefix} from '../core/env'

interface RootProps {
  store: any,
  history: any,
}

class Root extends React.PureComponent<RootProps, any> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Route path={getPathPrefix()} component={({match}) => <SimoCrmApp match={match}/>}/>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default Root
