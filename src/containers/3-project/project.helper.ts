export function handleProjectList(data) {
  return {
    total: data['totalCount'],
    list: data['projectList'].map(item => ({
      projectId: item['project_info_id'],
      customerName: item['customer_name'],
      projectName: item['project_info_name'],
      projectCode: item['project_info_code'],
      bd: item['project_the_bd'],
      bdpc: item['project_the_bdpc'],
    }))
  }
}

export function handleClientList(data) {
  return data.map(item => ({
    value: item['customer_info_id'],
    text: item['customer_name']
  }))
}

export function handleProjectDetail(data) {
  const baseInfo = data['projectInfo']
  const bdAndBdpc = data['bdAndBdpc']
  const beforeQuotation = data['projectBeforeOffer']
  const beforeQuotationBase = beforeQuotation['projectBeforeOffer']
  return {
    baseInfo: {
      projectName: baseInfo['project_info_name'] || '',
      projectCode: baseInfo['project_info_code'] || '',
      relativeClient: baseInfo['customer_info_id'] || '',
    },
    bdAndBdpc: {
      bd: bdAndBdpc['project_the_bd'],
      bdpc: ''
    },
    beforeQuotation: {
      beforeQuotationId: beforeQuotationBase['before_offer_id'],
      indication: beforeQuotationBase['indication'],
      serviceType: beforeQuotationBase['service_type'],
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
    }
  }
}
