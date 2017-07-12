/**
 * Created by jiangyukun on 2017/7/11.
 */
import {fromJS} from 'immutable'

import {CLIENTS} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleClearState} from '../common/reduxUtils'

const initValue = {
  customerId: '',
  addCustomerSuccess: false,
  updateCustomerSuccess: false
}

export default function clients(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CLIENTS.ADD_CUSTOMER + phase.SUCCESS:
      let customerId = action.data.customerId
      nextIState = nextIState.set('addCustomerSuccess', true).set('customerId', customerId)
      break

    case CLIENTS.UPDATE_CUSTOMER + phase.SUCCESS:
      nextIState = nextIState.set('updateCustomerSuccess', true)
      break
  }

  nextIState = handleClearState(nextIState, action, CLIENTS.ADD_CUSTOMER, 'addCustomerSuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.UPDATE_CUSTOMER, 'updateCustomerSuccess')

  return nextIState
}
