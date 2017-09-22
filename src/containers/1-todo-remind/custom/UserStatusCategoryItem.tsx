/**
 * Created by jiangyukun on 2017/9/21.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {getItemClassName} from 'app-core/category-select/CategoryOptions'

import {getUserStatusText, USER_STATUS} from '../../common/common.helper'

interface UserStatusCategoryItemProps extends React.HTMLProps<HTMLLIElement> {
  currentValue: string
  option: any
  index1: number
  index2: number
}

class UserStatusCategoryItem extends React.Component<UserStatusCategoryItemProps> {
  static contextTypes = {
    setTouchOption: PropTypes.func,
    onSelect: PropTypes.func,
    touchCategoryIndex: PropTypes.number,
    touchOptionIndex: PropTypes.number,
  }

  render() {
    let {currentValue, option, index1, index2} = this.props

    return (
      <li
        className={getItemClassName(currentValue == option.value, this.context.touchCategoryIndex, this.context.touchOptionIndex, index1, index2)}
        onMouseEnter={() => this.context.setTouchOption}
        onClick={() => this.context.onSelect(option.value)}
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

export default UserStatusCategoryItem
