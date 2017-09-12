/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'

import AddFile from '../upload/AddFile'
import FileList from './FileList'
import crud from '../../core/crud'
import {copyList} from '../../core/utils/common'

interface AttachmentProps {
  fileList: any[]
  onChange: (fileList: any[]) => void
  limit?: number
  title?: string
  disabled?: boolean
}

let uid = 1

class Attachment extends React.Component<AttachmentProps> {
  static defaultProps = {
    accept: '*',
    title: '添加附件',
    limit: 10
  }

  getData() {
    return this.props.fileList.filter(item => item.crud != null).map(item => {
      if (item.crud == crud.ADD) {
        return {
          "file_url": item.fileUrl,
          "file_name": item.fileName,
          "sign": crud.ADD
        }
      } else if (item.crud == crud.UPDATE) {
        return {
          "file_id": item.id,
          "file_url": item.fileUrl,
          "file_name": item.fileName,
          "sign": crud.UPDATE
        }
      } else if (item.crud == crud.REMOVE) {
        return {
          "file_id": item.id,
          "sign": crud.REMOVE
        }
      }
    })
  }

  handleFileUploaded = (uploadedFileList) => {
    const fileList = copyList(this.props.fileList)
    uploadedFileList.forEach(f => {
      fileList.push({
        ...f,
        id: uid++,
        crud: crud.ADD
      })
    })
    this.props.onChange(fileList)
  }

  render() {
    let total = this.props.fileList.filter(file => file.crud != crud.REMOVE).length
    return (
      <FileList fileList={this.props.fileList} onChange={this.props.onChange}>
        {
          !this.props.disabled && total < this.props.limit && (
            <AddFile multiple={true} tip={this.props.title} onFileUploadSuccess={this.handleFileUploaded}/>
          )
        }
        {
          this.props.disabled && total == 0 && (
            <div className="p10">暂无</div>
          )
        }
      </FileList>
    )
  }
}

export default Attachment
