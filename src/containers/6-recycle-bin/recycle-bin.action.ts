/**
 * Created by jiangyukun on 2017/7/18.
 */

import {RECYCLE_BIN} from '../../core/constants/types'



export function fetchList(start) {
  return {
    type: RECYCLE_BIN.FETCH_LIST, start
  }
}
