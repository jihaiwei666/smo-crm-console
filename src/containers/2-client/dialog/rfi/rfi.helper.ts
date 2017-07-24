/**
 * Created by jiangyukun on 2017/7/24.
 */
export function handleRfiServerData(data) {
  const rfiBase = data['customerRfi']
  const list = data['customerRfiDockerList']
  return {
    rfiId: rfiBase['customer_rfi_id'],
    fillDate: rfiBase['write_time'],
    fillPerson: rfiBase['write_person'],
    auditPerson: rfiBase[''],
    language: rfiBase[''],
    brokerList: list.map(item => ({
      id: item[''],
      broker: item[''],
      telephone: item[''],
      email: item[''],
      position: item[''],
    }))
  }
}
