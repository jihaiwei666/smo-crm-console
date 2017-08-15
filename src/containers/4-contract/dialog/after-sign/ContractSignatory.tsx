/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import {FlexDiv} from 'app-core/layout/'

import Input from '../../../../components/form/Input'
import AddIcon from '../../../../components/AddIcon'
import RemoveIcon from '../../../../components/RemoveIcon'

import listCrud from '../../../../components/hoc/listCrud'

interface ContractSignatoryProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
}

class ContractSignatory extends React.Component<ContractSignatoryProps> {
  render() {
    const {item, index, total} = this.props

    return (
      <FlexDiv className="mt5">
        <Input width="300px" value={item.signatory} onChange={v => this.props.onUpdate({signatory: v})}/>
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
      </FlexDiv>
    )
  }
}

function ifAdd(item, parentId) {
  return {
    "after_signed_id": parentId,
    "value": item.signatory,
    "type": 1,
  }
}

function ifUpdate(item) {
  return {
    "id": item.id,
    "value": item.signatory,
    "type": 1,
  }
}

function ifRemove(item) {
  return {
    "id": item.id,
    "type": 1,
  }
}

export default listCrud(ContractSignatory, {signatory: ''}, {ifAdd, ifUpdate, ifRemove})
