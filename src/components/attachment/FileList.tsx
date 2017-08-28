/**
 * Created by jiangyukun on 2017/7/20.
 */
import React from 'react'

import FileType from './FileType'
import Spinner from 'app-core/common/Spinner'

import {copyList, downloadFile} from '../../core/utils/common'
import crud from '../../core/crud'
import DownloadFile from '../file/DownloadFile'

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
  state = {
    touchIndex: -1
  }

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
            let fileUrl = fileInfo.fileUrl
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
            return (
              <div key={fileInfo.id} className="flex1"
                   onMouseEnter={() => this.setState({touchIndex: index})}
                   onMouseLeave={() => this.setState({touchIndex: -1})}
              >
                <div className="uploaded-file">
                  {
                    this.state.touchIndex == index && (
                      <div className="remove-uploaded-file" onClick={() => this.removeFile(index)}>
                        <i className="minus-red-svg"></i>
                      </div>
                    )
                  }
                  <div className="uploaded-file-type-icon">
                    {
                      this.state.touchIndex == index && (
                        <DownloadFile url={fileUrl}>
                          <div className="to-download-file">
                            <img src={require('../download.svg')}/>
                          </div>
                        </DownloadFile>
                      )
                    }
                    <FileType fileType={fileType} fileUrl={fileUrl}/>
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
