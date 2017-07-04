/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import classnames from 'classnames'

import './button.scss'

class Button extends React.Component<any> {
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
