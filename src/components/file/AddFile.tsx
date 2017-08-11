/**
 * Created by jiangyukun on 2016/12/23.
 */
import React, {Component} from 'react'
import Icon from 'antd/lib/icon'

import FileUpload from './FileUpload'

interface AddFileProps {
  tip: string
  onPictureUpdated: (fileInfo: any) => void
}

class AddFile extends Component<AddFileProps> {
  onFileUploadSuccess = (fileInfo) => {
    this.props.onPictureUpdated(fileInfo)
  }

  render() {
    return (
      <FileUpload className="add-file" onFileUploadSuccess={this.onFileUploadSuccess}>
        <Icon type="plus" className="file-trigger"/>
        <div className="file-upload-tip">
          {this.props.tip}
        </div>
      </FileUpload>
    )
  }
}

export default AddFile
