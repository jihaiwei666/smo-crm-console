/**
 * Created by jiangyukun on 2017/8/8.
 */
import {getDate} from '../../../../core/utils/dateUtils'

export function handleCollection(collectionList) {
  return collectionList.map(item => ({
    collectionId: item['collection_id'],
    nodeDate: getDate(item['payment_node_date']),
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
