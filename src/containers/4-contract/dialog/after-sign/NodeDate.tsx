/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from '../../../../components/form/DatePicker'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

import {handleCrudList} from '../../../../core/crud'

interface NodeDateProps {
  item: any
  index: number
  total: number
  disabled: boolean
}

class NodeDate extends React.Component<NodeDateProps> {
  static contextTypes = {
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func
  }

  render() {
    const {item, index, total} = this.props

    return (
      <div>
        <LabelAndInput1 label="节点日期">
          <DatePicker value={item.nodeDate} onChange={v => this.context.onUpdate(item.id, {nodeDate: v})}/>
          {
            !this.props.disabled && index != 0 && (
              <RemoveIcon onClick={() => this.context.onRemove(item.id)}/>
            )
          }
          {
            !this.props.disabled && index == total - 1 && (
              <AddIcon onClick={this.context.onAdd}/>
            )
          }
        </LabelAndInput1>
      </div>

    )
  }
}

export function handleNodeDateCrud(list, afterSignId) {
  return handleCrudList(list, {
    ifAdd: item => ({
      "after_signed_id": afterSignId,
      "payment_node_date": item.nodeDate
    }),
    ifUpdate: item => ({
      "payment_node_id": item.id,
      "payment_node_date": item.nodeDate
    }),
    ifRemove: item => ({
      "payment_node_id": item.id
    })
  })
}

export default NodeDate
