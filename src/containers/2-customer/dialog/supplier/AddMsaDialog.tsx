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

import {getDateStr} from '../../../../core/utils/dateUtils'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import {CUSTOMER} from '../../../../core/constants/types'

interface AddMsaDialogProps extends CommonFunction {
  supplierId: string
  addMsa: any
  addMsaSuccess: boolean
  onExited: () => void
}

class AddMsaDialog extends React.Component<AddMsaDialogProps> {
  _scanFile: any
  state = {
    valid: true,
    show: true,
    startDate: null,
    endDate: null,
    scanFile: null
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addMsa({
      "customerProviderMsaVo": {
        "provider_id": this.props.supplierId,
        "msa_begin_time": getDateStr(this.state.startDate),
        "msa_end_time": getDateStr(this.state.endDate),
      },
      "customerProviderMsaFile": this._scanFile.getData()
    })
  }

  componentWillReceiveProps(nextProps: AddMsaDialogProps) {
    if (!this.props.addMsaSuccess && nextProps.addMsaSuccess) {
      this.props.showSuccess('添加MSA成功！')
      this.props.clearState(CUSTOMER.ADD_MSA)
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
                ref={c => this._scanFile = c}
                file={this.state.scanFile}
                onChange={file => this.setState({scanFile: file})}
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

export default addCommonFunction(AddMsaDialog)
