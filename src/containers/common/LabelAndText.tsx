/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

import Label from './Label'

interface LabelAndTextProps {
  className?: string
  label: string,
  text: string
}

class LabelAndText extends React.PureComponent<LabelAndTextProps> {
  render() {
    return (
      <FlexDiv className={classnames('mt5 mb5', this.props.className)}>
        <Label>{this.props.label}</Label>
        <Part>
          <span>{this.props.text}</span>
        </Part>
      </FlexDiv>
    )
  }
}

export default LabelAndText
