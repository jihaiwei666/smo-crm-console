/**
 * Created by jiangyukun on 2017/8/12.
 */
import {getDate} from '../../../../core/utils/dateUtils'

export function handleAfterQuotation(afterQuotation) {
  const afterQuotationBase = afterQuotation['projectAfterOffer'] || {}
  return {
    afterQuotationId: afterQuotationBase['after_offer_id'],
    serviceChargeUnit: afterQuotationBase['service_charge_unit'],
    serviceChargeValue: afterQuotationBase['service_charge_value'],
    contractMoneyUnit: afterQuotationBase['contract_unit'],
    contractMoneyValue: afterQuotationBase['contract_value'],

    is_A_Order: afterQuotationBase['is_success_order'],
    pmWorkingHours: afterQuotationBase['pm_working_hours'],
    crcWorkingHours: afterQuotationBase['crc_working_hours'],
    involveYearMonth: afterQuotationBase['intervention_time'],
    bidDate: getDate(afterQuotationBase['bidding_time']),
    bookLanguage: afterQuotationBase['bid_language'],
    pptLanguage: afterQuotationBase['ppt_language'],
  }
}
