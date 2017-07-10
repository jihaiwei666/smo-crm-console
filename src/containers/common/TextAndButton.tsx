/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import {FlexDiv, Part} from 'app-core/layout'

interface LabelAndButtonProps {
  text: string,
  className?: string
}

class TextAndButton extends React.Component<LabelAndButtonProps> {
  render() {
    return (
      <FlexDiv className="m5">
        <div className="input-unit-illustrate">{this.props.text}</div>
        <Part textAlign="right">
          {this.props.children}
        </Part>
      </FlexDiv>
    )
  }
}

export default TextAndButton
