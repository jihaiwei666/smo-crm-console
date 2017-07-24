/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import LimitInput from 'app-core/form/LimitInput'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'

interface AddMsaDialogProps {
  supplierId: string
  addMsa: any
  addMsaSuccess: boolean
  onExited: () => void
}

class AddMsaDialog extends React.Component<AddMsaDialogProps> {
  state = {
    show: true,
    startDate: '',
    endDate: ''
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addMsa({
      "provider_id": this.props.supplierId,
      "msa_begin_time": this.state.startDate,
      "msa_end_time": this.state.endDate,
    })
  }

  componentWillReceiveProps(nextProps: AddMsaDialogProps) {
    if (!this.props.addMsaSuccess && nextProps.addMsaSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal style={{width: '500px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>

        <Modal.Header closeButton={true}>
          <Modal.Title>添加MSA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LabelAndInput label="起始日期" value={this.state.startDate} onChange={v => this.setState({startDate: v})}/>
          <LabelAndInput label="结束日期" value={this.state.endDate} onChange={v => this.setState({endDate: v})}/>
          <LabelAndInput1 label="MSA扫描件">

          </LabelAndInput1>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.add}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddMsaDialog
