/**
 * Created by jiangyukun on 2017/8/12.
 */
export function handleBeforeQuotation(beforeQuotation) {
  const beforeQuotationBase = beforeQuotation['projectBeforeOffer'] || {}
  const pmList = beforeQuotation['projectBeforeOfferPmList'] || []
  const planList = beforeQuotation['planFiles'] || []
  const centerList = beforeQuotation['researchCenterFiles'] || []
  return {
    beforeQuotationId: beforeQuotationBase['before_offer_id'],
    indication: beforeQuotationBase['indication'],
    serviceType: beforeQuotationBase['service_type'] ? beforeQuotationBase['service_type'].split(',') : [],
    centerNumber: beforeQuotationBase['center_number'],
    enrollmentCount: beforeQuotationBase['group_number'],
    enrollmentPeriod: beforeQuotationBase['group_stage'],
    bidParty: beforeQuotationBase['bidders'],
    cro: beforeQuotationBase['cro'],
    projectCategory: beforeQuotationBase['project_type'],
    testPeriod: beforeQuotationBase['test_stage'],
    planCode: beforeQuotationBase['program_number'],
    researchProduct: beforeQuotationBase['research_product'],
    treatDomain: beforeQuotationBase['therapeutic_field'],
    filterCount: beforeQuotationBase['screening_number'] || '',
    possibility: beforeQuotationBase['possibility'],
    isArrangeBid: beforeQuotationBase['is_bid'],
    remark: beforeQuotationBase['remark'],
    pmList: pmList.map(item => ({
      id: item['before_offer_pm_id'],
      pm: item['pm_name']
    })),
    planList: planList.map(item => ({
      id: item['file_id'],
      fileUrl: item['file_url'],
      fileName: item['file_name'],
    })),
    centerList: centerList.map(item => ({
      id: item['file_id'],
      fileUrl: item['file_url'],
      fileName: item['file_name'],
    }))
  }
}
