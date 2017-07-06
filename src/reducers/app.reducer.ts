/**
 * Created by jiangyukun on 2017/7/5.
 */
import {fromJS, Map} from 'immutable'

import phase from '../core/constants/phase'

const initValue = {}

export default function _app(iState = fromJS(initValue), action) {

  return iState
}
