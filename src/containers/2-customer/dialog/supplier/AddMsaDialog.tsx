/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Form from 'app-core/form/Form'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import DatePicker from '../../../../components/form/DatePicker'
import SingleFile from '../../../common/file/SingleFile'
import {NECESSARY} from '../../../common/Label'

interface AddMsaDialogProps {
  supplierId: string
  addMsa: any
  addMsaSuccess: boolean
  onExited: () => void
}

class AddMsaDialog extends React.Component<AddMsaDialogProps> {
  state = {
    valid: true,
    show: true,
    startDate: '',
    endDate: '',
    scanFile: null
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addMsa({
      "customerProviderMsaVo": {
        "provider_id": this.props.supplierId,
        "msa_begin_time": this.state.startDate,
        "msa_end_time": this.state.endDate,
      },
      "customerProviderMsaFile": this._getFile()
    })
  }

  _getFile() {
    if (!this.state.scanFile) return null
    return {
      "file_url": this.state.scanFile.fileUrl,
      "file_name": this.state.scanFile.fileName,
    }
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
          <Form onValidChange={valid => this.setState({valid})}>
            <LabelAndInput1 label="起始日期" inputType={NECESSARY}>
              <DatePicker
                required={true} name="startDate"
                value={this.state.startDate} onChange={v => this.setState({startDate: v})}
              />
            </LabelAndInput1>
            <LabelAndInput1 label="结束日期" inputType={NECESSARY}>
              <DatePicker
                required={true} name="endDate"
                value={this.state.endDate} onChange={v => this.setState({endDate: v})}
              />
            </LabelAndInput1>
            <LabelAndInput1 label="MSA扫描件">
              <SingleFile
                file={this.state.scanFile}
                onAdd={file => this.setState({scanFile: file})}
                onClear={() => this.setState({scanFile: null})}
              />
            </LabelAndInput1>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.add}
                          disabled={!this.state.valid}
          />
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddMsaDialog
