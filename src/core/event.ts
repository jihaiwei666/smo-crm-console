/**
 * Created by jiangyukun on 2017/9/4.
 */

import events from 'events'

let eventBus = new events.EventEmitter()

export default eventBus

export const EVENT_NAMES = {
  MSA_UPDATE: 'MSA_UPDATE'
}
