/**
 * Created by jiangyukun on 2017/8/12.
 */
import {fromJS} from 'immutable'

import {PROJECT} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  newProjectId: '',
  addProjectInfoSuccess: false,
  updateProjectInfoSuccess: false,
  updateBd_BdpcSuccess: false,
  addBeforeQuotationSuccess: false,
  newBeforeQuotation: null,
  updateBeforeQuotationSuccess: false,

  addAfterQuotationSuccess: false,
  newAfterQuotation: null,
  updateAfterQuotationSuccess: false,
  updateRemarkAttachmentSuccess: false,
}

export default function project(iState = fromJS(initValue), action) {
  let nextIState = iState
  switch (action.type) {
    case PROJECT.ADD_PROJECT_INFO + phase.SUCCESS:
      nextIState = nextIState.set('newProjectId', action.data)
      break
    case PROJECT.ADD_BEFORE_QUOTATION + phase.SUCCESS:
      nextIState = nextIState.set('newBeforeQuotation', action.data)
      break
    case PROJECT.ADD_AFTER_QUOTATION + phase.SUCCESS:
      nextIState = nextIState.set('newAfterQuotation', action.data)
      break
  }

  nextIState = handleFlagState(nextIState, action, PROJECT.ADD_PROJECT_INFO, 'addProjectInfoSuccess')
  nextIState = handleFlagState(nextIState, action, PROJECT.UPDATE_PROJECT_INFO, 'updateProjectInfoSuccess')

  nextIState = handleFlagState(nextIState, action, PROJECT.UPDATE_BD_AND_BDPC, 'updateBd_BdpcSuccess')

  nextIState = handleFlagState(nextIState, action, PROJECT.ADD_BEFORE_QUOTATION, 'addBeforeQuotationSuccess')
  nextIState = handleFlagState(nextIState, action, PROJECT.UPDATE_BEFORE_QUOTATION, 'updateBeforeQuotationSuccess')

  nextIState = handleFlagState(nextIState, action, PROJECT.ADD_AFTER_QUOTATION, 'addAfterQuotationSuccess')
  nextIState = handleFlagState(nextIState, action, PROJECT.UPDATE_AFTER_QUOTATION, 'updateAfterQuotationSuccess')

  nextIState = handleFlagState(nextIState, action, PROJECT.UPDATE_REMARK_ATTACHMENT, 'updateRemarkAttachmentSuccess')

  return nextIState
}
