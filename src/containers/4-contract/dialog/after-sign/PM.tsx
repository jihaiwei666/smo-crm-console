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
  parentId: string
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
}

class PM extends React.Component<PMProps> {
  render() {
    const {item, index, total} = this.props

    return (
      <FlexDiv className="mt5">
        <Input width="300px" value={item.pm} onChange={v => this.props.onUpdate({pm: v})}/>
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

function ifAdd(item, props) {
  return {
    "before_offer_id": props.parentId,
    "pm_name": item.pm,
  }
}

function ifUpdate(item, props) {
  return {
    "before_offer_pm_id": item.id,
    "pm_name": item.pm,
  }
}

function ifRemove(item, props) {
  return {
    "before_offer_pm_id": item.id,
  }
}

export default listCrud(PM, {pm: ''}, {ifAdd, ifUpdate, ifRemove})
