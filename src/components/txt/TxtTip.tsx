/**
 * 文字溢出显示title
 * Created by jiangyukun on 2017/9/13.
 */
import React from 'react'

interface TxtTipProps {
  element: string
  title: string
}

class TxtTip extends React.Component<TxtTipProps> {
  _e: HTMLElement
  state = {
    show: false
  }

  _checkToShowTip = () => {
    let isTextOverflow = this._e.offsetWidth < this._e.scrollWidth
    if (this.state.show != isTextOverflow) {
      this.setState({show: isTextOverflow})
    }
  }

  componentDidMount() {
    this._checkToShowTip()
  }

  componentDidUpdate() {
    this._checkToShowTip()
  }

  render() {
    let E = this.props.element
    if (this.state.show) {
      return (
        <E ref={c => this._e = c} title={this.props.title}>
          {this.props.children}
        </E>
      )
    }
    return (
      <E ref={c => this._e = c}>
        {this.props.children}
      </E>
    )
  }
}

export default TxtTip
