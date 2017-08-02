/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Label from '../../../common/Label'
import Button from '../../../../components/button/Button'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Save from '../../../common/Save'
import AddFileButton from '../../../../components/button/AddFileButton'

interface RemarkAndAttachmentProps {
  customerId: string
}

class RemarkAndAttachment extends React.Component<RemarkAndAttachmentProps> {
  render() {
    return (
      <div>
        <LabelAndInput1 className="bb" label="备注">
          <textarea className="input" rows={5}></textarea>
        </LabelAndInput1>
        <FlexDiv className="p5 bb">
          <Label>附件</Label>
          <Part>
            <AddFileButton disabled={!this.props.customerId}
                           onUploadSuccess={() => null}
            />

          </Part>
        </FlexDiv>
        <Save disabled={!this.props.customerId}/>
      </div>
    )
  }
}

export default RemarkAndAttachment
