/**
 * Created by jiangyukun on 2017/6/29.
 */
import {fromJS} from 'immutable'
import {combineReducers} from 'redux'
import message from 'app-core/message/message.reducer'
import {routerReducer} from 'react-router-redux'

import data from './data.reducer'

import app from './app.reducer'
import accountManage from '../containers/7-account-manage/account-manage.reducer'

import {TODO_REMIND, ACCOUNT_MANAGE} from '../core/constants/types'

/**
 * 使用immutable，将reducer的state封装为iState，不可变数据
 * @param reducerFun 原reducer函数
 * @return 封装后的reducer函数
 */
const wrapReducerState = reducerFun => (state, action) => {
  const iState = fromJS(state)
  return unwrapReducerState(state, iState, reducerFun(iState, action))
}

function unwrapReducerState(state, iState, nextIState) {
  if (iState === nextIState) {
    return state
  }
  return nextIState.toJS()
}

export default combineReducers({
  router: routerReducer,
  app: wrapReducerState(app),
  message: wrapReducerState(message),

  todoRemindList: wrapReducerState(data(TODO_REMIND.FETCH_LIST)),

  accountManage: wrapReducerState(accountManage),
  accountList: wrapReducerState(data(ACCOUNT_MANAGE.FETCH_LIST)),

})
