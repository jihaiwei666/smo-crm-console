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

/**
 * 分页当中，要显示的页数，返回长度为0-10的数组
 * @param pageTotal 总页数
 * @param currentPage 从1开始
 * @returns
 */
export function calculatePageIndex(pageTotal, currentPage) {
  let i, j, pageToShowLength = 5
  let beforeCount = 4, afterCount, current = currentPage
  let pages = []

  if (typeof pageTotal != 'number' || pageTotal < 1) {
    return []
  }
  else if (pageTotal == 1) {
    return [1]
  }
  pages.push(1)

  let start = current - beforeCount
  if (start < 2) {
    start = 2
    beforeCount = current - 2
    if (beforeCount < 0) {
      beforeCount = 0
    }
  } else if (start > 2) {
    pages.push('...')
  }
  for (i = start; i <= current; i++) {
    pages.push(i)
  }
  afterCount = pageToShowLength - beforeCount
  for (i = current + 1, j = 0; i < pageTotal; i++) {
    if (j > afterCount) {
      if (i != pageTotal - 1) {
        pages.push('...')
      }
      break
    }
    pages.push(i)
    j++
  }
  if (current != pageTotal) {
    pages.push(pageTotal)
  }
  return pages
}
