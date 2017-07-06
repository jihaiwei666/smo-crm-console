/**
 * http请求3个阶段的封装
 * Created by jiangyukun on 2017/1/25.
 */
import {showMessage} from 'app-core/message/message.action'
import {MESSAGE_TYPE} from 'app-core/message/message.constants'

import phase from '../core/constants/phase'

export const THREE_PHASE = Symbol('THREE_PHASE')

export default ({dispatch, getState}) => next => action => {
  const threePhase = action[THREE_PHASE]
  if (typeof threePhase === 'undefined') {
    return next(action)
  }
  const type = threePhase.type
  next({type: type + phase.START})

  threePhase.http(getState()).then(handleResponseData, handleError)

  function getDataReducerNeed(response) {
    if (!threePhase.handleResponse) {
      return {}
    }
    return threePhase.handleResponse(response)
  }

  function handleResponseData(response) {
    return next({type: type + phase.SUCCESS, data: getDataReducerNeed(response)})
  }

  function handleError(err) {
    next(showMessage({
      msgType: MESSAGE_TYPE.FAILURE,
      content: err
    }))
    // return next({type: type + phase.FAILURE, err})
  }

  function logError(err) {
    console.error(err)
  }
}
