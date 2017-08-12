/**
 * Created by jiangyukun on 2017/8/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import AddFileButton from '../../../../components/button/AddFileButton'

interface AddAttachmentButtonProps {

}

class AddAttachmentButton extends React.Component<AddAttachmentButtonProps> {
  static contextTypes = {
    onAdd: PropTypes.func
  }

  handleUploaded = (data) => {
    data.forEach(item => {
      this.context.onAdd(item)
    })
  }

  render() {
    return (
      <AddFileButton multiple={true} onUploadSuccess={this.handleUploaded}/>
    )
  }
}

export default AddAttachmentButton
