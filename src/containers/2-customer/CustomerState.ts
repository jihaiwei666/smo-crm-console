/**
 * Created by jiangyukun on 2017/7/25.
 */

interface CustomerState {
  newCustomerId: string
  addCustomerSuccess: boolean
  updateCustomerSuccess: boolean
  removeCustomerSuccess: boolean

  updateBdAndBdpcSuccess: boolean
  applyBdpcFollowUpSuccess: boolean

  newSubCompanyId: string
  addSubCompanySuccess: boolean
  updateSubCompanySuccess: boolean
  removeSubCompanySuccess: boolean

  newContactId: string
  addContactSuccess: boolean
  updateContactSuccess: boolean
  removeContactSuccess: boolean
  addVisitRecordSuccess: boolean
  updateVisitRecordSuccess: boolean
  removeVisitRecordSuccess: boolean

  addCdaSuccess: boolean
  updateCdaSuccess: boolean
  removeCdaSuccess: boolean

  addSupplierSuccess: boolean
  newSupplierInfo: any
  updateSupplierSuccess: boolean
  addMsaSuccess: boolean
  updateMsaSuccess: boolean
  removeMsaSuccess: boolean

  addRfiSuccess: boolean
  newRfiInfo: any
  updateRfiSuccess: boolean
  removeRfiSuccess: boolean

  updateRemarkAttachmentSuccess: boolean
}

export default CustomerState
