/**
 * Created by jiangyukun on 2017/8/12.
 */
import {PROJECT} from '../../core/constants/types'

export default function tipAndClear(project) {
  if (project.props.addProjectInfoSuccess) {
    project.props.showSuccess('添加项目信息成功！')
    project.props.clearState(PROJECT.ADD_PROJECT_INFO)
    project.toPage(0)
  }
  if (project.props.updateBd_BdpcSuccess) {
    project.props.showSuccess('更新BD/BDPC成功！')
    project.props.clearState(PROJECT.UPDATE_BD_AND_BDPC)
  }
  if (project.props.updateProjectInfoSuccess) {
    project.props.showSuccess('更新项目信息成功！')
    project.props.clearState(PROJECT.UPDATE_PROJECT_INFO)
  }
  if (project.props.addBeforeQuotationSuccess) {
    project.props.showSuccess('添加报价前信息成功！')
    project.props.clearState(PROJECT.ADD_BEFORE_QUOTATION)
  }
  if (project.props.updateBeforeQuotationSuccess) {
    project.props.showSuccess('更新报价前信息成功！')
    project.props.clearState(PROJECT.UPDATE_BEFORE_QUOTATION)
  }
  if (project.props.addAfterQuotationSuccess) {
    project.props.showSuccess('添加报价后信息成功！')
    project.props.clearState(PROJECT.ADD_AFTER_QUOTATION)
  }
  if (project.props.updateAfterQuotationSuccess) {
    project.props.showSuccess('更新报价后信息成功！')
    project.props.clearState(PROJECT.UPDATE_AFTER_QUOTATION)
  }
  if (project.props.updateRemarkAttachmentSuccess) {
    project.props.showSuccess('更新备注及附件成功！')
    project.props.clearState(PROJECT.UPDATE_REMARK_ATTACHMENT)
  }
}
