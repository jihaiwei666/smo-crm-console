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
  let userName = data['account']
  let roleCode = data['post_type']
  store.dispatch({type: ''})
  render(
    <Root store={store} history={history} roleCode={8}/>,
    document.getElementById('root')
  )
})
