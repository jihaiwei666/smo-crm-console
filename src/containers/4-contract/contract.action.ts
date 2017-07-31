/**
 * jiangyukun 2017/7/18
 */
import {_post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CONTRACT} from '../../core/constants/types'
import {handleContractList} from './contract.helper'

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
