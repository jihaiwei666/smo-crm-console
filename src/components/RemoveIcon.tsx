/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

interface RemoveIconProps {
  onClick?: () => void
}

class RemoveIcon extends React.Component<RemoveIconProps> {
  render() {
    return (
      <div className="remove-icon" onClick={this.props.onClick}>
        <img src={require('./remove.svg')}/>
      </div>
    )
  }
}

export default RemoveIcon
