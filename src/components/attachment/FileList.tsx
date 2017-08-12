/**
 * Created by jiangyukun on 2017/7/20.
 */
import React from 'react'

import FileType from './FileType'
import Spinner from 'app-core/common/Spinner'
import {copyList} from '../../core/utils/common'
import crud from '../../core/CRUD'

export interface ServerFile {
  id: string
  crud: string
  fileName: string
  fileUrl: string
}

interface FileListProps {
  uploading?: boolean
  fileList: ServerFile[]
  onChange: (fileList: ServerFile[]) => void
}

class FileList extends React.Component<FileListProps> {
  removeFile = index => {
    const fileList = copyList(this.props.fileList)
    fileList[index].crud = crud.REMOVE
    this.props.onChange(fileList)
  }

  render() {
    return (
      <div className="attachments">
        {
          this.props.fileList.map((fileInfo, index) => {
            if (fileInfo.crud == crud.REMOVE) {
              return
            }
            let fileName = fileInfo.fileName || ''
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
            return (
              <div key={fileInfo.id} className="flex1">
                <div className="uploaded-file">
                  <div className="remove-uploaded-file" onClick={() => this.removeFile(index)}>
                    <i className="minus-red-svg"></i>
                  </div>
                  <div className="uploaded-file-type-icon">
                    <FileType fileType={fileType} fileUrl={fileInfo.fileUrl}/>
                  </div>
                  <div className="uploaded-file-name">{fileName}</div>
                </div>
              </div>
            )
          })
        }
        {
          this.props.uploading && (
            <Spinner/>
          )
        }
        {this.props.children}
        <div style={{flex: '10'}}></div>
      </div>
    )
  }
}

export default FileList
