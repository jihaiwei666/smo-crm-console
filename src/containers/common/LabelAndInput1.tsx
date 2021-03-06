/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label, {LabelProps} from './Label'

interface LabelAndInput1Props extends LabelProps {
  className?: string
  label: string
  children?: any
}

class LabelAndInput1 extends React.Component<LabelAndInput1Props> {
  render() {
    return (
      <FlexDiv className={classnames('label-and-input', this.props.className)}>
        <Label inputType={this.props.inputType}>{this.props.label}</Label>
        <Part style={{width: '250px'}}>
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput1
