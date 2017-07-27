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
