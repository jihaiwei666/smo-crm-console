import {contractTypeMapper} from './contract.constant'

import {handleAfterSign} from './dialog/after-sign/after-sign.helper'
import {handleOperationList} from '../common/common.helper'
import {handleCollection} from './dialog/make-collections/make-collection.helper'

export function getContractType(type) {
  if (contractTypeMapper[type]) {
    return contractTypeMapper[type]
  }
  return ''
}

export function handleContractList(data) {
  return {
    total: data['totalCount'] || 0,
    list: data['contractList'].map(item => ({
      contractId: item['contract_info_id'],
      contractName: item['contract_name'],
      contractCode: item['contract_code'],
      contractType: item['contract_type'],
      bd: item['customer_the_bd'],
      bdpc: item['customer_the_bdpc'],
    }))
  }
}

export function handleContractDetail(data) {
  const baseInfo = data['contract_info']
  const bdAnBdpc = data['bdAndBdpc']
  const beforeSign = data['contract_before_signed_info'] || {}
  const relationInfo = data['contractRelation_info'] || {}
  const operationList = data['operations'].list || []
  const collectionList = data['collection_info'] || []

  return {
    bdAnBdpc: {
      bd: bdAnBdpc['contract_the_bd'],
      bdpc: bdAnBdpc['contract_the_bdpc']
    },
    baseInfo: {
      contractName: baseInfo['contract_name'],
      codePrefix: baseInfo['contract_project_info_code'],
      serialNumber: baseInfo['contract_serial_code'],
      bdCode: baseInfo['contract_bd_code'],
      isFirstOperation: baseInfo['first_cooperation'],
      projectId: baseInfo['project_info_id']
    },
    beforeSign: {
      beforeSignId: beforeSign['before_signed_id'],
      contractType: beforeSign['contract_type'],
      remark: beforeSign['contract_type_remark'],
      templateType: beforeSign['contract_template'],
    },
    afterSign: handleAfterSign(data['contract_after_signed_info']),
    collectionList: handleCollection(collectionList),
    relationInfo: {
      projects: relationInfo['relationProjects'].map(item => ({
        projectId: item['project_info_id'],
        projectName: item['project_info_name']
      })),
      customers: relationInfo['relationCustomers'].map(item => ({
        customerId: item['customer_info_id'],
        customerName: item['customer_name']
      }))
    },
    operationRecordList: handleOperationList(operationList)
  }
}

export function handleProjectList(data) {
  return data.map(item => ({
    value: item['project_id'],
    text: item['project_name'],
  }))
}

export function handlePartAfterSignInfo(data) {
  return {}
}
