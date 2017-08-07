/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'

import Button from '../../../../components/button/Button'
import LabelAndInput1 from '../../../common/LabelAndInput1'

import listCrud from '../../../../components/hoc/listCrud'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

interface NodeDateProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
}

class NodeDate extends React.Component<NodeDateProps> {
  render() {
    const {item, index, total} = this.props
    return (
      <div>
        <LabelAndInput1 label="节点日期">
          <DatePicker value={item.nodeDate} onChange={v => this.props.onUpdate({nodeDate: v})}/>
          {
            index != 0 && (
              <RemoveIcon onClick={this.props.onRemove}/>
            )
          }
          {
            index == total - 1 && (
              <AddIcon onClick={this.props.onAdd}/>
            )
          }
        </LabelAndInput1>
      </div>

    )
  }
}

export default listCrud(NodeDate, {nodeDate: null})
