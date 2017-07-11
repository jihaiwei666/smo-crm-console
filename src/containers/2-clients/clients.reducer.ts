/**
 * Created by jiangyukun on 2017/7/11.
 */
import {fromJS} from 'immutable'

import {CLIENTS} from '../../core/constants/types'
import phase from '../../core/constants/phase'

const initValue = {
  addCustomerSuccess: false,
  customerId: ''
}

export default function clients(iState = fromJS(initValue), action) {
  let nextIState = iState

  switch (action.type) {

  }

  return nextIState
}
