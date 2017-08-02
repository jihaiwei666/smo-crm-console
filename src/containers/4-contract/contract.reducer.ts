/**
 * Created by jiangyukun on 2017/8/2.
 */
import {fromJS} from 'immutable'
import {CONTRACT} from '../../core/constants/types'
import phase from '../../core/constants/phase'
import {handleFlagState} from '../common/reduxUtils'

const initValue = {
  fetchCodePrefixSuccess: false
}

export default function contract(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {
    case CONTRACT.FETCH_CONTRACT_CODE_PREFIX + phase.SUCCESS:
      nextIState = nextIState.set('newContractCodePrefix', action.data)
      break
  }

  nextIState = handleFlagState(nextIState, action, CONTRACT.FETCH_CONTRACT_CODE_PREFIX, 'fetchCodePrefixSuccess')

  return nextIState
}
