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
      <div className="text-and-button">
        <span className="tip mr7">{this.props.text}</span>
        {this.props.children}
      </div>
    )
  }
}

export default TextAndButton
