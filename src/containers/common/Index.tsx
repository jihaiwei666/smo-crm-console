/**
 * Created by jiangyukun on 2017/8/24.
 */
import React from 'react'

interface IndexProps {
  index: number
}

class Index extends React.Component<IndexProps> {
  render() {
    return (
      <div className="serial-number-container">
        <div className="serial-number">
          {this.props.index + 1}
        </div>
      </div>
    )
  }
}

export default Index
