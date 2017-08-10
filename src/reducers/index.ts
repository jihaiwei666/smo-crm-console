/**
 * Created by jiangyukun on 2017/6/29.
 */
import {fromJS} from 'immutable'
import {combineReducers} from 'redux'
import message from 'app-core/message/message.reducer'
import {routerReducer} from 'react-router-redux'

import data from './data.reducer'

import app from './app.reducer'
import client from '../containers/2-client/client.reducer'
import contract from '../containers/4-contract/contract.reducer'
import accountManage from '../containers/7-account-manage/account-manage.reducer'

import {APP, TODO_REMIND, CLIENTS, ACCOUNT_MANAGE, PROJECT, CONTRACT, RECYCLE_BIN} from '../core/constants/types'

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
  userCategory: wrapReducerState(data(TODO_REMIND.FETCH_USER_CATEGORY_INFO)),
  relevantItemList: wrapReducerState(data(TODO_REMIND.FETCH_RELEVANT_ITEM_LIST)),

  client: wrapReducerState(client),
  clientList: wrapReducerState(data(CLIENTS.FETCH_LIST)),
  customerInfo: wrapReducerState(data(CLIENTS.FETCH_CUSTOMER_INFO)),
  BDList: wrapReducerState(data(APP.FETCH_BD)),
  BDPCList: wrapReducerState(data(APP.FETCH_BDPC)),
  customerProjectData: wrapReducerState(data(CLIENTS.FETCH_PROJECT_LIST)),
  customerContactData: wrapReducerState(data(CLIENTS.FETCH_CONTACT_LIST)),
  cdaList: wrapReducerState(data(CLIENTS.FETCH_CDA_LIST)),
  cdaDetail: wrapReducerState(data(CLIENTS.FETCH_CDA_DETAIL)),
  msaListInfo: wrapReducerState(data(CLIENTS.FETCH_MSA_LIST)),
  visitRecordListInfo: wrapReducerState(data(CLIENTS.FETCH_VISIT_RECORD_LIST)),
  rfiList: wrapReducerState(data(CLIENTS.FETCH_RFI_LIST)),

  projectList: wrapReducerState(data(PROJECT.FETCH_LIST)),
  projectClientList: wrapReducerState(data(PROJECT.FETCH_CLIENT_LIST)),
  projectDetail: wrapReducerState(data(PROJECT.FETCH_PROJECT_DETAIL)),

  contract: wrapReducerState(contract),
  contractDetail: wrapReducerState(data(CONTRACT.FETCH_CONTRACT_DETAIL)),
  contractList: wrapReducerState(data(CONTRACT.FETCH_LIST)),
  contractProjectList: wrapReducerState(data(CONTRACT.FETCH_PROJECT_LIST)),
  institutionList: wrapReducerState(data(CONTRACT.FETCH_INSTITUTION_LIST)),
  institutionInfo: wrapReducerState(data(CONTRACT.FETCH_INSTITUTION_INFO)),

  recycleBinList: wrapReducerState(data(RECYCLE_BIN.FETCH_LIST)),

  accountManage: wrapReducerState(accountManage),
  accountList: wrapReducerState(data(ACCOUNT_MANAGE.FETCH_LIST)),

})
