/**
 * jiangyukun 2017/7/18
 */
import {_post, _get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {PROJECT} from '../../core/constants/types'
import {handleProjectList, handleClientList, handleProjectDetail} from './project.helper'
import {handleBeforeQuotation} from './dialog/before-quotation/before-quotation.helper'
import {handleAfterQuotation} from './dialog/after-quotation/after-quotation.helper'

const urlPrefix = '/project'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/list', {body: options}),
      handleResponse: handleProjectList
    }
  }
}

export function updateBdAndBdpc(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.UPDATE_BD_AND_BDPC,
      http: () => _post(urlPrefix + '/v1/info/edit/belong', {body: options})
    }
  }
}

export function fetchClientList() {
  return {
    [THREE_PHASE]: {
      type: PROJECT.FETCH_CLIENT_LIST,
      http: () => _get(urlPrefix + '/v1/can/edit/customer/list'),
      handleResponse: handleClientList
    }
  }
}

export function fetchProjectDetail(projectId) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.FETCH_PROJECT_DETAIL,
      http: () => _get(urlPrefix + `/v1/list/detail/${projectId}`),
      handleResponse: handleProjectDetail
    }
  }
}

export function addProjectBaseInfo(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.ADD_PROJECT_INFO,
      http: () => _post(urlPrefix + '/v1/info/add', {body: options}),
      handleResponse: data => data['project_info_id']
    }
  }
}

export function updateProjectBaseInfo(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.UPDATE_PROJECT_INFO,
      http: () => _post(urlPrefix + '/v1/info/edit', {body: options})
    }
  }
}

export function addBeforeQuotation(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.ADD_BEFORE_QUOTATION,
      http: () => _post(urlPrefix + '/v1/before/offer/add', {body: options}),
      handleResponse: handleBeforeQuotation
    }
  }
}

export function updateBeforeQuotation(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.UPDATE_BEFORE_QUOTATION,
      http: () => _post(urlPrefix + '/v1/before/offer/edit', {body: options})
    }
  }
}

export function addAfterQuotation(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.ADD_AFTER_QUOTATION,
      http: () => _post(urlPrefix + '/v1/after/offer/add', {body: options}),
      handleResponse: handleAfterQuotation
    }
  }
}

export function updateAfterQuotation(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.UPDATE_AFTER_QUOTATION,
      http: () => _post(urlPrefix + '/v1/after/offer/edit', {body: options})
    }
  }
}

export function updateRemarkAndAttachment(options) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.UPDATE_REMARK_ATTACHMENT,
      http: () => _post(urlPrefix + '/v1/info/edit/remark', {body: options})
    }
  }
}

export function removeProject(projectId) {
  return {
    [THREE_PHASE]: {
      type: PROJECT.REMOVE_PROJECT,
      http: () => _post(urlPrefix + `/v1/info/del/${projectId}`)
    }
  }
}
