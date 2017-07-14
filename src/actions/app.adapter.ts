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
