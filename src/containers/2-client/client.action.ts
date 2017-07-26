/**
 * Created by jiangyukun on 2017/7/7.
 */
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CLIENTS} from '../../core/constants/types'
import {_get, _post} from '../../core/http'
import {handleClientList, handleClientInfo, handleCustomerProjectList, handleCustomerContactList} from './client.helper'

const urlPrefix = '/customer'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/list', {body: options}),
      handleResponse: handleClientList
    }
  }
}

export function addCustomer(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_CUSTOMER,
      http: () => _post(urlPrefix + '/v1/info/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateCustomer(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_CUSTOMER,
      http: () => _post(urlPrefix + '/v1/info/edit', {body: options}),
    }
  }
}

export function fetchCustomerInfo(customerId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_CUSTOMER_INFO,
      http: () => _get(urlPrefix + `/v1/list/detail/${customerId}`),
      handleResponse: handleClientInfo
    }
  }
}

export function updateBdAndBdpc(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_BD_AND_BDPC,
      http: () => _post(urlPrefix + '/v1/info/edit/belong', {body: options})
    }
  }
}

export function addSubCompany(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_SUB_COMPANY,
      http: () => _post(urlPrefix + '/v1/subsidiary/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateSubCompany(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_SUB_COMPANY,
      http: () => _post(urlPrefix + '/v1/subsidiary/edit', {body: options})
    }
  }
}

export function removeSubCompany(subCompanyId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.REMOVE_SUB_COMPANY,
      http: () => _post(urlPrefix + `/v1/subsidiary/del/${subCompanyId}`)
    }
  }
}

export function fetchProjectList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_PROJECT_LIST,
      http: () => _get(urlPrefix + `/v1/relation/project/list/${customerId}`),
      handleResponse: handleCustomerProjectList
    }
  }
}

export function fetchContactList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_CONTACT_LIST,
      http: () => _get(urlPrefix + `/v1/contacts/list/${customerId}`),
      handleResponse: handleCustomerContactList
    }
  }
}
