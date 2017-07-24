/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import classnames from 'classnames'
import Button from '../../components/button/Button'

interface UpdateProps {
  disabled?: boolean
  onClick?: (e) => void
}

class Update extends React.Component<UpdateProps> {
  render() {
    return (
      <div className="m10">
        <Button className={classnames("block", {'disabled': this.props.disabled})}
                disabled={this.props.disabled}
                onClick={this.props.onClick}>更新</Button>
      </div>
    )
  }
}

export default Update
