/**
 * Created by jiangyukun on 2017/8/3.
 */
export const contractTypeMapper = {
  '1': '大项目主合同',
  '2': 'CRC三方协议',
  '3': '思默和Site两方协议',
  '4': '其它',
}

export const serviceTypeOptions = [
  {value: '1', text: 'CRC'},
  {value: '2', text: '招募'},
  {value: '3', text: '呼叫中心'},
]

export const trailPhaseOptions = [
  {value: '1', text: '准备'},
  {value: '2', text: '启动'},
  {value: '3', text: '入组'},
  {value: '4', text: '随访'},
  {value: '5', text: '数据清理'},
  {value: '6', text: '结束'},
  {value: '7', text: '关闭'},
]

export const nodeProgressOptions = [
  {value: '1', text: '合同签署后'},
  {value: '2', text: 'xx%中心启动'},
  {value: '3', text: '第y家中心启动'},
  {value: '4', text: 'xx%受试者入组'},
  {value: '5', text: '第y位受试者入组'},
  {value: '6', text: 'xx%受试者出组'},
  {value: '7', text: '第y位受试者出组'},
  {value: '8', text: 'xx%研究中心关闭'},
  {value: '9', text: '第y家研究中心关闭'},
  {value: '10', text: '数据库锁定'},
]

export const nodeProgress = {
  contractSigned: '1',
  xxPercentCenterStart: '2',
  yCenterStart: '3',
  xxPercentEnrollment: '4',
  yEnrollment: '5',
  xxPercentOut: '6',
  yOut: '7',
  xxPercentCenterClose: '8',
  yCenterClose: '9',
  databaseLock: '10'
}
