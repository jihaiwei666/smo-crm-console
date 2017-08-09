/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import TextArea from 'app-core/form/TextArea'

import AddFileButton from '../../components/button/AddFileButton'
import Label from './Label'
import LabelAndInput1 from './LabelAndInput1'
import Save from './Save'

interface RemarkAndAttachmentProps {
  disabled?: boolean
}

class RemarkAndAttachment extends React.Component<RemarkAndAttachmentProps> {
  render() {
    return (
      <div>
        <LabelAndInput1 className="bb" label="备注">
          <TextArea rows={5} value=""></TextArea>
        </LabelAndInput1>
        <FlexDiv className="p5 bb">
          <Label>附件</Label>
          <Part>
            <AddFileButton disabled={this.props.disabled}
                           onUploadSuccess={() => null}
            />
          </Part>
        </FlexDiv>
        <Save disabled={this.props.disabled}/>
      </div>
    )
  }
}

export default RemarkAndAttachment
