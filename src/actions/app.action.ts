/**
 * Created by jiangyukun on 2017/6/30.
 */
import {APP} from '../core/constants/types'
import phase from '../core/constants/phase'
import {THREE_PHASE} from '../middlewares/request_3_phase'
import {_get} from '../core/http'
import {handleBDListData, handleBDPCListData, handleOperationHistoryList} from './app.helper'

export function clearState(type: string) {
  return {
    type: phase.CLEAR + type
  }
}

export function fetchBD() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_BD,
      http: () => _get('/user/v1/getUserInfoByBD'),
      handleResponse: handleBDListData
    }
  }
}

export function fetchBDPC() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_BDPC,
      http: () => _get('/user/v1/getUserInfoByBDPC'),
      handleResponse: handleBDPCListData
    }
  }
}

export function fetchOperationHistoryList() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_OPERATION_HISTORY_LIST,
      http: () => _get('/operation/'),
      handleResponse: handleOperationHistoryList
    }
  }
}
