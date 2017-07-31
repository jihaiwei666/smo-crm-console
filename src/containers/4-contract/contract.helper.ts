export function handleContractList(data) {
  return {
    total: data['totalCount'] || 0,
    list: data['contractList'] || []
  }
}
