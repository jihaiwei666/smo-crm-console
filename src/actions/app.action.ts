/**
 * Created by jiangyukun on 2017/6/30.
 */
import {APP} from '../core/constants/types'
import phase from '../core/constants/phase'

export function clearState(type: string) {
  return {
    type: phase.CLEAR + type
  }
}

export function changeMessageStatus(msgId: any, newStatus: any) {
  return {
    type: APP.CHANGE_MESSAGE_STATUS, msgId, newStatus
  }
}
