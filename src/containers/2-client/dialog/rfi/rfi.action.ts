/**
 * Created by jiangyukun on 2017/7/24.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {_post} from '../../../../core/http'
import {CLIENTS} from '../../../../core/constants/types'
import {handleRfiServerData} from './rfi.helper'

const urlPrefix = '/customer'

export function addRfi(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_RFI,
      http: () => _post(urlPrefix + '/v1/rfi/add', {body: options}),
      handleResponse: handleRfiServerData
    }
  }
}

export function updateRfi(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_RFI,
      http: () => _post(urlPrefix + '/v1/rfi/edit', {body: options})
    }
  }
}

export function removeRfi(rfiId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.REMOVE_RFI,
      http: () => _post(urlPrefix + `/v1/rfi/edit/$\{rfiId}`)
    }
  }
}
