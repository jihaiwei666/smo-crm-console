/**
 * Created by jiangyukun on 2017/7/7.
 */
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CUSTOMER} from '../../core/constants/types'
import {_get, _post} from '../../core/http'
import {handleClientList, handleClientInfo, handleCustomerProjectList, handleCustomerContactList} from './customer.helper'

const urlPrefix = '/customer'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/list', {body: options}),
      handleResponse: handleClientList
    }
  }
}

export function addCustomer(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_CUSTOMER,
      http: () => _post(urlPrefix + '/v1/info/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateCustomer(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_CUSTOMER,
      http: () => _post(urlPrefix + '/v1/info/edit', {body: options}),
    }
  }
}

export function fetchCustomerDetail(customerId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_CUSTOMER_DETAIL,
      http: () => _get(urlPrefix + `/v1/list/detail/${customerId}`),
      handleResponse: handleClientInfo
    }
  }
}

export function updateBdAndBdpc(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_BD_AND_BDPC,
      http: () => _post(urlPrefix + '/v1/info/edit/belong', {body: options})
    }
  }
}

export function addSubCompany(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_SUB_COMPANY,
      http: () => _post(urlPrefix + '/v1/subsidiary/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateSubCompany(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_SUB_COMPANY,
      http: () => _post(urlPrefix + '/v1/subsidiary/edit', {body: options})
    }
  }
}

export function removeSubCompany(subCompanyId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.REMOVE_SUB_COMPANY,
      http: () => _post(urlPrefix + `/v1/subsidiary/del/${subCompanyId}`)
    }
  }
}

export function fetchProjectList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_PROJECT_LIST,
      http: () => _get(urlPrefix + `/v1/relation/project/list/${customerId}`),
      handleResponse: handleCustomerProjectList
    }
  }
}

export function fetchContactList(customerId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_CONTACT_LIST,
      http: () => _get(urlPrefix + `/v1/contacts/list/${customerId}`),
      handleResponse: handleCustomerContactList
    }
  }
}

export function updateRemarkAndAttachment(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_REMARK_AND_ATTACHMENT,
      http: () => _post(urlPrefix + '/v1/info/edit/remark', {body: options})
    }
  }
}

export function applyBdpcFollowUp(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.APPLY_BDPC_FOLLOW_UP,
      http: () => _post('/todoReminder/v1/addTodoReminder', {body: options})
    }
  }
}
