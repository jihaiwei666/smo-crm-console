/**
 * Created by jiangyukun on 2017/7/25.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {CLIENTS} from '../../../../core/constants/types'
import {_get, _post} from '../../../../core/http'
import {handleCDA_Detail} from '../../client.helper'

const urlPrefix = '/customer'

export function fetchCdaList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_CDA_LIST,
      http: () => _get(urlPrefix + `/v1/cda/list/${customerId}`),
      handleResponse: handleCDA_Detail
    }
  }
}

export function fetchCDA_Detail(cdaId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_CDA_DETAIL,
      http: () => _get(urlPrefix + `/v1/cda/detail/${cdaId}`),
      handleResponse: handleCDA_Detail
    }
  }
}

export function addCda(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_CDA,
      http: () => _post(urlPrefix + '/v1/cda/add', {body: options})
    }
  }
}

export function updateCda(contactId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_CDA,
      http: () => _post(urlPrefix + `/v1/contacts/del//${contactId}`)
    }
  }
}

export function removeCda(contactId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.REMOVE_CDA,
      http: () => _post(urlPrefix + `/v1/contacts/del//${contactId}`)
    }
  }
}
