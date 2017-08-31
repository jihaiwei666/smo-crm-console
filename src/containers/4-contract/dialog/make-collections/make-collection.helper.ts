/**
 * Created by jiangyukun on 2017/8/8.
 */
import {getDate} from '../../../../core/utils/dateUtils'

export function handleCollectionList(collectionList) {
  return collectionList.filter(item => item != null).map(item => ({
    paymentNode: item['pay_node_type'],
    collectionId: item['collection_id'],
    nodeDate: getDate(item['payment_node_date']),
    progressNode: item['payment_node_key'],
    progressQuota: item['payment_node_value'],
    progressDate: getDate(item['payment_node_estimated_date']),
    collectionMoney: item['receivables_amount'],
    po: item['invoice_content_po'],
    invoiceTitle: item['invoice_content_title'],
    money: item['invoice_content_amount'],
    taxRate: item['invoice_cost_detail_taxes_rate'],
    invoicePostAddress: item['invoice_mailing_address'],
    invoiceReceiver: item['invoice_recipient'],
    receiverContactInfo: item['invoice_recipient_contact'],
    institution: item['biling_apply_date'],
    invoiceDate: getDate(item['biling_date']),
    pressForMoneyDate: getDate(item['remind_reminders_date']),
    makeCollectionsDate: getDate(item['payment_date']),
    makeCollectionsValue: item['payment_money'],
  }))
}

export function handleInstitutionList(data) {
  return data.map(item => ({
    value: item['subsidiary_id'],
    text: item['subsidiary_name']
  }))
}

export function handleInstitutionInfo(data) {
  return {
    address: data['billing_address'],
    bank: data['billing_open_bank'],
    bankAccount: data['billing_open_bank_account'],
    taxpayerNumber: data['billing_taxpayer_number'],
    telephone: data['billing_telephone'],
  }
}
