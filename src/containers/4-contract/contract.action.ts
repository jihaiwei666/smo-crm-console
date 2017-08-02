/**
 * jiangyukun 2017/7/18
 */
import {_post, _get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CONTRACT} from '../../core/constants/types'
import {handleContractList, handleProjectList} from './contract.helper'

const urlPrefix = '/contract'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/getContractList', {body: options}),
      handleResponse: handleContractList
    }
  }
}

export function fetchProjectList() {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_PROJECT_LIST,
      http: () => _get(urlPrefix + '/v1/getProjectInfoForContract'),
      handleResponse: handleProjectList
    }
  }
}

export function fetchContractCodePrefix(projectId) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_CONTRACT_CODE_PREFIX,
      http: () => _get(urlPrefix + `/v1/getProjectCodeByProjectId/${projectId}`),
      handleResponse: data => data || ''
    }
  }
}

export function addContract(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.ADD_CONTRACT,
      http: () => _post(urlPrefix + '/v1/addContractInfo', {body: options})
    }
  }
}

export function updateContract(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.UPDATE_CONTRACT,
      http: () => _post(urlPrefix + '/v1/updateContractInfo', {body: options})
    }
  }
}

export function addBeforeSign(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.ADD_BEFORE_SIGN,
      http: () => _post(urlPrefix + '/v1/addContractBeforeSigned', {body: options})
    }
  }
}

export function updateBeforeSign(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.UPDATE_BEFORE_SIGN,
      http: () => _post(urlPrefix + '/v1/updateContractBeforeSigned', {body: options})
    }
  }
}
