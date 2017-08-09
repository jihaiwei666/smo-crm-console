/**
 * Created by jiangyukun on 2017/7/24.
 */
export const DELETE = '1'
export const ADD = '2'
export const EDIT = '3'
export const UPDATE = '3'

export default {
  ADD, DELETE, UPDATE
}

export function handleCrudList(list, option) {
  return list.filter(item => item.crud != null).map(item => {
    if (item.crud == DELETE) {
      return {
        ...option.ifDelete(item),
        "sign": DELETE
      }
    } else if (item.crud == UPDATE) {
      return {
        ...option.ifUpdate(item),
        "sign": UPDATE
      }
    } else if (item.crud == ADD) {
      return {
        ...option.ifAdd(item),
        "sign": ADD
      }
    }
  })
}
