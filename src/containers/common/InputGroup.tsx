/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'

interface InputGroupProps {
  label: string
}

class InputGroup extends React.Component<InputGroupProps> {
  render() {
    return (
      <FlexDiv className="input-group">
        <Label>{this.props.label + '：'}</Label>
        <Part style={{borderLeft: '1px solid #ddd', paddingLeft: '5px'}}>
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default InputGroup
