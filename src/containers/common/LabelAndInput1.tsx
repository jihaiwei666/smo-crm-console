/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'
import Input from '../../components/form/Input'

interface LabelAndInput1Props {
  label: string
}

class LabelAndInput1 extends React.Component<LabelAndInput1Props> {
  render() {
    return (
      <FlexDiv className="m5">
        <Label>{this.props.label + '：'}</Label>
        <Part>
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput1
