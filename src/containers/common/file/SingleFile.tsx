/**
 * Created by jiangyukun on 2017/8/22.
 */
import React from 'react'

import RemoveIcon from '../../../components/RemoveIcon'
import AddFileButton from '../../../components/button/AddFileButton'

interface SingleFileProps {
  file: any
  onAdd: (file) => void
  onClear: () => void
}

class SingleFile extends React.Component<SingleFileProps> {
  render() {
    return (
      <div>
        {
          this.props.file && (
            <div className="m5">
              <span className="mr10">{this.props.file.fileName}</span>
              <RemoveIcon onClick={this.props.onClear}/>
            </div>
          )
        }
        {
          !this.props.file && (
            <AddFileButton
              accept="image/png,image/jpg,image/jpeg" multiple={false}
              onUploadSuccess={files => this.props.onAdd(files[0])}
            />
          )
        }
      </div>
    )
  }
}

export default SingleFile
