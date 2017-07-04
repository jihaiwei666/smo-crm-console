/**
 * Created by jiangyukun on 2017/7/3.
 */
import React from 'react'
import PropTypes from 'prop-types'

import './fix-head-list.scss'

interface FixHeadListProps {
  weights: (number | string)[]
}

class FixHeadList extends React.Component<FixHeadListProps> {
  static childContextTypes = {
    weights: PropTypes.array
  }

  render() {
    return (
      <div className="fix-head-list">
        {this.props.children}
      </div>
    )
  }

  getChildContext() {
    return {
      weights: this.props.weights
    }
  }
}

export default FixHeadList
