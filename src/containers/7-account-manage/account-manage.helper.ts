/**
 * Created by jiangyukun on 2017/8/8.
 */
import {positionList, roleCategory} from './account-manage.constant'


export function getPositionName(positionCode) {
  const match = positionList.find(p => p.value == positionCode)
  if (match) return match.text
  return '未知'
}

export function isAdmin(roleCode) {
  return roleCode == roleCategory.systemManage
}
