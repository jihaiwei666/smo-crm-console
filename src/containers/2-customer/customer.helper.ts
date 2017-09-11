/**
 * Created by jiangyukun on 2017/7/11.
 */
import {getDateStr} from '../../core/utils/dateUtils'
import {handleSupplierServerData} from './dialog/supplier/supplier.helper'
import {handleLastRfiDetail} from './dialog/rfi/rfi.helper'
import {handleOperationList, getNullValue, handleAttachmentList, handleButtonOperation, handleItemOperation} from '../common/common.helper'
import {customerTypeMapper} from './customer.constant'

export function getCustomerType(type) {
  return customerTypeMapper[type]
}

export function handleClientList(data) {
  return {
    total: data['totalCount'],
    list: data['customerList'].map(item => ({
      customerId: item['customer_info_id'],
      customerName: item['customer_name'],
      customerCategory: item['customer_type'],
      customerOwner: item['customer_owner'],
      customerOwnerName: item['customer_owner_name'],
      customerCreator: item['create_person'],
      customerCreatorName: item['create_person_name'],
      operation: handleItemOperation(item['permissionOperation'])
    })),
    operation: handleButtonOperation(data['buttonPermission'])
  }
}

export function handleSimilarName(data) {
  return data
}

export function handleCustomerProjectList(data) {
  return data.map(item => ({
    value: item['project_info_id'],
    text: item['project_info_name']
  }))
}

export function handleCustomerContactList(data) {
  return data.map(item => ({
    contactId: item['contacts_info_id'],
    contactName: item['contacts_info_name'],
    telephone: item['contacts_info_telephone'],
    email: item['contacts_info_mail'],
    position: item['contacts_info_position'],
  }))
}

export function handleCustomerBasicInfo(baseInfo) {
  return {
    customerName: baseInfo['customer_name'] || '',
    customerCategory: getNullValue(baseInfo['customer_type']),
    customerAddress: baseInfo['customer_address'] || '',
    importantLevel: getNullValue(baseInfo['customer_important_level']),
    customerNumber: baseInfo['customer_code'],
    taxpayerIdentifyNumber: baseInfo['billing_taxpayer_number'] || '',
    bank: baseInfo['billing_open_bank'],
    bankAccount: baseInfo['billing_open_bank_account'],
    billAddress: baseInfo['billing_address'],
    telephone: baseInfo['billing_telephone'],
    billPostAddress: baseInfo['billing_invoice_mailing_address'],
    billReceiver: baseInfo['billing_invoice_recipient'],
    receiverContactInfo: baseInfo['billing_recipient_contact'],
  }
}

export function handleCustomerRemarkAttachment(remarkAttachment) {
  return {
    remark: remarkAttachment['remark'] || '',
    attachment: handleAttachmentList(remarkAttachment['files'])
  }
}

export function handleCustomerBdBdpc(bdAndBdpc) {
  return {
    owner: bdAndBdpc['customer_owner'],
    bdpc: bdAndBdpc['customer_the_bdpc'],
  }
}

export function handleClientInfo(data) {
  const baseInfo = data['customerInfo'] || {}
  const bdAndBdpc = data['bdAndBdpc'] || {}
  const subCompany = data['customerSubsidiarys'] || []
  const contactInfo = data['customerContactsInfos'] || []
  const cdaList = data['customerCdas'] || []
  const supplierInfo = data['customerProvider'] || {}
  const rfi = data['customerRfi'] || {}
  const relationInfo = data['customerRelationInfo'] || []
  const operationRecordList = data['operations'] || []
  const remarkAttachment = data['remarkAndFile'] || {}

  return {
    customerBaseInfo: handleCustomerBasicInfo(baseInfo),
    bdAndBdpc: handleCustomerBdBdpc(bdAndBdpc),
    subCompanyList: subCompany.map(c => ({
      companyId: c['subsidiary_id'],
      companyName: c['subsidiary_name'],
      contactName: c['contacts_name'],
      contactMobile: c['contacts_telephone'],
      contactEmail: c['contacts_mail'],

      taxpayerIdentifyNumber: c['billing_taxpayer_number'],
      bank: c['billing_open_bank'],
      bankAccount: c['billing_open_bank_account'],
      billAddress: c['billing_address'],
      billMobile: c['billing_telephone'],
      billPostAddress: c['billing_invoice_mailing_address'],
      billReceiver: c['billing_invoice_recipient'],
      receiverContactInfo: c['billing_recipient_contact'],
    })),
    contactInfo: contactInfo.map(c => ({
      contactId: c['contacts_info_id'],
      name: c['contacts_info_name'],
      mobile: c['contacts_info_telephone'],
      email: c['contacts_info_mail'],
      position: c['contacts_info_position'],
      sex: getNullValue(c['contacts_info_sex']),
      address: c['contacts_info_address'],
      remark: c['contacts_info_remark'],
    })),
    cdaList: cdaList.map(item => ({
      id: item['cda_id'],
      startDate: getDateStr(item['cda_validity_begin_time']),
      endDate: getDateStr(item['cda_validity_end_time']),
      remark: item['cda_remark'],
    })),
    supplierInfo: handleSupplierServerData(supplierInfo),
    rfiInfo: handleLastRfiDetail(rfi),
    relationInfo: {
      projects: relationInfo['relationProjects'].map(item => ({
        projectId: item['project_info_id'],
        projectName: item['project_info_name']
      }))
    },
    remarkAttachment: handleCustomerRemarkAttachment(remarkAttachment),
    operationRecordList: handleOperationList(operationRecordList),
    authority: handleDetailAuthority(data['customerModuleAuth'])
  }
}

function handleDetailAuthority(authority) {
  return {
    look: {
      basicInfo: authority['is_can_read_customer_info'],
      cda: authority['is_can_read_customer_cda'],
      contact: authority['is_can_read_customer_contacts'],
      supplier: authority['is_can_read_customer_provider'],
      rfi: authority['is_can_read_customer_rfi'],
      subCompany: authority['is_can_read_customer_subsidiary'],
    },
    edit: {
      basicInfo: authority['is_can_edit_customer_info'],
      cda: authority['is_can_edit_customer_cda'],
      contact: authority['is_can_edit_customer_contacts'],
      supplier: authority['is_can_edit_customer_provider'],
      rfi: authority['is_can_edit_customer_rfi'],
      subCompany: authority['is_can_edit_customer_subsidiary'],
    }
  }
}
