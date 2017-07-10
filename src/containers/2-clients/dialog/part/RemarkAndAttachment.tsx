/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Label from '../../../common/Label'
import Button from '../../../../components/button/Button'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Save from '../../../common/Save'

interface RemarkAndAttachmentProps {
}

class RemarkAndAttachment extends React.Component<RemarkAndAttachmentProps> {
  render() {
    return (
      <div>
        <LabelAndInput1 label="备注">
          <textarea className="input" rows={5}></textarea>
        </LabelAndInput1>
        <FlexDiv className="p5 bb">
          <Label>附件</Label>
          <Part>
            <Button className="small">上传</Button>
          </Part>
        </FlexDiv>
        <Save/>
      </div>
    )
  }
}

export default RemarkAndAttachment
