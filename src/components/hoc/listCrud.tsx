/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

import AddIcon from '../AddIcon'

import {ADD, UPDATE, DELETE, handleCrudList} from '../../core/CRUD'
import {copyList} from '../../core/utils/common'

export interface CrudProps {
  parentId: string
  showAdd?: boolean
  list: any[]
  onChange: (list: any[]) => void
}

export type Config = {
  ifAdd: (item, props) => any
  ifUpdate: (item, props) => any
  ifRemove: (item, props) => any
}

let uid = 1

function listCrud(WrapperComponent, defaultItem, serverHandleConfig?: Config) {
  class Crud extends React.Component<CrudProps> {
    static defaultProps = {
      showAdd: false
    }
    _wrapper: any

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
      if (list[index].crud == ADD) {
        list.splice(index, 1)
      } else {
        list[index].crud = DELETE
      }
      this.props.onChange(list)
    }

    getData() {
      return handleCrudList(this.props.list, this._wrapper.props, serverHandleConfig)
    }

    componentWillMount() {
      if (this.props.list.length == 0) {
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
                  ref={c => this._wrapper = c}
                  key={item.id}
                  parentId={this.props.parentId}
                  item={item}
                  index={index}
                  total={list.length}
                  onAdd={() => this.onAdd()}
                  onUpdate={(updateInfo) => this.onUpdate(item.id, updateInfo)}
                  onRemove={() => this.onRemove(item.id)}
                />
              )
            })
          }
          {
            (list.length == 0 || this.props.showAdd) && (
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
