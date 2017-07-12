/**
 * Created by jiangyukun on 2017/7/12.
 */
import phase from '../../core/constants/phase'

export function handleClearState(iState, action, type, key) {
  if (action.type == phase.CLEAR + type) {
    return iState.set(key, false)
  }
  return iState
}
