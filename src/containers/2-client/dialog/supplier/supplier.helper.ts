/**
 * Created by jiangyukun on 2017/7/24.
 */

export function handleSupplierServerData(data) {
  data = data || {}
  let base = data['customerProvider'] || {}
  let supplierList = data['customerProviderInfos'] || []
  return {
    supplierId: base['provider_id'],
    supplierType: base['provider_type'],
    isDeployment: base['is_signed_msa'],
    supplierList: supplierList.map(supplier => {
      const supplierBaseInfo = supplier['customerProviderInfo']
      const brokers = supplier['customerProviderInfoDockers'] || []
      return {
        id: supplierBaseInfo['provider_info_id'],
        startDate: supplierBaseInfo['validity_begin_time'] || '',
        endDate: supplierBaseInfo['validity_end_time'] || '',
        chosenDate: supplierBaseInfo['validity_select_time'] || '',
        isFixed: supplierBaseInfo['is_fixed'] || '',
        unitPrice: supplierBaseInfo['price'] || '',
        brokerList: brokers.map(broker => ({
          id: broker['provider_info_docker_id'],
          broker: broker['contacts_info_id']
        }))
      }
    })
  }
}

export function handleMsaListData(data) {
  return data.map(item => ({
    msaId: item['provider_msa_id'],
    startDate: item['msa_begin_time'],
    endDate: item['msa_end_time']
  }))
}
