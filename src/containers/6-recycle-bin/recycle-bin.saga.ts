/**
 * Created by jiangyukun on 2017/9/7.
 */
import {take, put, call} from 'redux-saga/effects'

import {RECYCLE_BIN} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {_get} from '../../core/http'
import {handleRecycleBinList} from './recycle-bin.helper'

const urlPrefix = '/recycleStation'

function fetchList(start) {
  return _get(urlPrefix + `/v1/getRecycleStationList/${start}`)
}

export function* fetchRecycleBinList() {
  let type = RECYCLE_BIN.FETCH_LIST
  while (true) {
    let {start} = yield take(type)
    yield put({type: type + phase.START, start})
    try {
      let data = yield call(fetchList, start)
      yield put({type: type + phase.SUCCESS, data: handleRecycleBinList(data)})
    } catch (err) {
      yield put({type: type + phase.FAILURE, err})
    }
  }
}
