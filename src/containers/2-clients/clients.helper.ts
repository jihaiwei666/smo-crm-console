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

export function handleCustomerProjectList(data) {
  return data.map(item => ({
    value: item.value,
    text: item.text
  }))
}

export function handleCDA_Detail(data) {
  let cda = data['customerCda']
  return {
    startDate: cda['cda_validity_begin_time'],
    endDate: cda['cda_validity_end_time'],
    protocolType: cda['cda_agreement_type'],
    projectId: cda['cda_agreement_project_id'],
    projectName: cda['cda_agreement_project_name'] || '',
    cdaList: data['customerCdaPersons'].map(item => ({
      id: item['cda_id'],
      username: item['contacts_info_name'],
      telephone: item['contacts_info_telephone'],
      email: item['contacts_info_mail'],
      position: item['contacts_info_position']
    })),
    remark: cda['cda_remark']
  }
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
  const contactList = clientData['customerContactsInfos'] || []
  const cdaList = clientData['customerCdas'] || []
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
    contactList: contactList.map(c => ({
      contactId: c['contacts_info_id'],
      name: c['contacts_info_name'],
      mobile: c['contacts_info_telephone'],
      email: c['contacts_info_mail'],
      position: c['contacts_info_position'],
      sex: (c['contacts_info_sex'] + '') || null,
      address: c['contacts_info_address'],
      remark: c['contacts_info_remark'],
    })),
    cdaList: cdaList.map(item => ({
      id: item['cda_id'],
      startDate: item['cda_validity_begin_time'],
      endDate: item['cda_validity_end_time'],
      remark: item['cda_remark'],
    }))
  }
}
