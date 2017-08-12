/**
 * Created by jiangyukun on 2017/8/12.
 */
import {CLIENTS} from '../../core/constants/types'

export default function tipAndClear(customer) {
  
  if (customer.props.addCustomerSuccess) {
    customer.props.showSuccess('添加客户信息成功！')
    customer.props.clearState(CLIENTS.ADD_CUSTOMER)
    customer.toPage(0)
  }
  if (customer.props.updateCustomerSuccess) {
    customer.props.showSuccess('更新客户信息成功！')
    customer.props.clearState(CLIENTS.UPDATE_CUSTOMER)
    customer.refreshCurrentPage()
  }
  if (customer.props.updateBdAndBdpcSuccess) {
    customer.props.showSuccess('更新 所有人、所属BDPC 成功！')
    customer.props.clearState(CLIENTS.UPDATE_BD_AND_BDPC)
    customer.refreshCurrentPage()
  }
  if (customer.props.addSubCompanySuccess) {
    customer.props.showSuccess('添加子公司成功！')
    customer.props.clearState(CLIENTS.ADD_SUB_COMPANY)
  }
  if (customer.props.updateSubCompanySuccess) {
    customer.props.showSuccess('更新子公司信息成功！')
    customer.props.clearState(CLIENTS.UPDATE_SUB_COMPANY)
  }
  if (customer.props.removeSubCompanySuccess) {
    customer.props.showSuccess('删除子公司信息成功！')
    customer.props.clearState(CLIENTS.REMOVE_SUB_COMPANY)
  }
  if (customer.props.addContactSuccess) {
    customer.props.showSuccess('添加联系人成功！')
    customer.props.clearState(CLIENTS.ADD_CONTACT)
  }
  if (customer.props.updateContactSuccess) {
    customer.props.showSuccess('更新联系人信息成功！')
    customer.props.clearState(CLIENTS.UPDATE_CONTACT)
  }
  if (customer.props.removeContactSuccess) {
    customer.props.showSuccess('删除联系人成功！')
    customer.props.clearState(CLIENTS.REMOVE_CONTACT)
  }
  if (customer.props.addVisitRecordSuccess) {
    customer.props.showSuccess('添加随访记录成功！')
    customer.props.clearState(CLIENTS.ADD_VISIT_RECORD)
  }
  if (customer.props.updateVisitRecordSuccess) {
    customer.props.showSuccess('更新随访记录成功！')
    customer.props.clearState(CLIENTS.UPDATE_VISIT_RECORD)
  }
  if (customer.props.removeVisitRecordSuccess) {
    customer.props.showSuccess('删除随访记录成功！')
    customer.props.clearState(CLIENTS.REMOVE_VISIT_RECORD)
  }
  if (customer.props.addCdaSuccess) {
    customer.props.showSuccess('添加CDA成功！')
    customer.props.clearState(CLIENTS.ADD_CDA)
  }
  if (customer.props.updateCdaSuccess) {
    customer.props.showSuccess('更新CDA成功！')
    customer.props.clearState(CLIENTS.UPDATE_CDA)
  }
  if (customer.props.removeCdaSuccess) {
    customer.props.showSuccess('删除CDA成功！')
    customer.props.clearState(CLIENTS.REMOVE_CDA)
  }
  if (customer.props.addSupplierSuccess) {
    customer.props.showSuccess('添加供应商成功！')
    customer.props.clearState(CLIENTS.ADD_SUPPLIER)
  }
  if (customer.props.updateSupplierSuccess) {
    customer.props.showSuccess('更新供应商信息成功！')
    customer.props.clearState(CLIENTS.UPDATE_SUPPLIER)
  }
  if (customer.props.addRfiSuccess) {
    customer.props.showSuccess('新增RFI信息成功！')
    customer.props.clearState(CLIENTS.ADD_RFI)
  }
  if (customer.props.updateRfiSuccess) {
    customer.props.showSuccess('更新RFI信息成功！')
    customer.props.clearState(CLIENTS.UPDATE_RFI)
  }
  if (customer.props.removeRfiSuccess) {
    customer.props.showSuccess('删除RFI成功！')
    customer.props.clearState(CLIENTS.REMOVE_RFI)
  }
  if (customer.props.updateRemarkAttachmentSuccess) {
    customer.props.showSuccess('更新备注及附件成功！')
    customer.props.clearState(CLIENTS.UPDATE_REMARK_AND_ATTACHMENT)
  }
}