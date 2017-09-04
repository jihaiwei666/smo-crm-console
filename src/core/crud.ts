/**
 * Created by jiangyukun on 2017/7/24.
 */
import {Config} from '../components/hoc/listCrud'

export const DEFAULT = '-1'

export const DELETE = '1'
export const REMOVE = '1'

export const ADD = '2'

export const EDIT = '3'
export const UPDATE = '3'

export default {
  DEFAULT, ADD, REMOVE, DELETE, UPDATE
}

export function handleCrudList(list, option: Config, parentId?: string) {
  return list.filter(item => item.crud != null).map(item => {
    if (item.crud == DELETE) {
      return {
        ...option.ifRemove(item),
        "sign": DELETE
      }
    } else if (item.crud == UPDATE) {
      return {
        ...option.ifUpdate(item),
        "sign": UPDATE
      }
    } else if (item.crud == ADD) {
      return {
        ...option.ifAdd(item, parentId),
        "sign": ADD
      }
    }
  })
}

export function handleItemUpdate(item) {
  if (item.crud != ADD) {
    item.crud = UPDATE
  }
}
