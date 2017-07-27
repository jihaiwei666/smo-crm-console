/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label, {LabelProps} from './Label'

interface InputGroupProps extends LabelProps {
  className?: string
  label: string
}

class InputGroup extends React.Component<InputGroupProps> {
  render() {
    return (
      <FlexDiv className={classnames('input-group', this.props.className)}>
        <Label inputType={this.props.inputType}>{this.props.label}</Label>
        <Part className="bl pl10">
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default InputGroup
