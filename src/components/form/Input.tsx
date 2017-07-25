/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  onChange?: (e: any) => void
}

class Input extends React.Component<InputProps> {
  render() {
    const {className, ...otherProps} = this.props
    return (
      <input className={classnames('input', className)} {...otherProps} />
    )
  }
}

export default Input
