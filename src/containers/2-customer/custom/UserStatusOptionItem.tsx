/**
 * Created by jiangyukun on 2017/9/21.
 */
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import {getUserStatusText, USER_STATUS} from '../../common/common.helper'

interface UserStatusOptionItemProps {
  option: any
  index
}

class UserStatusOptionItem extends React.Component<UserStatusOptionItemProps> {
  static contextTypes = {
    setTouchIndex: PropTypes.func,
    onSelect: PropTypes.func,
    selectIndex: PropTypes.number
  }

  render() {
    const {option, index} = this.props

    return (
      <li
        className={classnames('select-item', {'selected': index == this.context.selectIndex})}
        onClick={() => this.context.onSelect(option)}
        onMouseEnter={() => this.context.setTouchIndex(index)}
      >
        {option.text}
        {
          option.userStatus != 0 && (
            <div className={classnames('user-status', {'holiday': option.userStatus == USER_STATUS.holiday}, {'business-trip': option.userStatus == USER_STATUS.businessTrip})}>
              {getUserStatusText(option.userStatus)}
            </div>
          )
        }
      </li>
    )
  }
}

export default UserStatusOptionItem
