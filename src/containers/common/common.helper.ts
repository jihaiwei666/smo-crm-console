/**
 * Created by jiangyukun on 2017/8/7.
 */
import Data from './interface/Data'
import {getDateTimeStr} from '../../core/utils/dateUtils'
import crud from '../../core/crud'

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
    date: getDateTimeStr(item['operation_time']),
    type: item['operation_type'],
    module: item['operation_model'],
    email: item['operation_person'],
    name: item['operation_person_name'],
    content: item['operation_content'],
  }))
}

export function getNullValue(value) {
  if (value == null) {
    return null
  }
  return value
}

export function handleListData(responseData) {
  const {data, loading, loaded} = responseData
  let total = 0, list = []
  if (data) {
    total = data.total
    list = data.list
  }
  return {total, list, loading, loaded}
}

export function getOperation(data: Data<any>) {
  if (!data.loaded) {
    return {}
  }
  return data.data.operation
}

export function getSingleFile(file) {
  if (!file) {
    return null
  }
  return {
    id: file['file_id'],
    fileUrl: file['file_url'],
    fileName: file['file_name'],
  }
}

export function getAttachmentList(list) {
  if (!list) return []
  return list.map(item => ({
    id: item['file_id'],
    fileName: item['file_name'],
    fileUrl: item['file_url'],
  }))
}

export let handleAttachmentList = getAttachmentList

export function lastItemIsLocal(list) {
  if (list.length == 0) return false
  return list[list.length - 1].crud == crud.ADD
}

export function numberToText(number) {
  if (number == null) return ''
  return number + ''
}

export function getNameAndEmail(name, email) {
  if (!name && !email) return ''
  if (!name) return email
  if (!email) return name
  return `${name}（${email}）`
}
