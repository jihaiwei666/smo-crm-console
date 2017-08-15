/**
 * Created by jiangyukun on 2017/8/12.
 */
import {CUSTOMER} from '../../core/constants/types'

export default function tipAndClear(customer) {
  const props = customer.props
  if (props.addCustomerSuccess) {
    props.showSuccess('添加客户信息成功！')
    props.clearState(CUSTOMER.ADD_CUSTOMER)
    customer.toPage(0)
  }
  if (props.updateCustomerSuccess) {
    props.showSuccess('更新客户信息成功！')
    props.clearState(CUSTOMER.UPDATE_CUSTOMER)
    customer.refreshCurrentPage()
  }
  if (props.updateBdAndBdpcSuccess) {
    props.showSuccess('更新 所有人、所属BDPC 成功！')
    props.clearState(CUSTOMER.UPDATE_BD_AND_BDPC)
    customer.refreshCurrentPage()
  }
  if (props.applyBdpcFollowUpSuccess) {
    props.showSuccess('已申请BDPC跟进！')
    props.clearState(CUSTOMER.APPLY_BDPC_FOLLOW_UP)
  }
  if (props.addSubCompanySuccess) {
    props.showSuccess('添加子公司成功！')
    props.clearState(CUSTOMER.ADD_SUB_COMPANY)
  }
  if (customer.props.updateSubCompanySuccess) {
    customer.props.showSuccess('更新子公司信息成功！')
    customer.props.clearState(CUSTOMER.UPDATE_SUB_COMPANY)
  }
  if (customer.props.removeSubCompanySuccess) {
    customer.props.showSuccess('删除子公司信息成功！')
    customer.props.clearState(CUSTOMER.REMOVE_SUB_COMPANY)
  }
  if (customer.props.addContactSuccess) {
    customer.props.showSuccess('添加联系人成功！')
    customer.props.clearState(CUSTOMER.ADD_CONTACT)
  }
  if (customer.props.updateContactSuccess) {
    customer.props.showSuccess('更新联系人信息成功！')
    customer.props.clearState(CUSTOMER.UPDATE_CONTACT)
  }
  if (customer.props.removeContactSuccess) {
    customer.props.showSuccess('删除联系人成功！')
    customer.props.clearState(CUSTOMER.REMOVE_CONTACT)
  }
  if (customer.props.addVisitRecordSuccess) {
    customer.props.showSuccess('添加随访记录成功！')
    customer.props.clearState(CUSTOMER.ADD_VISIT_RECORD)
  }
  if (customer.props.updateVisitRecordSuccess) {
    customer.props.showSuccess('更新随访记录成功！')
    customer.props.clearState(CUSTOMER.UPDATE_VISIT_RECORD)
  }
  if (customer.props.removeVisitRecordSuccess) {
    customer.props.showSuccess('删除随访记录成功！')
    customer.props.clearState(CUSTOMER.REMOVE_VISIT_RECORD)
  }
  if (customer.props.addCdaSuccess) {
    customer.props.showSuccess('添加CDA成功！')
    customer.props.clearState(CUSTOMER.ADD_CDA)
  }
  if (customer.props.updateCdaSuccess) {
    customer.props.showSuccess('更新CDA成功！')
    customer.props.clearState(CUSTOMER.UPDATE_CDA)
  }
  if (customer.props.removeCdaSuccess) {
    customer.props.showSuccess('删除CDA成功！')
    customer.props.clearState(CUSTOMER.REMOVE_CDA)
  }
  if (customer.props.addSupplierSuccess) {
    customer.props.showSuccess('添加供应商成功！')
    customer.props.clearState(CUSTOMER.ADD_SUPPLIER)
  }
  if (customer.props.updateSupplierSuccess) {
    customer.props.showSuccess('更新供应商信息成功！')
    customer.props.clearState(CUSTOMER.UPDATE_SUPPLIER)
  }
  if (customer.props.addRfiSuccess) {
    customer.props.showSuccess('新增RFI信息成功！')
    customer.props.clearState(CUSTOMER.ADD_RFI)
  }
  if (customer.props.updateRfiSuccess) {
    customer.props.showSuccess('更新RFI信息成功！')
    customer.props.clearState(CUSTOMER.UPDATE_RFI)
  }
  if (customer.props.removeRfiSuccess) {
    customer.props.showSuccess('删除RFI成功！')
    customer.props.clearState(CUSTOMER.REMOVE_RFI)
  }
  if (customer.props.updateRemarkAttachmentSuccess) {
    customer.props.showSuccess('更新备注及附件成功！')
    customer.props.clearState(CUSTOMER.UPDATE_REMARK_AND_ATTACHMENT)
  }
}