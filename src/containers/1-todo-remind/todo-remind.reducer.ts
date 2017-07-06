/**
 * Created by jiangyukun on 2017/7/6.
 */
import {fromJS} from 'immutable'

import {TODO_REMIND} from '../../core/constants/types'
import phase from '../../core/constants/phase'

const initValue = {}
export default function todoRemind(iState = fromJS(initValue), action) {
  let nextIState = iState
  switch (action.type) {

  }
  return nextIState
}
