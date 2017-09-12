/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Select1 from 'app-core/common/Select1'

import Input from '../../../../components/form/Input'
import InputWithSuffix from '../../../../components/form/InputWithSuffix'
import DatePicker from '../../../../components/form/DatePicker'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

import {nodeProgressOptions, nodeProgress} from '../../contract.constant'
import {getSuffix} from './after-sign.helper'
import {handleCrudList} from '../../../../core/crud'
import regex from '../../../../core/constants/regex'

interface ProgressProps {
  item: any
  index: number
  total: number
  disabled: boolean
}

class Progress extends React.Component<ProgressProps> {
  static contextTypes = {
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const {item, index, total} = this.props

    return (
      <div className="progress-item">
        <LabelAndInput1 label="节点">
          <Select1 width="250px" value={item.node} options={nodeProgressOptions}
                   onChange={(v) => this.context.onUpdate(item.id, {node: v, quota: ''})}
          />
        </LabelAndInput1>
        <LabelAndInput1 label="指标">
          {
            (item.node == '' || item.node == nodeProgress.contractSigned || item.node == nodeProgress.databaseLock) ? (
              <Input width="250px" placeholder="请输入指标数字" disabled={true}/>
            ) : (
              <InputWithSuffix
                required={true} name="quota"
                format={regex.PERCENT_INTEGER}
                placeholder="请输入指标数字" suffix={getSuffix(item.node)}
                value={item.quota} onChange={v => this.context.onUpdate(item.id, {quota: v})}
              />
            )
          }
        </LabelAndInput1>
        <LabelAndInput1 label="预估日期">
          <DatePicker value={item.date} onChange={v => this.context.onUpdate(item.id, {date: v})}/>
        </LabelAndInput1>
        {
          !this.props.disabled && index != 0 && (
            <div className="remove-progress">
              <RemoveIcon onClick={() => this.context.onRemove(item.id)}/>
            </div>
          )
        }
        {
          !this.props.disabled && index == total - 1 && (
            <div>
              <AddIcon onClick={this.context.onAdd}/>
            </div>
          )
        }
      </div>
    )
  }
}

export function handleProgressListCrud(list, afterSignId) {
  return handleCrudList(list, {
    ifAdd: item => ({
      "after_signed_id": afterSignId,
      "payment_node_key": item.node,
      "payment_node_value": item.quota,
      "payment_node_estimated_date": item.date
    }),
    ifUpdate: item => ({
      "payment_node_id": item.id,
      "payment_node_key": item.node,
      "payment_node_value": item.quota,
      "payment_node_estimated_date": item.date
    }),
    ifRemove: item => ({
      "payment_node_id": item.id
    })
  })
}

export default Progress
