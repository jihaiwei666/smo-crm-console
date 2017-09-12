/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import listCrud1 from '../../../../components/hoc/listCrud1'
import RemoveIcon from '../../../../components/RemoveIcon'

interface ResearchCenterProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
  disabled: boolean
}

class ResearchCenter extends React.Component<ResearchCenterProps> {
  render() {
    let {item} = this.props
    return (
      <div className="m5">
        <span className="mr10">{item.fileName}</span>
        <a target="_blank" href={item.fileUrl}>下载</a>
        {
          !this.props.disabled && (
            <RemoveIcon onClick={this.props.onRemove}/>
          )
        }
      </div>
    )
  }
}

function ifAdd(item) {
  return {
    "file_url": item.fileUrl,
    "file_name": item.fileName,
  }
}

function ifUpdate(item) {
  return {
    "file_id": item.id,
    "file_url": item.fileUrl,
    "file_name": item.fileName,
  }
}

function ifRemove(item) {
  return {
    "file_id": item.id,
  }
}

export default listCrud1(ResearchCenter, {ifAdd, ifUpdate, ifRemove})
