/**
 * Created by jiangyukun on 2017/7/7.
 */
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {CLIENTS} from '../../core/constants/types'
import {_get, _post} from '../../core/http'

const urlPrefix = '/customer'

export function fetchList(options) {
  return {
    [THREE_PHASE]: {
      type: CLIENTS.FETCH_LIST,
      http: () => _post(urlPrefix + '/v1/list', {body: options}),
    }
  }
}
