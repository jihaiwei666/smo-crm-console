/**
 * Created by jiangyukun on 2017/7/24.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {_post, _get} from '../../../../core/http'
import {CUSTOMER} from '../../../../core/constants/types'
import {handleRfiServerData, handleRfiListServerData} from './rfi.helper'

const urlPrefix = '/customer'

export function fetchRfiList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_RFI_LIST,
      http: () => _get(urlPrefix + `/v1/rfi/list/${customerId}`),
      handleResponse: handleRfiListServerData
    }
  }
}

export function addRfi(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_RFI,
      http: () => _post(urlPrefix + '/v1/rfi/add', {body: options}),
      handleResponse: handleRfiServerData
    }
  }
}

export function updateRfi(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_RFI,
      http: () => _post(urlPrefix + '/v1/rfi/edit', {body: options})
    }
  }
}

export function removeRfi(rfiId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.REMOVE_RFI,
      http: () => _post(urlPrefix + `/v1/rfi/del/${rfiId}`)
    }
  }
}
