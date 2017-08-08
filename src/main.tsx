/**
 * Created by jiangyukun on 2017/6/29.
 */
import 'babel-polyfill'
import 'isomorphic-fetch'

import 'app-core/style/index.scss'
import './style/antd/date-picker/style/'
import './components/form/input.scss'
import './style/common.scss'
import './style/file-upload.scss'
import './containers/common/page-common.scss'

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

import Root from './containers/Root'
import allReducers from './reducers/'
import request_3_phase from './middlewares/request_3_phase'

let history = createBrowserHistory()

const middleware = routerMiddleware(history)
const store = createStore(allReducers, {}, applyMiddleware(middleware, request_3_phase))

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/').default
    store.replaceReducer(nextRootReducer)
  })
}

render(
  <Root store={store} history={history}/>,
  document.getElementById('root')
)
