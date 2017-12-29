/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'

import listCrud1 from '../../../../components/hoc/listCrud1'
import RemoveIcon from '../../../../components/RemoveIcon'
import DownloadFile from '../../../../components/file/DownloadFile'

interface PlanAttachmentProps {
  item: any
  index: number
  total: number
  onAdd: () => void
  onUpdate: (item) => void
  onRemove: () => void
  disabled: boolean
}

class PlanAttachment extends React.Component<PlanAttachmentProps> {
  render() {
    let {item} = this.props
    return (
      <div className="m5">
        <DownloadFile url={item.fileUrl}>
          [ {item.fileName} ]
        </DownloadFile>
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
    'file_url': item.fileUrl,
    'file_name': item.fileName
  }
}

function ifUpdate(item) {
  return {
    'file_id': item.id,
    'file_url': item.fileUrl,
    'file_name': item.fileName
  }
}

function ifRemove(item) {
  return {
    'file_id': item.id
  }
}

export default listCrud1(PlanAttachment, {ifAdd, ifUpdate, ifRemove})
