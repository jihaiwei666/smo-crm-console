/**
 * Created by jiangyukun on 2017/7/25.
 */

interface ClientState {
  newCustomerId: string
  addCustomerSuccess: boolean
  updateCustomerSuccess: boolean

  updateBdAndBdpcSuccess: boolean

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
  supplierInfo: any
  updateSupplierSuccess: boolean

  addRfiSuccess: boolean
  rfiInfo: any
  updateRfiSuccess: boolean
}

export default ClientState
