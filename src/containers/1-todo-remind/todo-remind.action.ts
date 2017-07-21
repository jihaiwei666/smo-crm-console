/**
 * Created by jiangyukun on 2017/7/6.
 */
import {_get} from '../../core/http'
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {TODO_REMIND} from '../../core/constants/types'
import {adaptTodoRemindList, adapteUserCategoryInfo} from './todo-remind.helper'

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

export function fetchUserCategoryInfo() {
  return {
    [THREE_PHASE]: {
      type: TODO_REMIND.FETCH_USER_CATEGORY_INFO,
      http: () => _get(`/user/v1/getUserInfo`),
      handleResponse: adapteUserCategoryInfo
    }
  }
}

export function fetchRelevantItemList(category, searchKey) {
  return {
    [THREE_PHASE]: {
      type: TODO_REMIND.FETCH_USER_CATEGORY_INFO,
      http: () => _get(urlPrefix + `/v1/getTodoRelationByType/${category}?content=${searchKey}`),
      handleResponse: adapteUserCategoryInfo
    }
  }
}
