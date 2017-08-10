/**
 * Created by jiangyukun on 2017/7/18.
 */

export function handleRecycleBinList(data) {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      name: item
    }))
  }
}