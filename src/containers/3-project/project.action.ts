/**
 * jiangyukun 2017/7/18
 */
import {_post, _get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {PROJECT} from '../../core/constants/types'
import {handleProjectList, handleClientList, handleProjectDetail} from './project.helper'

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
      type: PROJECT.UPDATE_PROJECT_BASE_INFO,
      http: () => _post(urlPrefix + '/v1/info/edit', {body: options})
    }
  }
}
