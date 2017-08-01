export function handleContractList(data) {
  return {
    total: data['totalCount'] || 0,
    list: data['contractList'] || []
  }
}

export function handleProjectList(data) {
  return data.map(item => ({
    value: item['project_id'],
    text: item['project_name'],
  }))
}
