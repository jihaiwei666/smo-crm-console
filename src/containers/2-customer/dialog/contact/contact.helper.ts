/**
 * Created by jiangyukun on 2017/7/25.
 */
import {getDate} from '../../../../core/utils/dateUtils'

export function getContactOptions(customerContactData) {
  const contactList = customerContactData.data || []
  return contactList.map(item => ({
    value: item.contactId, text: item.contactName
  }))
}

export function handleVisitRecordList(data) {
  return data.map(item => ({
    visitId: item['visit_record_id'],
    contactId: item['contacts_info_id'],
    visitType: item['visit_way'],
    visitDate: getDate(item['visit_time']),
    nextVisitDate: getDate(item['next_visit_time']),
    visitContent: item['visit_content'],
  }))
}
