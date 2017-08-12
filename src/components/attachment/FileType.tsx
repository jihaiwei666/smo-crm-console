/**
 * Created by jiangyukun on 2017/5/17.
 */
import React from 'react'
import Preview from '../Preview'

interface FileTypeProps {
  fileType: string
  fileUrl: string
}

class FileType extends React.Component<FileTypeProps> {
  state = {
    showImg: false
  }

  render() {
    const {fileType, fileUrl} = this.props

    if (fileType == 'png' || fileType == 'jpg') {
      return (
        <span>
          {
            this.state.showImg && (
              <Preview url={fileUrl} onOk={() => this.setState({showImg: false})}/>
            )
          }
          <img className="img-type" src={fileUrl} onClick={() => this.setState({showImg: true})}/>
       </span>
      )
    }

    if (fileType == 'xls' || fileType == 'xlsx') {
      return (
        <i className="excel-svg"></i>
      )
    }

    if (fileType == 'doc' || fileType == 'docx') {
      return (
        <i className="word-svg"></i>
      )
    }

    if (fileType == 'ppt' || fileType == 'pptx') {
      return (
        <i className="ppt-svg"></i>
      )
    }

    if (fileType == 'txt') {
      return (
        <i className="txt-svg"></i>
      )
    }

    if (fileType == 'pdf') {
      return (
        <i className="pdf-svg"></i>
      )
    }

    return (
      <i className="file-svg"></i>
    )
  }
}

export default FileType
