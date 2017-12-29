/**
 * Created by jiangyukun on 2017/7/4.
 */
import {fromJS} from 'immutable'

import {ACCOUNT_MANAGE, TODO_REMIND} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  addAccountSuccess: false,
  updateAccountSuccess: false,
  resetPasswordSuccess: false,
  disableAccountSuccess: false
}

export default function (iState = fromJS(initValue), action) {
  let nextIState = iState

  nextIState = handleFlagState(nextIState, action, ACCOUNT_MANAGE.ADD_ACCOUNT, 'addAccountSuccess')
  nextIState = handleFlagState(nextIState, action, ACCOUNT_MANAGE.UPDATE_ACCOUNT, 'updateAccountSuccess')
  nextIState = handleFlagState(nextIState, action, ACCOUNT_MANAGE.RESET_PASSWORD, 'resetPasswordSuccess')
  nextIState = handleFlagState(nextIState, action, ACCOUNT_MANAGE.DISABLE_ACCOUNT, 'disableAccountSuccess')
  return nextIState
}
