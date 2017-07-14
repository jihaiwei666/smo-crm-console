/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'

interface LabelAndInput1Props {
  className?: string
  label: string
}

class LabelAndInput1 extends React.Component<LabelAndInput1Props> {
  render() {
    return (
      <FlexDiv className={classnames('mt5 mb5', this.props.className)}>
        <Label>{this.props.label + '：'}</Label>
        <Part>
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndInput1
