/**
 * Created by jiangyukun on 2017/7/11.
 */
import {fromJS} from 'immutable'

import {CUSTOMER} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'
import CustomerState from './CustomerState'

const initValue: CustomerState = {
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
  addVisitRecordSuccess: false,
  updateVisitRecordSuccess: false,
  removeVisitRecordSuccess: false,

  addCdaSuccess: false,
  updateCdaSuccess: false,
  removeCdaSuccess: false,

  addSupplierSuccess: false,
  supplierInfo: null,
  updateSupplierSuccess: false,

  addRfiSuccess: false,
  rfiInfo: null,
  updateRfiSuccess: false,
  removeRfiSuccess: false,

  updateRemarkAttachmentSuccess: false
}

export default function client(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CUSTOMER.ADD_CUSTOMER + phase.SUCCESS:
      let newCustomerId = action.data
      nextIState = nextIState.set('newCustomerId', newCustomerId)
      break

    case phase.CLEAR + CUSTOMER.ADD_CUSTOMER:
      nextIState = nextIState.set('newCustomerId', '')
      break

    case CUSTOMER.ADD_SUB_COMPANY + phase.SUCCESS:
      nextIState = nextIState.set('newSubCompanyId', action.data)
      break

    case phase.CLEAR + CUSTOMER.ADD_SUB_COMPANY:
      nextIState = nextIState.set('newSubCompanyId', '')
      break

    case CUSTOMER.ADD_CONTACT + phase.SUCCESS:
      nextIState = nextIState.set('newContactId', action.data)
      break

    case phase.CLEAR + CUSTOMER.ADD_CONTACT:
      nextIState = nextIState.set('newContactId', '')
      break

    case CUSTOMER.ADD_SUPPLIER + phase.SUCCESS:
      nextIState = nextIState.set('supplierInfo', action.data)
      break
    case CUSTOMER.ADD_RFI + phase.SUCCESS:
      nextIState = nextIState.set('rfiInfo', action.data)
      break
  }

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_CUSTOMER, 'addCustomerSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_CUSTOMER, 'updateCustomerSuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_BD_AND_BDPC, 'updateBdAndBdpcSuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_SUB_COMPANY, 'addSubCompanySuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_SUB_COMPANY, 'updateSubCompanySuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.REMOVE_SUB_COMPANY, 'removeSubCompanySuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_CONTACT, 'addContactSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_CONTACT, 'updateContactSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.REMOVE_CONTACT, 'removeContactSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_VISIT_RECORD, 'addVisitRecordSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_VISIT_RECORD, 'updateVisitRecordSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.REMOVE_VISIT_RECORD, 'removeVisitRecordSuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_CDA, 'addCdaSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_CDA, 'updateCdaSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.REMOVE_CDA, 'removeCdaSuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_SUPPLIER, 'addSupplierSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_SUPPLIER, 'updateSupplierSuccess')

  nextIState = handleFlagState(nextIState, action, CUSTOMER.ADD_RFI, 'addRfiSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_RFI, 'updateRfiSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.REMOVE_RFI, 'removeRfiSuccess')
  nextIState = handleFlagState(nextIState, action, CUSTOMER.UPDATE_REMARK_AND_ATTACHMENT, 'updateRemarkAttachmentSuccess')

  return nextIState
}
