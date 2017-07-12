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

export function handleClientInfo(clientData) {
  const baseInfo = clientData['customerInfo']
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
    }
  }
}
