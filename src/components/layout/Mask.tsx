/**
 * Created by jiangyukun on 2017/9/11.
 */
import React from 'react'

interface MaskProps {
  show: boolean
}

class Mask extends React.Component<MaskProps> {
  render() {
    return (
      <div className="mask-container">
        {this.props.children}
        {
          this.props.show && (
            <div className="mask"></div>
          )
        }
      </div>
    )
  }
}

export default Mask
