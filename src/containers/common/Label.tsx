/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'

interface LabelProps {

}

class Label extends React.Component<LabelProps> {
  render() {
    return (
      <label className="input-label">{this.props.children}</label>
    )
  }
}

export default Label
