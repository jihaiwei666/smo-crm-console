/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'

export const NECESSARY = '1'
export const IMPORTANT = '2'

interface InputGroupProps {
  className?: string
  label: string
  inputType?: '1' | '2'
}

class InputGroup extends React.Component<InputGroupProps> {
  render() {
    let type = ''
    if (this.props.inputType == NECESSARY) {
      type = '（*）'
    } else if (this.props.inputType == IMPORTANT) {
      type = '（!）'
    }
    return (
      <FlexDiv className={classnames('input-group', this.props.className)}>
        <Label>{this.props.label + type + '：'}</Label>
        <Part className="bl pl10">
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default InputGroup
