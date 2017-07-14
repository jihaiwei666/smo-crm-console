/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'

interface InputGroupProps {
  label: string
  inputType?: '1' | '2'
}

class InputGroup extends React.Component<InputGroupProps> {
  render() {
    let type = ''
    if (this.props.inputType == '1') {
      type = '（*）'
    } else if (this.props.inputType == '2') {
      type = '（!）'
    }
    return (
      <FlexDiv className="input-group">
        <Label>{this.props.label + type + '：'}</Label>
        <Part className="bl pl10">
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default InputGroup
