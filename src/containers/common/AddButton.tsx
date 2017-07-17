/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import Button from '../../components/button/Button'

interface AddButtonProps {
  onClick?: (e) => void
}

class AddButton extends React.Component<AddButtonProps> {
  render() {
    return (
      <Button className="small" onClick={this.props.onClick}>添加</Button>
    )
  }
}

export default AddButton
