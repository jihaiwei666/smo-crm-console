/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import {merge} from 'lodash'
import Select1 from 'app-core/common/Select1'

interface FilterItemProps {
  value: string
  label: string
  itemList: any[]
  onChange: (value: string) => void

  className?: string
  size?: 'small' | 'middle' | 'big'
}

class FilterItem extends Component<FilterItemProps> {
  static defaultProps = {
    size: 'middle'
  }

  render() {
    const {itemList, label} = this.props

    /* - - - - - - - - - - - - - - - - - - - - - - - - - -*/

    let style: any = {}
    let labelLength = label.length
    if (labelLength > 6) {
      style.width = labelLength * 15
    }

    let sizeClass = ''
    if (!this.props.className && this.props.size) {
      sizeClass = this.props.size
    }

    return (
      <ul className={classnames('filter-item', sizeClass, this.props.className)}>
        <li className="filter-item-label">
          <label style={style}>{label}：</label>
        </li>
        <li className="flex1 filter-items">
          <ul className="filter-item-main">
            <li className={classnames('filter-item-single', {'selected': this.props.value === ''})}
                onClick={() => this.props.onChange('')}>
              不限
            </li>

            {
              itemList.length <= 5 && itemList.map(item => {
                return (
                  <li key={item.value}
                      className={classnames('filter-item-single', {'selected': item.value == this.props.value})}
                      onClick={() => this.props.onChange(item.value)}>
                    {item.text}
                  </li>
                )
              })
            }

            {
              itemList.length > 5 && (
                <li className="select-option-container filter-item-single">
                  <Select1 value={this.props.value}
                           className={classnames({'selected': this.props.value != ''})}
                           options={itemList}
                           onChange={value => this.props.onChange(value)}/>
                </li>
              )
            }

          </ul>
          {this.props.children}
        </li>

      </ul>
    )
  }
}


export default FilterItem
