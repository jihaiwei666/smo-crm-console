/**
 * Created by jiangyukun on 2017/8/2.
 */
import React from 'react'
import FileUpload from '../file/FileUpload'
import Button from './Button'

interface AddFileButtonProps {
  disabled?: boolean
  onUploadSuccess: () => void
}

class AddFileButton extends React.Component<AddFileButtonProps> {
  render() {
    return (
      <FileUpload onFileUploadSuccess={this.props.onUploadSuccess}>
        <Button disabled={this.props.disabled}>上传</Button>
      </FileUpload>
    )
  }
}

export default AddFileButton
