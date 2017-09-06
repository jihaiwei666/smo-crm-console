/**
 * Created by jiangyukun on 2017/9/6.
 */
import React from 'react'
import PropTypes from 'prop-types'

import {REMOVE, ADD, UPDATE, handleListRemove} from '../core/crud'
import {copyList} from '../core/utils/common'

interface CrudListProps {
  list: any[]
  onChange?: (list: any[]) => void
  renderItem: (item, index, total) => React.ReactNode
  name?: string
  checkItemValid?: (item, index?) => boolean
  required?: boolean
  onAdd?: () => any
  onUpdate?: (item) => void
  onRemove?: () => void
}

type ContextType = {
  onAdd?: () => void
  onUpdate?: (id, item) => void
  onRemove?: (id) => void
}

let uid = 1

class CrudList extends React.Component<CrudListProps> implements React.ChildContextProvider<ContextType> {
  static contextTypes = {
    setValid: PropTypes.func
  }

  static childContextTypes = {
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onRemove: PropTypes.func
  }

  valid: boolean

  onAdd = () => {
    let list = copyList(this.props.list)
    list.push({
      ...this.props.onAdd(),
      id: uid++,
      crud: ADD
    })
    this.props.onChange(list)
  }

  onUpdate = (id, updateInfo) => {
    let list = copyList(this.props.list)
    let index = list.indexOf(list.find(item => item.id == id))
    list[index] = {
      ...list[index],
      ...updateInfo
    }
    if (list[index].crud != ADD) {
      list[index].crud = UPDATE
    }
    this.props.onChange(list)
  }

  onRemove = (id) => {
    let list = copyList(this.props.list)
    let index = list.indexOf(list.find(item => item.id == id))
    handleListRemove(list, index)
    this.props.onChange(list)
  }

  _checkValid = () => {
    let valid = true
    this.props.list.forEach(item => {
      if (item.crud == REMOVE) return
      if (valid == true && this.props.checkItemValid(item) == false) {
        valid = false
      }
    })
    return valid
  }

  componentWillMount() {
    if (this.props.required && this.props.list.length == 0) {
      this.onAdd()
    }
  }

  componentDidMount() {
    if (this.context.setValid && this.props.checkItemValid) {
      if (!this.props.name) {
        throw new Error('name is required !!!')
      }
      this.valid = this._checkValid()
      this.context.setValid(this.props.name, this.valid)
    }
  }

  componentDidUpdate() {
    if (this.context.setValid && this.props.checkItemValid) {
      let valid = this._checkValid()
      if (this.valid != valid) {
        this.valid = valid
        this.context.setValid(this.props.name, valid)
      }
    }
  }

  render() {
    let filterList = this.props.list.filter(item => item.crud != REMOVE)
    return (
      <div>
        {
          this.props.list.map((item, index) => {
            if (item.crud == REMOVE) return null
            return this.props.renderItem(item, index, filterList.length)
          })
        }
        {this.props.children}
      </div>
    )
  }

  getChildContext() {
    return {
      onAdd: this.onAdd,
      onUpdate: this.onUpdate,
      onRemove: this.onRemove
    }
  }
}

export default CrudList
