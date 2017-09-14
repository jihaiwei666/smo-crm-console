import {contractTypeMapper} from './contract.constant'

import {handleAfterSign} from './dialog/after-sign/after-sign.helper'
import {handleOperationList, handleAttachmentList, handleButtonOperation, handleItemOperation, getNameAndEmail} from '../common/common.helper'
import {handleCollectionList} from './dialog/make-collections/make-collection.helper'
import {finalPermission} from '../../core/permission'

export function getContractType(type) {
  if (contractTypeMapper[type]) {
    return contractTypeMapper[type]
  }
  return ''
}

export function handleContractList(data) {
  let list = data['contractList'] || []
  return {
    total: data['totalCount'] || 0,
    list: list.map(item => ({
      contractId: item['contract_info_id'],
      contractName: item['contract_name'],
      contractCode: item['contract_code'],
      contractType: item['contract_type'],
      bd: item['customer_the_bd'],
      bdName: item['customer_the_bd_name'],
      bdpc: item['customer_the_bdpc'],
      bdpcName: item['customer_the_bdpc_name'],
      operation: handleItemOperation(item['permissionOperation'])
    })),
    operation: handleButtonOperation(data['buttonPermission'])
  }
}

export function handleContractRemarkAttachment(remarkAttachment) {
  return {
    remark: remarkAttachment['remark'] || '',
    attachment: handleAttachmentList(remarkAttachment['files'])
  }
}

export function handleContractBdBdpc(bdAnBdpc) {
  bdAnBdpc = bdAnBdpc || {}
  return {
    bd: bdAnBdpc['contract_the_bd'],
    bdName: getNameAndEmail(bdAnBdpc['contract_the_bd_name'], bdAnBdpc['contract_the_bd']),
    bdpc: bdAnBdpc['contract_the_bdpc']
  }
}

export function handleContractDetail(data) {
  if (!data['contract_info']) return null
  const baseInfo = data['contract_info'] || {}
  const bdAnBdpc = data['bdAndBdpc'] || {}
  const beforeSign = data['contract_before_signed_info'] || {}
  const afterSign = data['contract_after_signed_info'] || {}
  const relationInfo = data['contractRelation_info'] || {}
  const operationList = (data['operations'] || {}).list || []
  const collectionList = data['collection_info'] || []
  const remarkAttachment = data['contractFiles'] || {}

  return {
    bdAnBdpc: handleContractBdBdpc(bdAnBdpc),
    baseInfo: {
      contractName: baseInfo['contract_name'],
      codePrefix: baseInfo['contract_project_info_code'],
      serialNumber: baseInfo['contract_serial_code'],
      bdCode: baseInfo['contract_bd_code'],
      isFirstOperation: baseInfo['first_cooperation'],
      projectId: baseInfo['project_info_id'],
      projectName: baseInfo['project_info_name']
    },
    beforeSign: {
      beforeSignId: beforeSign['before_signed_id'],
      contractType: beforeSign['contract_type'],
      remark: beforeSign['contract_type_remark'],
      templateType: beforeSign['contract_template'],
    },
    afterSign: handleAfterSign(afterSign),
    collectionList: handleCollectionList(collectionList),
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
    remarkAttachment: handleContractRemarkAttachment(remarkAttachment),
    operationRecordList: handleOperationList(operationList),
    authority: handleContractAuthority(data['contractModuleAuth'])
  }
}

export function handleProjectList(data) {
  return data.map(item => ({
    value: item['project_id'],
    text: item['project_name'],
  }))
}

export function handlePartAfterSignInfo(data) {
  data = data || {}
  let types = data['service_type'] || ''
  return {
    indication: data['indication'],
    serviceTypes: types.split(','),
    centerNumber: data['center_number'],
    enrollmentCount: data['group_number']
  }
}

export function getIsFirstOperation(value) {
  if (value == '1') {
    return '是'
  }
  if (value == '2') {
    return '否'
  }
  return ''
}

function handleContractAuthority(authority) {
  return {
    look: {
      basicInfo: finalPermission(authority['is_can_read_contract_info']),
      beforeSign: finalPermission(authority['is_can_read_contract_before_signed']),
      afterSign: finalPermission(authority['is_can_read_contract_after_signed']),
      makeCollection: finalPermission(authority['is_can_read_contract_collection'])
    },
    edit: {
      basicInfo: finalPermission(authority['is_can_edit_contract_info']),
      beforeSign: finalPermission(authority['is_can_edit_contract_before_signed']),
      afterSign: finalPermission(authority['is_can_edit_contract_after_signed']),
      makeCollection: finalPermission(authority['is_can_edit_contract_collection'])
    }
  }
}
