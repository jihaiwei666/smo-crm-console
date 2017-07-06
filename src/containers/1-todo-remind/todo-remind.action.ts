/**
 * Created by jiangyukun on 2017/7/6.
 */
import {_get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {TODO_REMIND} from '../../core/constants/types'
import {adaptTodoRemindList} from './todo-remind.helper'

const urlPrefix = '/todoReminder'

export function fetchList(start) {
  return {
    [THREE_PHASE]: {
      type: TODO_REMIND.FETCH_LIST,
      http: () => _get(urlPrefix + `/v1/getTodoReminderList/${start}`),
      handleResponse: adaptTodoRemindList
    }
  }
}
