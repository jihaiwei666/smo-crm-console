/**
 * Created by jiangyukun on 2017/7/24.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {CUSTOMER} from '../../../../core/constants/types'
import {_post, _get} from '../../../../core/http'
import {handleSupplierServerData, handleMsaListData} from './supplier.helper'

const urlPrefix = '/customer'

export function addSupplier(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_SUPPLIER,
      http: () => _post(urlPrefix + `/v1/provider/add`, {body: options}),
      handleResponse: handleSupplierServerData
    }
  }
}

export function updateSupplier(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_SUPPLIER,
      http: () => _post(urlPrefix + `/v1/provider/edit`, {body: options})
    }
  }
}

export function fetchMSAList(supplierId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_MSA_LIST,
      http: () => _get(urlPrefix + `/v1/provider/msa/list/${supplierId}`),
      handleResponse: handleMsaListData
    }
  }
}

export function addMsa(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_MSA,
      http: () => _post(urlPrefix + `/v1/provider/msa/add`, {body: options})
    }
  }
}

export function updateMsa(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_MSA,
      http: () => _post(urlPrefix + `/v1/provider/msa/edit`, {body: options})
    }
  }
}
