/**
 * Created by jiangyukun on 2017/7/24.
 */
import {getDate} from '../../../../core/utils/dateUtils'
import {getSingleFile} from '../../../common/common.helper'
import {handleCrudList} from '../../../../core/crud'

export function handleSupplierServerData(data) {
  data = data || {}
  let base = data['customerProvider'] || {}
  let supplierList = data['customerProviderInfos'] || []
  let lastMas = data['latestCustomerProviderMsa'] || {}
  let msa = lastMas['customerProviderMsaVo'] || {}

  return {
    supplierId: base['provider_id'],
    supplierType: base['provider_type'],
    isDeployment: base['is_signed_msa'],
    supplierList: supplierList.map(supplier => {
      const supplierBaseInfo = supplier['customerProviderInfo']
      const brokers = supplier['customerProviderInfoDockers'] || []
      return {
        id: supplierBaseInfo['provider_info_id'],
        startDate: getDate(supplierBaseInfo['validity_begin_time']),
        endDate: getDate(supplierBaseInfo['validity_end_time']),
        chosenDate: getDate(supplierBaseInfo['validity_select_time']),
        isFixed: supplierBaseInfo['is_fixed'] || '',
        unitPrice: supplierBaseInfo['price'] || '',
        brokerList: brokers.map(broker => ({
          id: broker['provider_info_docker_id'],
          broker: broker['contacts_info_id']
        }))
      }
    }),
    startDate: getDate(msa['msa_begin_time']),
    endDate: getDate(msa['msa_end_time']),
    msaId: msa['provider_msa_id'],
    scanFile: getSingleFile(lastMas['customerProviderMsaFile'])
  }
}

export function handleMsaListData(data) {
  data = data || []
  return data.map(item => {
    let base = item['customerProviderMsaVo']
    return {
      msaId: base['provider_msa_id'],
      startDate: getDate(base['msa_begin_time']),
      endDate: getDate(base['msa_end_time']),
      scanFile: getSingleFile(item['customerProviderMsaFile'])
    }
  })
}

export function handleBrokerListCrud(brokerList, supplierId) {
  return handleCrudList(brokerList, {
    ifAdd: (item) => ({
      "provider_info_id": supplierId,
      "provider_info_docker_id": item.id,
      "contacts_info_id": item.broker,
    }),
    ifRemove: (item) => ({
      "provider_info_docker_id": item.id,
      "contacts_info_id": item.broker,
    }),
    ifUpdate: (item) => ({
      "provider_info_id": supplierId,
      "provider_info_docker_id": item.id,
      "contacts_info_id": item.broker
    })
  })
}
