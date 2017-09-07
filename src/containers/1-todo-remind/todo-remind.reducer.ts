/**
 * Created by jiangyukun on 2017/7/6.
 */
import {fromJS} from 'immutable'

import {TODO_REMIND} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  sendRemindSuccess: false,
  updateRemindStatusSuccess: false,
}

export default function todoRemind(iState = fromJS(initValue), action): any {
  let nextIState = iState
  switch (action.type) {

  }

  nextIState = handleFlagState(nextIState, action, TODO_REMIND.SEND_REMIND, 'sendRemindSuccess')
  nextIState = handleFlagState(nextIState, action, TODO_REMIND.UPDATE_REMIND_STATUS, 'updateRemindStatusSuccess')

  return nextIState
}
