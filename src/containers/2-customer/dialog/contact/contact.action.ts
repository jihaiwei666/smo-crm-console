/**
 * Created by jiangyukun on 2017/7/25.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {CUSTOMER} from '../../../../core/constants/types'
import {_post, _get} from '../../../../core/http'
import {handleVisitRecordList} from './contact.helper'

const urlPrefix = '/customer'

export function addContact(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_CONTACT,
      http: () => _post(urlPrefix + '/v1/contacts/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateContact(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_CONTACT,
      http: () => _post(urlPrefix + '/v1/contacts/edit', {body: options})
    }
  }
}

export function removeContact(contactId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.REMOVE_CONTACT,
      http: () => _post(urlPrefix + `/v1/contacts/del/${contactId}`)
    }
  }
}

export function fetchVisitRecordList(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.FETCH_VISIT_RECORD_LIST,
      http: () => _post(urlPrefix + `/v1/contacts/visit/list/`, {body: options}),
      handleResponse: handleVisitRecordList
    }
  }
}

export function addVisitRecord(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.ADD_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/add`, {body: options})
    }
  }
}

export function updateVisitRecord(options) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.UPDATE_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/edit`, {body: options})
    }
  }
}

export function removeVisitRecord(recordId) {
  return {
    [THREE_PHASE]: {
      type: CUSTOMER.REMOVE_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/del/${recordId}`)
    }
  }
}
