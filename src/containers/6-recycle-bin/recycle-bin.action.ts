/**
 * Created by jiangyukun on 2017/7/18.
 */
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {_get} from '../../core/http'
import {handleRecycleBinList} from './recycle-bin.helper'
import {RECYCLE_BIN} from '../../core/constants/types'

const urlPrefix = '/recycleStation'

export function fetchList(start) {
  return {
    [THREE_PHASE]: {
      type: RECYCLE_BIN.FETCH_LIST,
      http: () => _get(urlPrefix + `/v1/getRecycleStationList/${start}`),
      handleResponse: handleRecycleBinList
    }
  }
}
