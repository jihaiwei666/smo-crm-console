/**
 * Created by jiangyukun on 2017/7/25.
 */

interface ClientState {
  newCustomerId: string,
  addCustomerSuccess: boolean,
  updateCustomerSuccess: boolean,

  updateBdAndBdpcSuccess: boolean,

  newSubCompanyId: string,
  addSubCompanySuccess: boolean,
  updateSubCompanySuccess: boolean,
  removeSubCompanySuccess: boolean,

  newContactId: string,
  addContactSuccess: boolean,
  updateContactSuccess: boolean,
  removeContactSuccess: boolean,

  addSupplierSuccess: boolean,
  supplierInfo: any,
  updateSupplierSuccess: boolean,

  addRfiSuccess: boolean,
  updateRfiSuccess: boolean,
}

export default ClientState
