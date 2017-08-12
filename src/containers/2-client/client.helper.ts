/**
 * Created by jiangyukun on 2017/7/11.
 */
import {handleSupplierServerData} from './dialog/supplier/supplier.helper'
import {handleRfiServerData} from './dialog/rfi/rfi.helper'
import {getDateStr} from '../../core/utils/dateUtils'
import {handleOperationList} from '../common/common.helper'
import {customerTypeMapper} from './customer.constant'

export function getCustomerType(type) {
  return customerTypeMapper[type]
}

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

export function handleClientInfo(clientData) {
  const baseInfo = clientData['customerInfo'] || {}
  const bdAndBdpc = clientData['bdAndBdpc'] || {}
  const subCompany = clientData['customerSubsidiarys'] || []
  const contactInfo = clientData['customerContactsInfos'] || []
  const cdaList = clientData['customerCdas'] || []
  const supplierInfo = clientData['customerProvider'] || {}
  const rfi = clientData['customerRfi'] || {}
  const relationInfo = clientData['customerRelationInfo'] || []
  const operationRecordList = clientData['operations'] || []
  const remarkAttachment = clientData['remarkAndFile'] || {}

  return {
    customerBaseInfo: {
      customerName: baseInfo['customer_name'] || '',
      customerCategory: (baseInfo['customer_type'] + '') || null,
      customerAddress: baseInfo['customer_address'] || '',
      importantLevel: (baseInfo['customer_important_level'] + '') || null,
      taxpayerIdentifyNumber: baseInfo['billing_taxpayer_number'] || '',
      bank: baseInfo['billing_open_bank'],
      bankAccount: baseInfo['billing_open_bank_account'],
      billAddress: baseInfo['billing_address'],
      telephone: baseInfo['billing_telephone'],
      billPostAddress: baseInfo['billing_invoice_mailing_address'],
      billReceiver: baseInfo['billing_invoice_recipient'],
      receiverContactInfo: baseInfo['billing_recipient_contact'],
    },
    bdAndBdpc: {
      owner: bdAndBdpc['customer_owner'],
      bdpc: bdAndBdpc['customer_the_bdpc'],
    },
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
      sex: c['contacts_info_sex'] || null,
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
    rfiInfo: handleRfiServerData(rfi),
    relationInfo: {
      projects: relationInfo['relationProjects'].map(item => ({
        projectId: item['project_info_id'],
        projectName: item['project_info_name']
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
