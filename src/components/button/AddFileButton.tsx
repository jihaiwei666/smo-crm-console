/**
 * Created by jiangyukun on 2017/8/2.
 */
import React from 'react'

import FileUpload from '../upload/FileUpload'
import Button from './Button'

interface AddFileButtonProps {
  accept?: string
  multiple?: boolean
  disabled?: boolean
  onUploadSuccess: (fileInfo) => void
}

class AddFileButton extends React.Component<AddFileButtonProps> {
  static defaultProps = {
    accept: '*'
  }

  render() {
    return (
      <FileUpload accept={this.props.accept} multiple={this.props.multiple} onFileUploadSuccess={this.props.onUploadSuccess}>
        <Button className="small" disabled={this.props.disabled}>
          <img src={require('./upload.svg')} className="btn-icon"/>
          上传
        </Button>
      </FileUpload>
    )
  }
}

export default AddFileButton
