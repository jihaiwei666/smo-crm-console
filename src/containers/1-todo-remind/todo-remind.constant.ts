/**
 * Created by jiangyukun on 2017/7/7.
 */
export const relevantType = {
  CLIENT: '1',
  PROJECT: '2',
  CONTRACT: '3'
}

export const category = [
  {value: relevantType.CLIENT, text: '客户'},
  {value: relevantType.PROJECT, text: '项目'},
  {value: relevantType.CONTRACT, text: '合同'},
]

export const remindTypeOptions = [
  {value: '1', text: '系统消息', disabled: true},
  {value: '2', text: '邮件'},
]
