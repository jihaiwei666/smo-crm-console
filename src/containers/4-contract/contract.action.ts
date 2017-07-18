/**
 * jiangyukun 2017/7/18
 */
import {_post} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CONTRACT} from '../../core/constants/types'
import {handleProjectList} from './contract.helper'

const urlPrefix = '/project'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CONTRACT.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/list', {body: options}),
      handleResponse: handleProjectList
    }
  }
}
