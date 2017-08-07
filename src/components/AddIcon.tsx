/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

interface AddIconProps {
  onClick?: () => void
}

class AddIcon extends React.Component<AddIconProps> {
  render() {
    return (
      <div className="add-icon" onClick={this.props.onClick}>
        <img src={require('./add.svg')}/>
      </div>
    )
  }
}

export default AddIcon
