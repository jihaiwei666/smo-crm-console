/**
 * Created by jiangyukun on 2017/6/30.
 */
import {APP} from '../core/constants/types'
import phase from '../core/constants/phase'
import {THREE_PHASE} from '../middlewares/request_3_phase'
import {_get} from '../core/http'

export function clearState(type: string) {
  return {
    type: phase.CLEAR + type
  }
}

export function fetchBD() {
  return {
    [THREE_PHASE]: {
      type: APP.FETCH_BD,
      http: () => _get('/user/v1/getUserInfoByBD'),
      handleResponse: data => null
    }
  }
}
