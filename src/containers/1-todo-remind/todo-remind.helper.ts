/**
 * Created by jiangyukun on 2017/7/6.
 */

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
