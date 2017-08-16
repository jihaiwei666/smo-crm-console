/**
 * Created by jiangyukun on 2017/7/18.
 */

export function handleRecycleBinList(data) {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      id: item['file_id'],
      name: item['file_name'],
      url: item['file_url'],
    }))
  }
}
