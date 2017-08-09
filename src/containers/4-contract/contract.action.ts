/**
 * jiangyukun 2017/7/18
 */
import {_post, _get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CONTRACT} from '../../core/constants/types'
import {handleContractList, handleProjectList, handleContractDetail, handlePartAfterSignInfo} from './contract.helper'

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

export function fetchContractDetail(contractId) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_CONTRACT_DETAIL,
      http: () => _get(urlPrefix + `/v1/contractInfos/${contractId}`),
      handleResponse: handleContractDetail
    }
  }
}

export function updateBdAndBdpc(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.UPDATE_BD_AND_BDPC,
      http: () => _post(urlPrefix + '/v1/updateContractBdAndBdpc', {body: options})
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
      handleResponse: data => ({
        newContractCodePrefix: data['code'] || '',
        isFirstOperation: data['result']
      })
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

//部分信息直接从项目中复制过来
export function fetchPartAfterSignInfoFromProject(projectId) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_PART_AFTER_SIGN_INFO_FROM_PROJECT,
      http: () => _get(urlPrefix + `/v1/copyProjectInfoForContract/${projectId}`),
      handleResponse: handlePartAfterSignInfo
    }
  }
}

export function addAfterSign(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.ADD_AFTER_SIGN,
      http: () => _post(urlPrefix + '/v1/addContractAfterSigned', {body: options}),
      handleResponse: handlePartAfterSignInfo
    }
  }
}

export function updateAfterSign(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.UPDATE_AFTER_SIGN,
      http: () => _post(urlPrefix + '/v1/updateContractAfterSigned', {body: options}),
      handleResponse: handlePartAfterSignInfo
    }
  }
}

export function fetchCollectionList(contractId) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_COLLECTION_LIST,
      http: () => _get(urlPrefix + `/v1/getCollectionList/${contractId}`),
      handleResponse: handlePartAfterSignInfo
    }
  }
}

export function updateCollection(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.UPDATE_COLLECTION,
      http: () => _post(urlPrefix + '/v1/updateCollection', {body: options}),
      handleResponse: handlePartAfterSignInfo
    }
  }
}
