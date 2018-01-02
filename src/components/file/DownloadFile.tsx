/**
 * Created by jiangyukun on 2017/8/28.
 */
import React from 'react'
import classnames from 'classnames'

interface DownloadFileProps {
  className?: string
  url: string
  downloadName: string
}

class DownloadFile extends React.Component<DownloadFileProps> {
  render() {
    return (
      <a download={this.props.downloadName} href={this.props.url} className={classnames('download-file', this.props.className)} title="点击下载">
        {this.props.children}
      </a>
    )
  }
}

export default DownloadFile
