/**
 * Created by jiangyukun on 2017/7/26.
 */
import {getDate, getDateStr} from '../../../../core/utils/dateUtils'
import {getSingleFile} from '../../../common/common.helper'

export function handleCdaList(data) {
  return data.map(item => ({
    cdaId: item['cda_id'],
    startDate: getDateStr(item['cda_validity_begin_time']),
    endDate: getDateStr(item['cda_validity_end_time']),
    remark: item['cda_remark'],
  }))
}

export function handleCdaDetail(data) {
  let cda = data['customerCda']
  return {
    startDate: getDate(cda['cda_validity_begin_time']),
    endDate: getDate(cda['cda_validity_end_time']),
    protocolType: cda['cda_agreement_type'],
    projectId: cda['cda_agreement_project_id'],
    projectName: cda['cda_agreement_project_name'] || '',
    cdaList: data['customerCdaPersons'].map(item => ({
      id: item['cda_person_id'],
      username: item['contacts_info_id'],
      telephone: item['contacts_info_telephone'],
      email: item['contacts_info_mail'],
      position: item['contacts_info_position']
    })),
    scanFile: getSingleFile(data['customerCdaFile']),
    remark: cda['cda_remark']
  }
}
