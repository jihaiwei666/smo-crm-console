/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'

export const NECESSARY = '1'
export const IMPORTANT = '2'

export interface LabelProps {
  inputType?: '1' | '2'
}

class Label extends React.Component<LabelProps> {
  render() {
    let type = ''
    if (this.props.inputType == NECESSARY) {
      type = '（*）'
    } else if (this.props.inputType == IMPORTANT) {
      type = '（!）'
    }
    return (
      <label className="input-label">{this.props.children + type + '：'}</label>
    )
  }
}

export default Label
