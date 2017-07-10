/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import Button from '../../components/button/Button'

interface SaveProps {

}

class Save extends React.Component<SaveProps> {
  render() {
    return (
      <div className="m10">
        <Button className="block">保存</Button>
      </div>
    )
  }
}

export default Save
