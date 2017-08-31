/**
 * Created by jiangyukun on 2017/7/12.
 */
import {getNameAndEmail} from '../containers/common/common.helper'

export function handleBDListData(BDListData) {
  return BDListData.map(d => ({
    value: d['account'],
    text: getNameAndEmail(d['name'], d['account'])
  }))
}

export function handleBDPCListData(BDPCListData) {
  return BDPCListData.map(d => ({
    value: d['account'],
    text: getNameAndEmail(d['name'], d['account'])
  }))
}

export function handleRecentOpenList(data) {
  return {
    list: data.map(item => ({
      id: item['last_visit_page_id'],
      module: item['type'],
      moduleId: item['target_id'],
      name: item['target_title'],
    }))
  }
}

export function handleAccountInfo(data) {
  return {
    email: data['account'],
    name: data['name'],
    position: data['post_type'],
  }
}
