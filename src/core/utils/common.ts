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

export function isEmpty(v) {
  return v == null || v == ''
}

/**
 * 3位逗号分隔
 * @param value
 * @return {string}
 */
export function getMoneyText(value) {
  if (!value) return ''
  let integer = value
  let decimal = ''
  if (value.indexOf('.') != -1) {
    integer = value.substring(0, value.indexOf('.'))
    decimal = value.substring(value.indexOf('.'))
  }
  let i = 1, p = integer.length - 3 * i
  let result = ''
  while (p > 0) {
    result = ',' + integer.substr(p, 3) + result
    p = integer.length - 3 * ++i
  }
  if (p <= 0) {
    result = integer.substr(0, p + 3) + result
  }
  return result + decimal
}
