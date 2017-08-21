/**
 * Created by jiangyukun on 2017/7/4.
 */
export const roleCategory = {
  bd: 1,
  bdLeader: 2,
  bdpc: 3,
  bdpcContractManage: 4,
  bdpcRfi: 5,
  bdpcLeader: 6,
  finance: 7,
  systemManage: 8
}

export const positionList = [
  {
    value: '1', text: 'BD'
  },
  {
    value: '2', text: 'BD负责人'
  },
  {
    value: '3', text: '普通BDPC'
  },
  {
    value: '4', text: 'BDPC-合同管理员'
  },
  {
    value: '5', text: 'BDPC-RFI管理员'
  },
  {
    value: '6', text: 'BDPC负责人'
  },
  {
    value: '7', text: '财务'
  },
  {
    value: '8', text: '系统管理员'
  }
]

// 账户状态(1.启用 2.停用)
export const accountStatus = {
  disabled: 1,
  enabled: 2
}
