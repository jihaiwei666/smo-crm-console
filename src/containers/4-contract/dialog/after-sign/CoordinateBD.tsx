/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import {FlexDiv} from 'app-core/layout/'

import Input from '../../../../components/form/Input'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

import listCrud from '../../../../components/hoc/listCrud'

interface CoordinateBDProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
}

class CoordinateBD extends React.Component<CoordinateBDProps> {
  render() {
    const {item, index, total} = this.props

    return (
      <FlexDiv className="mt5">
        <Input width="300px" value={item.bd} onChange={v => this.props.onUpdate({bd: v})}/>
        <RemoveIcon onClick={this.props.onRemove}/>
        {
          index == total - 1 && (
            <AddIcon onClick={this.props.onAdd}/>
          )
        }
      </FlexDiv>
    )
  }
}

function ifAdd(item, parentId) {
  return {
    "after_signed_id": parentId,
    "value": item.bd,
    "type": 2,
  }
}

function ifUpdate(item) {
  return {
    "id": item.id,
    "value": item.bd,
    "type": 2,
  }
}

function ifRemove(item) {
  return {
    "id": item.id,
    "type": 2,
  }
}

export default listCrud(CoordinateBD, {bd: ''}, {ifAdd, ifUpdate, ifRemove})
