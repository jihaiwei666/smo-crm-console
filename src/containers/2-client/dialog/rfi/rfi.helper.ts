/**
 * Created by jiangyukun on 2017/7/24.
 */
import {getDateStr} from '../../../../core/utils/dateUtils'

export function handleRfiServerData(data) {
  const rfiBase = data['customerRfi'] || {}
  const list = data['customerRfiDockerList'] || []
  return {
    rfiId: rfiBase['customer_rfi_id'],
    fillDate: getDateStr(rfiBase['write_time']),
    fillPerson: rfiBase['write_person'],
    auditPerson: rfiBase['review_person'],
    language: rfiBase['language'],
    modules: rfiBase['model'].split(','),
    remark: rfiBase['model_remark'],
    brokerList: list.map(item => ({
      id: item['customer_rfi_docker_id'],
      contactId: item['contacts_info_id'],
    }))
  }
}
