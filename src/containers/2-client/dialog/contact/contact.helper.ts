/**
 * Created by jiangyukun on 2017/7/25.
 */
export function getContactOptions(customerContactData) {
  const contactList = customerContactData.data || []
  return contactList.map(item => ({
    value: item.contactId, text: item.contactName
  }))
}
