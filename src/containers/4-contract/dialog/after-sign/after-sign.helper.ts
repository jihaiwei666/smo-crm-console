/**
 * Created by jiangyukun on 2017/8/7.
 */
import {getDate} from '../../../../core/utils/dateUtils'
import {numberToText, getAttachmentList} from '../../../common/common.helper'
import {nodeProgress} from '../../contract.constant'

export function handleAfterSign(afterSign) {
  const base = afterSign['contractAfterSignedVo']
  if (!base) {
    return null
  }
  const nodeList = afterSign['paymentNodeList'] || []
  const signatoryList = afterSign['contractSignedList'] || []
  const pmList = afterSign['pmList'] || []
  const bdList = afterSign['bdList'] || []
  return {
    afterSignId: base['after_signed_id'],
    indication: base['project_indication'] || '',
    serviceTypes: !base['project_service_type'] ? [] : base['project_service_type'].split(','),
    centerNumber: base['project_center_number'],
    enrollmentCount: base['project_group_number'],
    servicePeriod: base['project_service_stage'],
    crcMoneyUnit: base['cost_detail_crc_service_fee_unit'],
    crcMoneyValue: numberToText(base['cost_detail_crc_service_fee_value']),
    pmServeFeeUnit: base['cost_detail_pm_service_fee_unit'],
    pmServeFeeValue: numberToText(base['cost_detail_pm_service_fee_value']),
    replacementFee: base['cost_detail_acting_mat_fee'],
    taxes: numberToText(base['cost_detail_taxes_fee']),
    taxRate: numberToText(base['cost_detail_taxes_rate']),
    paymentNode: base['payment_node'] || '',
    payer: base['payer'] || '',
    contractSignDate: getDate(base['contract_award_date']),
    takeEffectDate: getDate(base['effective_date']),
    endDate: base['end_date'] || '',
    chargingType: base['billing_way'] || '',
    remark: base['billing_way_remark'] || '',
    centerName: base['center_name'] || '',
    researchProduct: base['research_product'] || '',
    trailPeriod: base['test_stage'],
    contractDeadLine: base['contract_deadline'] || '',
    trailPhase: base['test_phase'] || '',
    pmWorkingHours: base['pm_contract_working_hours'] || '',
    crcWorkingHours: base['crc_contract_working_hours'] || '',
    kpi: base['kpi'] || '',

    nodeDateList: getNodeDateList(base['payment_node'], nodeList),
    progressList: getProgressList(base['payment_node'], nodeList),
    signatoryList: signatoryList.map(item => ({
      id: item['id'],
      signatory: item['value']
    })),
    pmList: pmList.map(item => ({
      id: item['id'],
      pm: item['value']
    })),
    bdList: bdList.map(item => ({
      id: item['id'],
      bd: item['value']
    })),
    attachmentList: getAttachmentList(afterSign['fileList'])
  }
}

function getNodeDateList(paymentNode, nodeList) {
  if (paymentNode != '1') {
    return []
  }
  return nodeList.map(item => ({
    id: item['payment_node_id'],
    nodeDate: getDate(item['payment_node_date'])
  }))
}

function getProgressList(paymentNode, nodeList) {
  if (paymentNode != '2') {
    return []
  }
  return nodeList.map(item => ({
    id: item['payment_node_id'],
    node: item['payment_node_key'],
    quota: item['payment_node_value'],
    date: getDate(item['payment_node_estimated_date'])
  }))
}

export function getSuffix(nodeType) {
  switch (nodeType) {
    case nodeProgress.xxPercentCenterStart:
      return '%中心启动'
    case nodeProgress.yCenterStart:
      return '家中心启动'
    case nodeProgress.xxPercentEnrollment:
      return '%受试者入组'
    case nodeProgress.yEnrollment:
      return '位受试者入组'
    case nodeProgress.xxPercentOut:
      return '%受试者出组'
    case nodeProgress.yOut:
      return '位受试者出组'
    case nodeProgress.xxPercentCenterClose:
      return '%研究中心关闭'
    case nodeProgress.yCenterClose:
      return '家研究中心关闭'
  }
}
