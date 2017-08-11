/**
 * Created by jiangyukun on 2017/5/17.
 */
import React from 'react'
import Preview from '../Preview'

class FileType extends React.Component<any, any> {
  state = {
    showImg: false
  }

  render() {
    const {fileInfo} = this.props
    if (fileInfo.fileType == 'png' || fileInfo.fileType == 'jpg') {
      return (
        <span>
          {
            this.state.showImg && (
              <Preview url={fileInfo.fileUrl} onOk={() => this.setState({showImg: false})}/>
            )
          }
          <img className="img-type" src={fileInfo.fileUrl} onClick={() => this.setState({showImg: true})}/>
       </span>
      )
    }

    if (fileInfo.fileType == 'xls' || fileInfo.fileType == 'xlsx') {
      return (
        <i className="excel-svg"></i>
      )
    }

    if (fileInfo.fileType == 'doc' || fileInfo.fileType == 'docx') {
      return (
        <i className="word-svg"></i>
      )
    }

    if (fileInfo.fileType == 'ppt' || fileInfo.fileType == 'pptx') {
      return (
        <i className="ppt-svg"></i>
      )
    }

    if (fileInfo.fileType == 'txt') {
      return (
        <i className="txt-svg"></i>
      )
    }

    if (fileInfo.fileType == 'pdf') {
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
