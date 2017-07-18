/**
 * Created by jiangyukun on 2017/7/11.
 */
import {fromJS} from 'immutable'

import {CLIENTS} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleClearState} from '../common/reduxUtils'

const initValue = {
  newCustomerId: '',
  addCustomerSuccess: false,
  updateCustomerSuccess: false,
  updateBdAndBdpcSuccess: false,

  newSubCompanyId: '',
  addSubCompanySuccess: false,
  updateSubCompanySuccess: false,
  removeSubCompanySuccess: false,

  newContactId: '',
  addContactSuccess: false,
  updateContactSuccess: false,
  removeContactSuccess: false,
}

export default function clients(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CLIENTS.ADD_CUSTOMER + phase.SUCCESS:
      let newCustomerId = action.data
      nextIState = nextIState.set('addCustomerSuccess', true).set('newCustomerId', newCustomerId)
      break

    case phase.CLEAR + CLIENTS.ADD_CUSTOMER:
      nextIState = nextIState.set('addCustomerSuccess', false).set('newCustomerId', '')
      break

    case CLIENTS.UPDATE_CUSTOMER + phase.SUCCESS:
      nextIState = nextIState.set('updateCustomerSuccess', true)
      break

    case CLIENTS.UPDATE_BD_AND_BDPC + phase.SUCCESS:
      nextIState = nextIState.set('updateBdAndBdpcSuccess', true)
      break

    case CLIENTS.ADD_SUB_COMPANY + phase.SUCCESS:
      nextIState = nextIState.set('newSubCompanyId', action.data).set('addSubCompanySuccess', true)
      break

    case phase.CLEAR + CLIENTS.ADD_SUB_COMPANY:
      nextIState = nextIState.set('addSubCompanySuccess', false).set('newSubCompanyId', '')
      break

    case CLIENTS.UPDATE_SUB_COMPANY + phase.SUCCESS:
      nextIState = nextIState.set('updateSubCompanySuccess', true)
      break

    case CLIENTS.REMOVE_SUB_COMPANY + phase.SUCCESS:
      nextIState = nextIState.set('removeSubCompanySuccess', true)
      break

    case CLIENTS.ADD_CONTACT + phase.SUCCESS:
      nextIState = nextIState.set('newContactId', action.data).set('addContactSuccess', true)
      break

    case phase.CLEAR + CLIENTS.ADD_CONTACT:
      nextIState = nextIState.set('addContactSuccess', false).set('newContactId', '')
      break

    case CLIENTS.UPDATE_CONTACT + phase.SUCCESS:
      nextIState = nextIState.set('updateContactSuccess', true)
      break

    case CLIENTS.REMOVE_CONTACT + phase.SUCCESS:
      nextIState = nextIState.set('removeContactSuccess', true)
      break
  }

  nextIState = handleClearState(nextIState, action, CLIENTS.UPDATE_CUSTOMER, 'updateCustomerSuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.UPDATE_BD_AND_BDPC, 'updateBdAndBdpcSuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.UPDATE_SUB_COMPANY, 'updateSubCompanySuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.REMOVE_SUB_COMPANY, 'removeSubCompanySuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.UPDATE_CONTACT, 'updateContactSuccess')
  nextIState = handleClearState(nextIState, action, CLIENTS.REMOVE_CONTACT, 'removeContactSuccess')

  return nextIState
}
