/**
 * Created by jiangyukun on 2017/6/29.
 */
import {fromJS} from 'immutable'
import {combineReducers} from 'redux'
import message from 'app-core/message/message.reducer'
import {routerReducer} from 'react-router-redux'

import data from './data.reducer'
import pageList from './page-list.reducer'

import app from './app.reducer'
import todoRemind from '../containers/1-todo-remind/todo-remind.reducer'
import customer from '../containers/2-customer/customer.reducer'
import project from '../containers/3-project/project.reducer'
import contract from '../containers/4-contract/contract.reducer'
import accountManage from '../containers/7-account-manage/account-manage.reducer'

import {APP, TODO_REMIND, CUSTOMER, ACCOUNT_MANAGE, PROJECT, CONTRACT, RECYCLE_BIN} from '../core/constants/types'

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
  recentOpenList: wrapReducerState(data(APP.FETCH_RECENT_OPEN_LIST)),
  accountInfo: wrapReducerState(data(APP.FETCH_ACCOUNT_INFO)),
  BDList: wrapReducerState(data(APP.FETCH_BD)),
  BDPCList: wrapReducerState(data(APP.FETCH_BDPC)),

  todoRemind: wrapReducerState(todoRemind),
  todoRemindAllList: wrapReducerState(pageList(TODO_REMIND.FETCH_LIST)),
  todoRemindMyList: wrapReducerState(pageList(TODO_REMIND.FETCH_MY_LIST)),
  todoRemindCompleteList: wrapReducerState(pageList(TODO_REMIND.FETCH_COMPLETE_LIST)),
  userCategory: wrapReducerState(data(TODO_REMIND.FETCH_USER_CATEGORY_INFO)),
  relevantItemList: wrapReducerState(data(TODO_REMIND.FETCH_RELEVANT_ITEM_LIST)),

  customer: wrapReducerState(customer),
  customerList: wrapReducerState(data(CUSTOMER.FETCH_LIST)),
  customerInfo: wrapReducerState(data(CUSTOMER.FETCH_CUSTOMER_DETAIL)),
  customerBasicInfo: wrapReducerState(data(CUSTOMER.FETCH_BASIC_INFO)),
  similarNameList: wrapReducerState(data(CUSTOMER.QUERY_SIMILAR_NAME)),
  customerBdBdpc: wrapReducerState(data(CUSTOMER.FETCH_CUSTOMER_BD_BDPC)),
  customerProjectData: wrapReducerState(data(CUSTOMER.FETCH_PROJECT_LIST)),
  customerContactData: wrapReducerState(data(CUSTOMER.FETCH_CONTACT_LIST)),
  cdaList: wrapReducerState(data(CUSTOMER.FETCH_CDA_LIST)),
  cdaDetail: wrapReducerState(data(CUSTOMER.FETCH_CDA_DETAIL)),
  msaListInfo: wrapReducerState(data(CUSTOMER.FETCH_MSA_LIST)),
  visitRecordListInfo: wrapReducerState(data(CUSTOMER.FETCH_VISIT_RECORD_LIST)),
  rfiList: wrapReducerState(data(CUSTOMER.FETCH_RFI_LIST)),
  lastRfiDetail: wrapReducerState(data(CUSTOMER.FETCH_LAST_RFI_DETAIL)),
  lastSupplierDetail: wrapReducerState(data(CUSTOMER.FETCH_LAST_SUPPLIER_DETAIL)),
  customerRemarkAttachment: wrapReducerState(data(CUSTOMER.FETCH_CUSTOMER_REMARK_ATTACHMENT)),

  project: wrapReducerState(project),
  projectList: wrapReducerState(data(PROJECT.FETCH_LIST)),
  projectClientList: wrapReducerState(data(PROJECT.FETCH_CLIENT_LIST)),
  projectDetail: wrapReducerState(data(PROJECT.FETCH_PROJECT_DETAIL)),
  projectRemarkAttachment: wrapReducerState(data(PROJECT.FETCH_PROJECT_REMARK_ATTACHMENT)),

  contract: wrapReducerState(contract),
  contractDetail: wrapReducerState(data(CONTRACT.FETCH_CONTRACT_DETAIL)),
  contractList: wrapReducerState(data(CONTRACT.FETCH_LIST)),
  contractProjectList: wrapReducerState(data(CONTRACT.FETCH_PROJECT_LIST)),
  institutionList: wrapReducerState(data(CONTRACT.FETCH_INSTITUTION_LIST)),
  institutionInfo: wrapReducerState(data(CONTRACT.FETCH_INSTITUTION_INFO)),
  collectionList: wrapReducerState(data(CONTRACT.FETCH_COLLECTION_LIST)),
  newAfterSign: wrapReducerState(data(CONTRACT.ADD_AFTER_SIGN)),
  partClientInfo: wrapReducerState(data(CONTRACT.FETCH_CLIENT_INFO_FROM_PROJECT)),
  contractRemarkAttachment: wrapReducerState(data(CONTRACT.FETCH_CONTRACT_REMARK_ATTACHMENT)),

  recycleBinList: wrapReducerState(data(RECYCLE_BIN.FETCH_LIST)),

  accountManage: wrapReducerState(accountManage),
  accountList: wrapReducerState(data(ACCOUNT_MANAGE.FETCH_LIST)),

})
