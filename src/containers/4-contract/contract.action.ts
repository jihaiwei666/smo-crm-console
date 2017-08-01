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

export function fetchContractCodePrefix() {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_CONTRACTCODE_PREFIX,
      http: () => _get(urlPrefix + '/v1/'),
      handleResponse: data => data
    }
  }
}
