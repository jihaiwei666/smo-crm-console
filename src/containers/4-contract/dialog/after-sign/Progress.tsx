/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import Select1 from 'app-core/common/Select1'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import LabelAndInput from '../../../common/LabelAndInput'
import Button from '../../../../components/button/Button'

import listCrud from '../../../../components/hoc/listCrud'
import {nodeProgressOptions} from '../../contract.constant'

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
          <Select1 width="200px" value={item.node} options={nodeProgressOptions}
                   onChange={(v) => this.props.onUpdate({node: v})}
          />
        </LabelAndInput1>
        <LabelAndInput
          label="指标" placeholder="请输入指标数字"
          value={item.quota} onChange={v => this.props.onUpdate({quota: v})}
        />
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
