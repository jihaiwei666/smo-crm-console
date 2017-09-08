/**
 * Created by jiangyukun on 2017/9/8.
 */
import {roleCategory} from '../containers/7-account-manage/account-manage.constant'

export function finalPermission(permission): boolean {
  return true
}

const _ = finalPermission

export function showBdBdpcUpdate(roleCode) {
  return roleCode == roleCategory.bdLeader || roleCode == roleCategory.bdpcLeader
}

export function isBdLead(roleCode) {
  return roleCode == roleCategory.bdLeader
}

export function isSystemManage(roleCode) {
  return roleCode == roleCategory.systemManage
}

export function checkHavePermission(roleCode, currentPermission = false): boolean {
  return finalPermission(isSystemManage(roleCode) || currentPermission)
}

export function oneOf(roleCode, allowRoleList: number[]) {
  return allowRoleList.some(r => r == roleCode)
}
