/**
 * Created by jiangyukun on 2017/8/13.
 */
import {fork} from 'redux-saga/effects'

import {fetchRecentOpenList} from '../actions/app.saga'
import {fetchList, fetchMyList, fetchCompleteList} from '../containers/1-todo-remind/todo-remind.saga'
import {fetchRecycleBinList} from '../containers/6-recycle-bin/recycle-bin.saga'

export default function* root() {
  yield [
    fork(fetchList),
    fork(fetchMyList),
    fork(fetchCompleteList),
    fork(fetchRecentOpenList),
    fork(fetchRecycleBinList),
  ]
}
