/**
 * Created by jiangyukun on 2017/7/5.
 */
import {fromJS, Map} from 'immutable'
import {MESSAGE_STATUS, MESSAGE_TYPE} from 'app-core/message/message.constants'

import phase from '../core/constants/phase'

const initValue = {
  msgQueue: []
}

let uid = 1
export default function _app(iState = fromJS(initValue), action) {
  let nextIState = iState

  if (action.type.indexOf(phase.FAILURE) != -1) {
    nextIState = nextIState.update('msgQueue', msgQueue => msgQueue.push(Map({
      id: uid++,
      status: MESSAGE_STATUS.TO_SHOW,
      content: action.err,
      msgType: MESSAGE_TYPE.FAILURE,
      timeout: 3000
    })))
  }

  return nextIState
}
