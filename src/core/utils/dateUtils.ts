/**
 * Created by jiangyukun on 2017/7/25.
 */
import moment from 'moment'

export function getDateStr(d) {
  if (!d) {
    return null
  }
  if (typeof d == 'number') {
    return moment(d).format('YYYY-MM-DD')
  }
  return d.format('YYYY-MM-DD')
}

export function getDate(d) {
  if (!d) {
    return null
  }
  return moment(d)
}
