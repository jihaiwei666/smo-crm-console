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
  return {
    baseInfo: {
      projectName: baseInfo['project_info_name'] || '',
      projectCode: baseInfo['project_info_code'] || '',
      relativeClient: baseInfo['customer_info_id'] || '',
    },
    bdAndBdpc: {
      bd: bdAndBdpc['project_the_bd'],
      bdpc: ''
    }
  }
}
