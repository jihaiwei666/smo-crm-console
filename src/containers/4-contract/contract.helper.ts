export function handleContractList(data) {
  return {
    total: data['totalCount'] || 0,
    list: data['contractList'].map(item => ({
      contractId: item['contract_info_id'],
      contractName: item['contract_name'],
      contractCode: item['contract_code'],
      contractType: item['contract_type'],
      bd: item['customer_the_bd'],
      bdpc: item['customer_the_bdpc'],
    }))
  }
}

export function handleProjectList(data) {
  return data.map(item => ({
    value: item['project_id'],
    text: item['project_name'],
  }))
}
