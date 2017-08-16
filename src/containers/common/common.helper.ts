/**
 * Created by jiangyukun on 2017/8/7.
 */
import {getDateStr} from '../../core/utils/dateUtils'

export function getOperationType(type) {
  switch (type) {
    case 1:
      return '删除'
    case 2:
      return '新增'
    case 3:
      return '修改'
    case 4:
      return '上传'
    case 5:
      return '下载'
  }
  return '未知操作'
}

export function getRecentOpenTypeText(type) {
  if (type == '1') {
    return '客户'
  }
  if (type == '2') {
    return '项目'
  }
  if (type == '3') {
    return '合同'
  }
}

export function handleOperationList(operationRecordList) {
  return operationRecordList.map(item => ({
    date: getDateStr(item['operation_time']),
    type: item['operation_type'],
    module: item['operation_model'],
    email: item['operation_person'],
    content: item['operation_content'],
  }))
}

export function getNullValue(value) {
  if (value == null) {
    return null
  }
  return value
}
