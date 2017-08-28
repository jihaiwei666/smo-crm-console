/**
 * Created by jiangyukun on 2017/7/6.
 */
import {getPositionName} from '../7-account-manage/account-manage.helper'
import {getDateTimeStr} from '../../core/utils/dateUtils'

export function handleTodoRemindList(data) {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      id: item['todo_reminder_id'],
      email: item['sender'],
      sendTime: getDateTimeStr(item['send_time']),
      content: item['content'],
      name: item['name'],
      relevantType: item['relation_type'],
      relevantId: item['relation_id'],
      remindType: item['reminder_from'],
      remindStatus: item['reminder_status'],
      attachments: (item['fileList'] || []).map(item => ({
        id: item['file_id'],
        name: item['file_name'],
        url: item['file_url'],
      }))
    }))
  }
}

export function handleUserCategoryInfo(data) {
  return data.map((category, index) => ({
    categoryName: getPositionName(category['post_type']),
    options: category['list'].map(user => ({
      value: user['account'], text: user['account']
    }))
  }))
}

export function handleRelevantItemList(data) {
  return data.map((relevantItem, index) => ({
    id: relevantItem['relation_id'],
    name: relevantItem['relation_name']
  }))
}

export function getRelevantTypeText(type) {
  if (type == '1') return '客户'
  if (type == '2') return '项目'
  if (type == '3') return '合同'
  return '暂无'
}
