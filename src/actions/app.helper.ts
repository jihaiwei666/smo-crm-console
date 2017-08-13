/**
 * Created by jiangyukun on 2017/7/12.
 */

export function handleBDListData(BDListData) {
  return BDListData.map(d => ({
    value: d['account'],
    text: d['account']
  }))
}

export function handleBDPCListData(BDPCListData) {
  return BDPCListData.map(d => ({
    value: d['account'],
    text: d['account']
  }))
}

export function handleOperationHistoryList(data) {
  return data.map()
}

export function handleRecentOpenList(data) {
  return {
    total: data['totalCount'],
    list: data['list'].map(item => ({
      id: item['target_id'],
      module: item['type'],
      name: item['target_title'],
    }))
  }
}
