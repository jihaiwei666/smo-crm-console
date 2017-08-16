/**
 * Created by jiangyukun on 2017/7/25.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {CUSTOMER} from '../../../../core/constants/types'
import {_get, _post} from '../../../../core/http'
import {handleCdaDetail, handleCdaList} from './cda.helper'

const urlPrefix = '/customer'

export function fetchCdaList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_CDA_LIST,
      http: () => _get(urlPrefix + `/v1/cda/list/${customerId}`),
      handleResponse: handleCdaList
    }
  }
}

export function fetchCDA_Detail(cdaId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_CDA_DETAIL,
      http: () => _get(urlPrefix + `/v1/cda/detail/${cdaId}`),
      handleResponse: handleCdaDetail
    }
  }
}

export function addCda(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_CDA,
      http: () => _post(urlPrefix + '/v1/cda/add', {body: options})
    }
  }
}

export function updateCda(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_CDA,
      http: () => _post(urlPrefix + `/v1/cda/edit/`, {body: options})
    }
  }
}

export function removeCda(cdaId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.REMOVE_CDA,
      http: () => _post(urlPrefix + `/v1/cda/del/${cdaId}`)
    }
  }
}
