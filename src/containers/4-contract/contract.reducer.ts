/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {CONTRACT} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  addContractSuccess: false,
  newContractId: '',
  updateContractSuccess: false,
  updateBdBdpcSuccess: false,
  fetchCodePrefixSuccess: false,
  isFirstOperation: null,
  addBeforeSignSuccess: false,
  newBeforeSignId: '',
  updateBeforeSignSuccess: false,
  addAfterSignSuccess: false,
  newAfterSign: null,
  updateAfterSignSuccess: false,
  updateCollectionSuccess: false,
  updateRemarkAttachmentSuccess: false,
  removeContractSuccess: false
}

export default function contract(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CONTRACT.FETCH_CONTRACT_CODE_PREFIX + phase.SUCCESS:
      const {newContractCodePrefix, isFirstOperation} = action.data
      nextIState = nextIState.set('newContractCodePrefix', newContractCodePrefix).set('isFirstOperation', isFirstOperation)
      break
    case CONTRACT.ADD_CONTRACT + phase.SUCCESS:
      nextIState = nextIState.set('newContractId', action.data)
      break
    case CONTRACT.ADD_BEFORE_SIGN + phase.SUCCESS:
      nextIState = nextIState.set('newBeforeSignId', action.data)
      break
    case CONTRACT.ADD_AFTER_SIGN + phase.SUCCESS:
      nextIState = nextIState.set('newAfterSign', action.data)
      break
  }

  nextIState = handleFlagState(nextIState, action, CONTRACT.ADD_CONTRACT, 'addContractSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_CONTRACT, 'updateContractSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_BD_AND_BDPC, 'updateBdBdpcSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.FETCH_CONTRACT_CODE_PREFIX, 'fetchCodePrefixSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.ADD_BEFORE_SIGN, 'addBeforeSignSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_BEFORE_SIGN, 'updateBeforeSignSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.ADD_AFTER_SIGN, 'addAfterSignSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_AFTER_SIGN, 'updateAfterSignSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_COLLECTION, 'updateCollectionSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_REMARK_ATTACHMENT, 'updateRemarkAttachmentSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.REMOVE_CONTRACT, 'removeContractSuccess')

  return nextIState
}
