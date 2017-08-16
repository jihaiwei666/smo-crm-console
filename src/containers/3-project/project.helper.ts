import {handleOperationList} from '../common/common.helper'
import {handleBeforeQuotation} from './dialog/before-quotation/before-quotation.helper'
import {handleAfterQuotation} from './dialog/after-quotation/after-quotation.helper'

export function handleProjectList(data) {
  return {
    total: data['totalCount'],
    list: data['projectList'].map(item => ({
      projectId: item['project_info_id'],
      customerName: item['customer_name'],
      projectName: item['project_info_name'],
      projectCode: item['project_info_code'],
      bd: item['project_the_bd'],
      bdpc: item['project_the_bdpc'],
    }))
  }
}

export function handleClientList(data) {
  return data.map(item => ({
    value: item['customer_info_id'],
    text: item['customer_name']
  }))
}

export function handleProjectDetail(data) {
  const baseInfo = data['projectInfo']
  const bdAndBdpc = data['bdAndBdpc']
  const beforeQuotation = data['projectBeforeOffer'] || {}
  const afterQuotation = data['projectAfterOffer'] || {}
  const relationInfo = data['projectRelationInfo'] || {}
  const operationRecordList = data['operations']
  const remarkAttachment = data['remarkAndFile'] || {}
  return {
    baseInfo: {
      projectName: baseInfo['project_info_name'] || '',
      projectCode: baseInfo['project_info_code'] || '',
      relativeClient: baseInfo['customer_info_id'] || '',
    },
    bdAndBdpc: {
      bd: bdAndBdpc['project_the_bd'],
      bdpc: bdAndBdpc['project_the_bdpc']
    },
    beforeQuotation: handleBeforeQuotation(beforeQuotation),
    afterQuotation: handleAfterQuotation(afterQuotation),
    relationInfo: {
      customers: relationInfo['relationCustomers'].map(item => ({
        customerId: item['customer_info_id'],
        customerName: item['customer_name']
      })),
      contracts: relationInfo['relationContracts'].map(item => ({
        contractId: item['contract_info_id'],
        contractName: item['contract_name']
      }))
    },
    remarkAttachment: {
      remark: remarkAttachment['remark'] || '',
      attachment: remarkAttachment['files'].map(item => ({
        id: item['file_id'],
        fileUrl: item['file_url'],
        fileName: item['file_name'],
      }))
    },
    operationRecordList: handleOperationList(operationRecordList)
  }
}
