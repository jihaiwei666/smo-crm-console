/**
 * Created by jiangyukun on 2017/4/26.
 */
import React from 'react'
import classnames from 'classnames'

import Label from '../../containers/common/Label'

interface SelectedFilterProps {
  notEmpty: boolean
  clearAll: () => void
  beginFilter: () => void
}

class SelectedFilter extends React.Component<SelectedFilterProps> {
  render() {
    return (
      <div className="selected-filter">
        <Label>筛选条件:</Label>
        <div className="flex1 ">
          {this.props.children}
        </div>
        <div className="select-result">
          <button
            className={classnames('clear', {'disabled': !this.props.notEmpty})}
            onClick={this.props.clearAll}
            disabled={!this.props.notEmpty}>
            清除
          </button>
          <button className="submit" onClick={this.props.beginFilter}>确定</button>
        </div>
        <div className="clear disabled"></div>
      </div>
    )
  }
}

export default SelectedFilter
