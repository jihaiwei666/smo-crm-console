/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import LimitInput from 'app-core/form/LimitInput'

interface RelevantItemDialogProps {
  onExited: () => void
}

class RelevantItemDialog extends React.Component<RelevantItemDialogProps> {
  state = {
    show: true,

  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: RelevantItemDialogProps) {

  }

  render() {
    return (
      <Modal style={{width: '450px', marginTop: '120px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>插入关联项</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => null}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RelevantItemDialog
