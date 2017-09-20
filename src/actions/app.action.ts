/**
 * Created by jiangyukun on 2017/6/30.
 */
import {APP} from '../core/constants/types'
import phase from '../core/constants/phase'
import {THREE_PHASE} from '../middlewares/request_3_phase'
import {_get, _patch, _post} from '../core/http'
import {handleBDListData, handleBDPCListData, handleAccountInfo} from './app.helper'

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

export function fetchRecentOpenList(start) {
  return {
    type: APP.FETCH_RECENT_OPEN_LIST, start
  }
}

export function fetchAccountInfo(email) {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_ACCOUNT_INFO,
      http: () => _get(`/operation/v1/getUserAccountInfo/${email}/`),
      handleResponse: handleAccountInfo
    }
  }
}

export function changePassword(userId, oldPassword, newPassword) {
  oldPassword = oldPassword.toUpperCase()
  newPassword = newPassword.toUpperCase()
  return {
    [THREE_PHASE]: {
      type: APP.CHANGE_PASSWORD,
      http: () => _patch(`/user/v1/updateUserPassWord/${userId}/${newPassword}/${oldPassword}`)
    }
  }
}

export function updateUserStatus(options) {
  return {
    [THREE_PHASE]: {
      type: APP.UPDATE_USER_STATUS,
      http: () => _post('/user/v1/updateUserStatus', {body: options})
    }
  }
}

export function refreshUserStatus() {
  return {
    [THREE_PHASE]: {
      type: APP.REFRESH_USER_STATUS,
      http: () => _get('/user/v1/getUserStatus'),
      handleResponse: data => data['user_status']
    }
  }
}
