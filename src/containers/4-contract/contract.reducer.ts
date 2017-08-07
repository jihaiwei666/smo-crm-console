/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {CONTRACT} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  fetchCodePrefixSuccess: false,
  isFirstOperation: null,
  addAfterSignSuccess: false,
  updateAfterSignSuccess: false,
}

export default function contract(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CONTRACT.FETCH_CONTRACT_CODE_PREFIX + phase.SUCCESS:
      const {newContractCodePrefix, isFirstOperation} = action.data
      nextIState = nextIState.set('newContractCodePrefix', newContractCodePrefix).set('isFirstOperation', isFirstOperation)
      break

  }

  nextIState = handleFlagState(nextIState, action, CONTRACT.FETCH_CONTRACT_CODE_PREFIX, 'fetchCodePrefixSuccess')

  nextIState = handleFlagState(nextIState, action, CONTRACT.ADD_AFTER_SIGN, 'addAfterSignSuccess')
  nextIState = handleFlagState(nextIState, action, CONTRACT.UPDATE_AFTER_SIGN, 'updateAfterSignSuccess')

  return nextIState
}
