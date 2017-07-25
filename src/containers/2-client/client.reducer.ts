/**
 * Created by jiangyukun on 2017/7/11.
 */
import {fromJS} from 'immutable'

import {CLIENTS} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'
import ClientState from './ClientState'

const initValue: ClientState = {
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

  addSupplierSuccess: false,
  supplierInfo: null,
  updateSupplierSuccess: false,

  addRfiSuccess: false,
  updateRfiSuccess: false,
}

export default function clients(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CLIENTS.ADD_CUSTOMER + phase.SUCCESS:
      let newCustomerId = action.data
      nextIState = nextIState.set('newCustomerId', newCustomerId)
      break

    case phase.CLEAR + CLIENTS.ADD_CUSTOMER:
      nextIState = nextIState.set('newCustomerId', '')
      break

    case CLIENTS.ADD_SUB_COMPANY + phase.SUCCESS:
      nextIState = nextIState.set('newSubCompanyId', action.data)
      break

    case phase.CLEAR + CLIENTS.ADD_SUB_COMPANY:
      nextIState = nextIState.set('newSubCompanyId', '')
      break

    case CLIENTS.ADD_CONTACT + phase.SUCCESS:
      nextIState = nextIState.set('newContactId', action.data)
      break

    case phase.CLEAR + CLIENTS.ADD_CONTACT:
      nextIState = nextIState.set('newContactId', '')
      break

    case CLIENTS.ADD_SUPPLIER + phase.SUCCESS:
      nextIState = nextIState.set('supplierInfo', action.data)
      break

  }

  nextIState = handleFlagState(nextIState, action, CLIENTS.ADD_CUSTOMER, 'addCustomerSuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_CUSTOMER, 'updateCustomerSuccess')

  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_BD_AND_BDPC, 'updateBdAndBdpcSuccess')

  nextIState = handleFlagState(nextIState, action, CLIENTS.ADD_SUB_COMPANY, 'addSubCompanySuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_SUB_COMPANY, 'updateSubCompanySuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.REMOVE_SUB_COMPANY, 'removeSubCompanySuccess')

  nextIState = handleFlagState(nextIState, action, CLIENTS.ADD_CONTACT, 'addContactSuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_CONTACT, 'updateContactSuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.REMOVE_CONTACT, 'removeContactSuccess')

  nextIState = handleFlagState(nextIState, action, CLIENTS.ADD_SUPPLIER, 'addSupplierSuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_SUPPLIER, 'updateSupplierSuccess')

  nextIState = handleFlagState(nextIState, action, CLIENTS.ADD_RFI, 'addRfiSuccess')
  nextIState = handleFlagState(nextIState, action, CLIENTS.UPDATE_RFI, 'updateRfiSuccess')

  return nextIState
}