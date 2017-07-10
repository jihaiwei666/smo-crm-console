/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'

interface InputUnitProps extends React.HTMLProps<HTMLDivElement> {
  className?: string
}

class InputUnit extends React.Component<InputUnitProps> {
  render() {
    const {className, ...otherProps} = this.props
    return (
      <div className={classnames('input-unit', className)} {...otherProps}>
        {this.props.children}
      </div>
    )
  }
}

export default InputUnit
