/**
 * Created by jiangyukun on 2017/8/13.
 */
import {take, put, call} from 'redux-saga/effects'
import {TODO_REMIND} from '../../core/constants/types'
import {_get} from '../../core/http'
import phase from '../../core/constants/phase'
import {handleTodoRemindList} from './todo-remind.helper'

const urlPrefix = '/todoReminder'

function fetchAll(start) {
  return _get(urlPrefix + `/v1/getTodoReminderList/${start}`)
}

function fetchMy(start) {
  return _get(urlPrefix + `/v1/getMyTodoReminderList/${start}`)
}

function fetchComplete(start) {
  return _get(urlPrefix + `/v1/getFinishReminderList/${start}`)
}

export function* fetchList() {
  let {start} = yield take(TODO_REMIND.FETCH_LIST)
  yield put({type: TODO_REMIND.FETCH_LIST + phase.START, start})
  try {
    let data = yield call(fetchAll, start)
    yield put({type: TODO_REMIND.FETCH_LIST + phase.SUCCESS, data: handleTodoRemindList(data)})
  } catch (err) {
    yield put({type: TODO_REMIND.FETCH_LIST + phase.FAILURE, err})
  }
}

export function* fetchMyList() {
  let {start} = yield take(TODO_REMIND.FETCH_MY_LIST)
  yield put({type: TODO_REMIND.FETCH_MY_LIST + phase.START, start})
  try {
    let data = yield call(fetchMy, start)
    yield put({type: TODO_REMIND.FETCH_MY_LIST + phase.SUCCESS, data: handleTodoRemindList(data)})
  } catch (err) {
    yield put({type: TODO_REMIND.FETCH_MY_LIST + phase.FAILURE, err})
  }
}

export function* fetchCompleteList() {
  let {start} = yield take(TODO_REMIND.FETCH_COMPLETE_LIST)
  yield put({type: TODO_REMIND.FETCH_COMPLETE_LIST + phase.START, start})
  try {
    let data = yield call(fetchComplete, start)
    yield put({type: TODO_REMIND.FETCH_COMPLETE_LIST + phase.SUCCESS, data: handleTodoRemindList(data)})
  } catch (err) {
    yield put({type: TODO_REMIND.FETCH_COMPLETE_LIST + phase.FAILURE, err})
  }
}
