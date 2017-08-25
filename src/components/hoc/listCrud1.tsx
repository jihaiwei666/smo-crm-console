/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import PropTypes from 'prop-types'

import crud, {ADD, UPDATE, DELETE, handleCrudList} from '../../core/crud'
import {copyList} from '../../core/utils/common'

export type Crud1Props = {
  list: any[]
  onChange: (list: any[]) => void
}

export type Config = {
  ifAdd: (item, parentId) => any
  ifUpdate: (item) => any
  ifRemove: (item) => any
}

let uid = 1

function listCrud1(WrapperComponent, serverHandleConfig?: Config) {
  class Crud1 extends React.Component<Crud1Props> {
    static childContextTypes = {
      onAdd: PropTypes.func
    }
    static defaultProps = {
      showAdd: false
    }
    _wrapper: any

    onAdd = (addInfo) => {
      let list = copyList(this.props.list)
      list.push({
        ...addInfo,
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
      if (list[index].crud != crud.ADD) {
        list[index].crud = crud.UPDATE
      }
      this.props.onChange(list)
    }

    onRemove = (id) => {
      let list = copyList(this.props.list)
      let index = list.indexOf(list.find(item => item.id == id))
      if (list[index].crud == crud.ADD) {
        list.splice(index, 1)
      } else {
        list[index].crud = crud.REMOVE
      }
      this.props.onChange(list)
    }

    getData() {
      return handleCrudList(this.props.list, '', serverHandleConfig)
    }

    render() {
      const list = this.props.list.filter(item => item.crud != crud.DELETE)
      return (
        <div>
          {
            list.map((item, index) => {
              if (item.crud == crud.DELETE) {
                return null
              }
              return (
                <WrapperComponent
                  ref={c => this._wrapper = c}
                  key={item.id}
                  item={item}
                  index={index}
                  total={list.length}
                  onAdd={(addInfo) => this.onAdd(addInfo)}
                  onUpdate={(updateInfo) => this.onUpdate(item.id, updateInfo)}
                  onRemove={() => this.onRemove(item.id)}
                />
              )
            })
          }
          {this.props.children}
        </div>
      )
    }

    getChildContext() {
      return {
        onAdd: this.onAdd
      }
    }
  }

  return Crud1
}

export default listCrud1
