/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

import AddIcon from '../AddIcon'

import {ADD, UPDATE, DELETE, handleCrudList, handleListRemove} from '../../core/crud'
import {copyList} from '../../core/utils/common'

export interface CrudProps {
  required?: boolean
  parentId?: string
  showAdd?: boolean
  list: any[]
  onChange: (list: any[]) => void
  disabled?: boolean
}

export type Config = {
  ifAdd?: (item, parentId) => any
  ifUpdate?: (item, parentId) => any
  ifRemove?: (item, parentId) => any
}

let uid = 1

function listCrud(WrapperComponent, defaultItem, serverHandleConfig?: Config) {
  class Crud extends React.Component<CrudProps> {
    static defaultProps = {
      showAdd: false,
      required: false
    }

    onAdd = () => {
      let list = copyList(this.props.list)
      list.push({
        ...defaultItem,
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

    getData() {
      return handleCrudList(this.props.list, serverHandleConfig, this.props.parentId)
    }

    componentWillMount() {
      if (this.props.list.length == 0 && this.props.required) {
        this.onAdd()
      }
    }

    render() {
      const list = this.props.list.filter(item => item.crud != DELETE)
      return (
        <div>
          {
            list.map((item, index) => {
              if (item.crud == DELETE) {
                return null
              }
              return (
                <WrapperComponent
                  key={item.id}
                  item={item}
                  index={index}
                  total={list.length}
                  onAdd={() => this.onAdd()}
                  onUpdate={(updateInfo) => this.onUpdate(item.id, updateInfo)}
                  onRemove={() => this.onRemove(item.id)}
                  disabled={this.props.disabled}
                />
              )
            })
          }
          {
            (!this.props.disabled && (list.length == 0 || this.props.showAdd)) && (
              <AddIcon onClick={this.onAdd}/>
            )
          }
        </div>
      )
    }
  }

  return Crud
}

export default listCrud
