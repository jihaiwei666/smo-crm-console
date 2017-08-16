/**
 * Created by jiangyukun on 2017/5/6.
 */
import React from 'react'
import Modal from 'app-core/modal'

import ImageDialogContent from 'app-core/common/content/ImageDialogContent'

interface PreviewProps {
  url: string
  onOk: () => void
}

class Preview extends React.Component<PreviewProps> {
  state = {
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <Modal contentComponent={ImageDialogContent}
             show={this.state.show}
             onHide={this.close}
             onExited={this.props.onOk}
      >
        <Modal.Header closeButton={true}></Modal.Header>
        <div style={{padding: '15px', height: '100%', overflow: 'auto'}}>
          <img src={this.props.url} className="img-responsive"/>
        </div>
      </Modal>
    )
  }
}

export default Preview
