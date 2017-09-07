/**
 * Created by jiangyukun on 2017/9/4.
 */

import events from 'events'

let eventBus = new events.EventEmitter()

export default eventBus

export const EVENT_NAMES = {
  MSA_UPDATE: 'MSA_UPDATE',
  ADD_CONTRACT_SUCCESS: 'ADD_CONTRACT_SUCCESS',
  PROJECT_CLIENT_ROLE_CRO: 'PROJECT_CLIENT_ROLE_CRO',
  PROJECT_CLIENT_CHANGE: 'PROJECT_CLIENT_CHANGE',
  PROJECT_CREATE: 'PROJECT_CREATE'
}
