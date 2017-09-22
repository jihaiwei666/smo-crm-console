/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import TextArea from 'app-core/form/TextArea'

import Label from './Label'
import LabelAndInput1 from './LabelAndInput1'
import Attachment from '../../components/attachment/Attachment'
import Update from './Update'

interface RemarkAndAttachmentProps {
  attachmentRef?: (ref) => void
  disabled?: boolean
  remark?: string
  onRemarkChange?: (value: string) => void
  attachment?: any[]
  onAttachmentChange?: (attachment: any[]) => void
  onUpdate?: () => void
}

class RemarkAndAttachment extends React.Component<RemarkAndAttachmentProps> {
  render() {
    return (
      <div className="--module-item">
        <LabelAndInput1 className="bb" label="备注">
          <TextArea
            placeholder="请输入备注"
            rows={5} value={this.props.remark} onChange={this.props.onRemarkChange}></TextArea>
        </LabelAndInput1>
        <div className="mt5 bb">
          <div className="mb5">
            <Label>附件</Label>
          </div>
          <Attachment
            ref={this.props.attachmentRef}
            fileList={this.props.attachment || []} onChange={this.props.onAttachmentChange}/>
        </div>
        <Update disabled={this.props.disabled} onClick={this.props.onUpdate}/>
      </div>
    )
  }
}

export default RemarkAndAttachment
