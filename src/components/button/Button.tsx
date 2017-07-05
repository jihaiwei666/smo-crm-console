/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import classnames from 'classnames'

import './button.scss'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {

}

class Button extends React.Component<ButtonProps> {
  render() {
    const {className, ...otherProps} = this.props
    return (
      <button className={classnames('button', className)} {...otherProps}>
        {this.props.children}
      </button>
    )
  }
}

export default Button
