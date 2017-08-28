/**
 * Created by jiangyukun on 2017/4/20.
 */
import {fromJS} from 'immutable'

/**
 * 复制对象，object或者list
 */
export function copyList(obj: any[]): any[] {
  return fromJS(obj).toJS()
}

export function toPercent(value) {
  if (!value) {
    return '0.00%'
  }
  try {
    return (parseFloat(value) * 100).toFixed(2) + '%'
  } catch (e) {
    return value
  }
}

export function downloadFile(src) {
  let $a = document.createElement('a')
  $a.setAttribute("href", src)
  $a.setAttribute("download", "")

  let evObj = document.createEvent('MouseEvents')
  evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
  $a.dispatchEvent(evObj)
}

export function notEmpty(v) {
  return v != null && v != ''
}
