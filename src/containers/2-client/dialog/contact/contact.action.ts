/**
 * Created by jiangyukun on 2017/7/25.
 */
import {THREE_PHASE} from '../../../../middlewares/request_3_phase'
import {CLIENTS} from '../../../../core/constants/types'
import {_post, _get} from '../../../../core/http'

const urlPrefix = '/customer'

export function addContact(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_CONTACT,
      http: () => _post(urlPrefix + '/v1/contacts/add', {body: options}),
      handleResponse: data => data
    }
  }
}

export function updateContact(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_CONTACT,
      http: () => _post(urlPrefix + '/v1/contacts/edit', {body: options})
    }
  }
}

export function removeContact(contactId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.REMOVE_CONTACT,
      http: () => _post(urlPrefix + `/v1/contacts/del/${contactId}`)
    }
  }
}

export function fetchVisitRecordList(contactId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_VISIT_RECORD_LIST,
      http: () => _get(urlPrefix + `/v1/contacts/visit/list/${contactId}`)
    }
  }
}

export function addVisitRecord(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.ADD_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/add`, {body: options})
    }
  }
}

export function updateVisitRecord(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.UPDATE_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/edit`, {body: options})
    }
  }
}

export function removeVisitRecord(recordId) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.REMOVE_VISIT_RECORD,
      http: () => _post(urlPrefix + `/v1/contacts/visit/del/${recordId}`)
    }
  }
}
