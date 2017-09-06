/**
 * Created by jiangyukun on 2017/9/6.
 */
import React from 'react'

interface LineProps {
  gap?: string
}

class Line extends React.Component<LineProps> {
  render() {
    return (
      <div className="line"></div>
    )
  }
}

export default Line
