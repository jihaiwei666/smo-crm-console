/**
 * Created by jiangyukun on 2017/6/29.
 */
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'

import LoginApp from './containers/login/LoginApp'
import request_3_phase from './middlewares/request_3_phase'
import allReducers from './reducers/'

const store = createStore<any>(allReducers, {}, applyMiddleware(request_3_phase))

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

render(<LoginApp store={store}/>, document.querySelector('#root'))
