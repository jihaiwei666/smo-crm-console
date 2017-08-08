/**
 * Created by jiangyukun on 2017/7/6.
 */
import {getPositionName} from '../7-account-manage/account-manage.helper'

export function adaptTodoRemindList(data) {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      id: item['todo_reminder_id'],
      email: item['sender'],
      sendDateTime: item['send_time'],
      content: item['content'],
      relevantType: item['relation_type'],
      relevantId: item['relation_id'],
    }))
  }
}

export function handleUserCategoryInfo(data) {
  return data.map((category, index) => ({
    categoryName: getPositionName(category['post_type']) + '_' + index,
    options: category['list'].map(user => ({
      value: user['account'], text: user['account']
    }))
  }))
}
