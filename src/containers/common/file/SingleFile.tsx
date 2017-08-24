/**
 * Created by jiangyukun on 2017/8/22.
 */
import React from 'react'

import RemoveIcon from '../../../components/RemoveIcon'
import AddFileButton from '../../../components/button/AddFileButton'
import crud from '../../../core/CRUD'

interface SingleFileProps {
  file: any
  onChange: (file) => void
  onClear: () => void
}

class SingleFile extends React.Component<SingleFileProps> {
  removeFlag = false

  getData() {
    if (!this.props.file) return null
    const file = this.props.file
    if (file.crud == crud.ADD) {
      return {
        "file_url": file.fileUrl,
        "file_name": file.fileName,
        "sign": crud.ADD
      }
    } else if (file.crud == crud.UPDATE) {
      return {
        "file_id": file.id,
        "file_url": file.fileUrl,
        "file_name": file.fileName,
        "sign": crud.UPDATE
      }
    } else if (file.crud == crud.REMOVE) {
      return {
        "file_id": file.id,
        "sign": crud.REMOVE
      }
    }
  }

  handleUploaded = (files) => {
    // 删除原来的文件，又新增了一个文件，看作是文件更新操作（有意思）
    this.props.onChange({
      ...this.props.file,
      ...files[0],
      crud: this.removeFlag ? crud.UPDATE : crud.ADD
    })
  }

  handleClear = () => {
    if (this.props.file.crud == crud.ADD) {
      this.props.onClear()
    } else {
      this.removeFlag = true
      this.props.onChange({
        ...this.props.file,
        crud: crud.REMOVE
      })
    }
  }

  render() {
    let empty = !this.props.file || this.props.file.crud == crud.REMOVE

    return (
      <div>
        {
          !empty && (
            <div className="m5">
              <span className="mr10">{this.props.file.fileName}</span>
              <RemoveIcon onClick={this.handleClear}/>
            </div>
          )
        }
        {
          empty && (
            <AddFileButton
              accept="image/png,image/jpg,image/jpeg" multiple={false}
              onUploadSuccess={this.handleUploaded}
            />
          )
        }
      </div>
    )
  }
}

export default SingleFile
