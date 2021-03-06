/**
 * Created by jiangyukun on 2017/7/5.
 */
import {fromJS} from 'immutable'

import {APP, TODO_REMIND} from '../core/constants/types'
import {handleFlagState} from '../containers/common/reduxUtils'
import phase from '../core/constants/phase'

const initValue = {
  user: null,
  changePasswordSuccess: false,
  fetchUnreadRemindAmountSuccess: false,
  unreadRemindAmount: 0,
  updateUserStatusSuccess: false
}

export default function app(iState = fromJS(initValue), action) {
  let nextIState = iState
  switch (action.type) {
    case APP.INIT_USER:
      nextIState = nextIState.set('user', action.user)
      break

    case TODO_REMIND.FETCH_UNREAD_REMIND_AMOUNT + phase.SUCCESS:
      nextIState = nextIState.set('unreadRemindAmount', action.data)
      break
  }
  nextIState = handleFlagState(nextIState, action, APP.CHANGE_PASSWORD, 'changePasswordSuccess')
  nextIState = handleFlagState(nextIState, action, TODO_REMIND.FETCH_UNREAD_REMIND_AMOUNT, 'fetchUnreadRemindAmountSuccess')
  nextIState = handleFlagState(nextIState, action, APP.UPDATE_USER_STATUS, 'updateUserStatusSuccess')
  return nextIState
}
