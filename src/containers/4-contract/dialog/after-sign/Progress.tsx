/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import Select1 from 'app-core/common/Select1'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import Button from '../../../../components/button/Button'

import listCrud from '../../../../components/hoc/listCrud'
import {nodeProgressOptions, nodeProgress} from '../../contract.constant'
import InputWithSuffix from '../../../../components/form/InputWithSuffix'
import Input from '../../../../components/form/Input'
import {getSuffix} from './after-sign.helper'

interface ProgressProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
}

class Progress extends React.Component<ProgressProps> {

  render() {
    const {item, index, total} = this.props

    return (
      <div className="progress-item">
        <LabelAndInput1 label="节点">
          <Select1 width="250px" value={item.node} options={nodeProgressOptions}
                   onChange={(v) => this.props.onUpdate({node: v, quota: ''})}
          />
        </LabelAndInput1>
        <LabelAndInput1 label="指标">
          {
            (item.node == '' || item.node == nodeProgress.contractSigned || item.node == nodeProgress.databaseLock) ? (
              <Input width="250px" placeholder="请输入指标数字" disabled={true}/>
            ) : (
              <InputWithSuffix
                placeholder="请输入指标数字" suffix={getSuffix(item.node)}
                value={item.quota} onChange={v => this.props.onUpdate({quota: v})}
              />
            )
          }
        </LabelAndInput1>
        <LabelAndInput1 label="预估日期">
          <DatePicker value={item.date} onChange={v => this.props.onUpdate({date: v})}/>
        </LabelAndInput1>
        {
          index != 0 && (
            <div className="remove-progress">
              <Button className="small danger" onClick={this.props.onRemove}>删除</Button>
            </div>
          )
        }
        {
          index == total - 1 && (
            <div></div>
          )
        }
      </div>
    )
  }
}

function ifAdd(item, parentId) {
  return {
    "after_signed_id": parentId,
    "payment_node_key": item.node,
    "payment_node_value": item.quota,
    "payment_node_estimated_date": item.date,
  }
}

function ifUpdate(item) {
  return {
    "payment_node_id": item.id,
    "payment_node_key": item.node,
    "payment_node_value": item.quota,
    "payment_node_estimated_date": item.date,
  }
}

function ifRemove(item) {
  return {
    "payment_node_id": item.id
  }
}

export default listCrud(Progress, {node: '', quota: '', date: null}, {ifAdd, ifUpdate, ifRemove})
