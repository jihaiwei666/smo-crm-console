/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

import AddIcon from '../AddIcon'

import {ADD, UPDATE, DELETE} from '../../core/CRUD'
import {copyList} from '../../core/utils/common'

export interface CrudProps {
  showAdd?: boolean
  list: any[]
  onChange: (list: any[]) => void
}

let uid = 1

function listCrud(WrapperComponent, defaultItem) {
  class Crud extends React.Component<CrudProps> {
    static defaultProps = {
      showAdd: false
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

    onUpdate = (item, index) => {
      let list = copyList(this.props.list)
      list[index] = {
        ...list[index],
        ...item
      }
      if (list[index].crud != ADD) {
        list[index].crud = UPDATE
      }
      this.props.onChange(list)
    }

    onRemove = (index) => {
      let list = copyList(this.props.list)
      if (list[index].crud == ADD) {
        list.splice(index, 1)
      } else {
        list[index].crud = DELETE
      }
      this.props.onChange(list)
    }

    componentWillMount() {
      if (this.props.list.length == 0) {
        this.onAdd()
      }
    }

    render() {
      return (
        <div>
          {
            this.props.list.map((item, index) => {
              if (item.crud == DELETE) {
                return null
              }
              return (
                <WrapperComponent
                  key={item.id}
                  item={item}
                  index={index}
                  total={this.props.list.length}
                  onAdd={() => this.onAdd()}
                  onUpdate={(item) => this.onUpdate(item, index)}
                  onRemove={() => this.onRemove(index)}
                />
              )
            })
          }
          {
            (this.props.list.length == 0 || this.props.showAdd) && (
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
