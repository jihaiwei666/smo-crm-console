/**
 * Created by jiangyukun on 2017/7/4.
 */
import {fromJS} from 'immutable'

import {ACCOUNT_MANAGE} from '../../core/constants/types'
import phase from '../../core/constants/phase'

const initValue = {
  addAccountSuccess: false,
  updateAccountSuccess: false,
  resetPasswordSuccess: false,
  disableAccountSuccess: false
}

export default function (iState = fromJS(initValue), action) {
  let nextIState = iState
  switch (action.type) {
    case ACCOUNT_MANAGE.ADD_ACCOUNT + phase.SUCCESS:
      nextIState = nextIState.set('addAccountSuccess', true)
      break

    case phase.CLEAR + ACCOUNT_MANAGE.ADD_ACCOUNT :
      nextIState = nextIState.set('addAccountSuccess', false)
      break

    case ACCOUNT_MANAGE.UPDATE_ACCOUNT + phase.SUCCESS:
      nextIState = nextIState.set('updateAccountSuccess', true)
      break

    case phase.CLEAR + ACCOUNT_MANAGE.UPDATE_ACCOUNT :
      nextIState = nextIState.set('updateAccountSuccess', false)
      break

    case ACCOUNT_MANAGE.RESET_PASSWORD + phase.SUCCESS:
      nextIState = nextIState.set('resetPasswordSuccess', true)
      break
    case phase.CLEAR + ACCOUNT_MANAGE.RESET_PASSWORD :
      nextIState = nextIState.set('resetPasswordSuccess', false)
      break

    case ACCOUNT_MANAGE.DISABLE_ACCOUNT + phase.SUCCESS:
      nextIState = nextIState.set('disableAccountSuccess', true)
      break
    case phase.CLEAR + ACCOUNT_MANAGE.DISABLE_ACCOUNT :
      nextIState = nextIState.set('disableAccountSuccess', false)
      break
  }
  return nextIState
}
