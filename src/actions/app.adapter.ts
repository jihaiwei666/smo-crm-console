/**
 * Created by jiangyukun on 2017/7/12.
 */

export function handleBDListData(BDListData) {
  return BDListData.map(d => ({
    value: d['user_id'],
    text: d['name']
  }))
}

export function handleBDPCListData(BDPCListData) {
  return BDPCListData.map(d => ({
    value: d['user_id'],
    text: d['name']
  }))
}
