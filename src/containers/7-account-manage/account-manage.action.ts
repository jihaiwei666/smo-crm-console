/**
 * Created by jiangyukun on 2017/7/4.
 */

import {_get} from "../../core/http"
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {ACCOUNT_MANAGE} from '../../core/constants/types'

const prefix = '/user'


export function fetchList(start) {
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.FETCH_LIST,
      http: () => _get(prefix + `/v1/getUserList/${start}`),
      handleResponse: data => ({count: data['totalCount'], list: data['list']})
    }
  }
}
