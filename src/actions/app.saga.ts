/**
 * Created by jiangyukun on 2017/8/13.
 */
import {take, put, call} from 'redux-saga/effects'
import {_get} from '../core/http'
import {APP} from '../core/constants/types'
import {handleRecentOpenList} from './app.helper'
import phase from '../core/constants/phase'

function fetchRecentOpen(start) {
  return _get(`/user/v1/getLastVisitPageList/${start}`)
}

export function* fetchRecentOpenList() {
  let type = APP.FETCH_RECENT_OPEN_LIST
  let {start} = yield take(APP.FETCH_RECENT_OPEN_LIST)
  yield put({type: type + phase.START, start})
  try {
    let data = yield call(fetchRecentOpen, start)
    yield put({type: type + phase.SUCCESS, data: handleRecentOpenList(data)})
  } catch (err) {
    yield put({type: type + phase.FAILURE, err})
  }
}
