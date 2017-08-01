/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  width?: string
  onChange?: (e: any) => void
}

class Input extends React.Component<InputProps> {
  render() {
    const {width, className, ...otherProps} = this.props
    let style: any = {}
    if (width) {
      style.width = width
    }
    return (
      <input style={style} className={classnames('input', className)} {...otherProps} />
    )
  }
}

export default Input
