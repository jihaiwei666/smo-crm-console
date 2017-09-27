/**
 * Created by jiangyukun on 2017/6/29.
 */
import 'babel-polyfill'
import 'isomorphic-fetch'
import createSagaMiddleware from 'redux-saga'

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

import './style/index'
import Root from './containers/Root'
import allReducers from './reducers/'
import request_3_phase from './middlewares/request_3_phase'
import handle_error from './middlewares/handle_error'
import rootSaga from './sagas/'
import {_get} from './core/http'
import {APP} from './core/constants/types'
import {getDate} from './core/utils/dateUtils'

let history = createBrowserHistory()
let sagaMiddleware = createSagaMiddleware()
const middleware = routerMiddleware(history)
const store = createStore(allReducers, {}, applyMiddleware(middleware, request_3_phase, handle_error, sagaMiddleware))
sagaMiddleware.run(rootSaga)

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/').default
    store.replaceReducer(nextRootReducer)
  })
}

_get('/user/v1/getUserStatus').then(data => {
  let userId = data['user_id']
  let email = data['account']
  let userName = data['name']
  let roleCode = data['post_type']
  let currentStatus = data['current_Status']
  let userStatusInfo = {
    newStatus: data['user_status'],
    startDate: getDate(data['begin_date']),
    endDate: getDate(data['end_date'])
  }
  store.dispatch({type: APP.INIT_USER, user: {userId, email, userName, roleCode, currentStatus, userStatusInfo}})
  render(
    <Root store={store} history={history} roleCode={roleCode}/>,
    document.getElementById('root')
  )
})
