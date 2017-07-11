/**
 * Created by jiangyukun on 2017/7/11.
 */
export function handleClientList(serverData) {
  return {
    total: serverData['totalCount'],
    list: serverData['customerList'].map(item => ({
      customerId: item['customer_info_id'],
      customerName: item['customer_name'],
      customerCategory: item['customer_type'],
      customerOwner: item['customer_owner'],
      customerCreator: item['create_person']
    }))
  }
}
