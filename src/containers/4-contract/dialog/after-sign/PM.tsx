/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import {FlexDiv} from 'app-core/layout/'

import Input from '../../../../components/form/Input'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

import listCrud from '../../../../components/hoc/listCrud'

interface PMProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
  disabled: boolean
}

class PM extends React.Component<PMProps> {
  render() {
    const {item, index, total} = this.props

    return (
      <FlexDiv className="mt5">
        <Input width="300px" value={item.pm} onChange={v => this.props.onUpdate({pm: v})}/>
        {
          !this.props.disabled && (
            <RemoveIcon onClick={this.props.onRemove}/>
          )
        }
        {
          !this.props.disabled && index == total - 1 && (
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
    "value": item.pm,
    "type": 3
  }
}

function ifUpdate(item) {
  return {
    "id": item.id,
    "value": item.pm,
    "type": 3
  }
}

function ifRemove(item) {
  return {
    "id": item.id,
    "type": 3
  }
}

export default listCrud(PM, {pm: ''}, {ifAdd, ifUpdate, ifRemove})
