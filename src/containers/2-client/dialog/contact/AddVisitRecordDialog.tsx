/**
 * Created by jiangyukun on 2017/7/25.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'app-core/modal'
import Select1 from 'app-core/common/Select1'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import TextArea from 'app-core/form/TextArea'
import LabelAndInput1 from '../../../common/LabelAndInput1'

import {VISIT_TYPE} from './contact.constant'
import {getDateStr} from '../../../../core/utils/dateUtils'

interface AddVisitRecordDialogProps {
  contactOptions: any[]
  addVisitRecord: any
  addVisitRecordSuccess: boolean
  onExited: () => void
}

class AddVisitRecordDialog extends React.Component<AddVisitRecordDialogProps> {
  state = {
    show: true,
    contactId: '',
    visitType: '',
    visitDate: null,
    nextVisitDate: null,
    visitContent: ''
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addVisitRecord({
      "contacts_info_id": this.state.contactId,
      "visit_way": this.state.visitType,
      "visit_time": getDateStr(this.state.visitDate),
      "next_visit_time": getDateStr(this.state.nextVisitDate),
      "visit_content": this.state.visitContent,
    })
  }

  componentWillReceiveProps(nextProps: AddVisitRecordDialogProps) {
    if (!this.props.addVisitRecordSuccess && nextProps.addVisitRecordSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>添加拜访记录</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LabelAndInput1 label="联系人">
            <Select1 options={this.props.contactOptions}
                     value={this.state.contactId} onChange={(v) => this.setState({contactId: v})}
            />
          </LabelAndInput1>
          <LabelAndInput1 label="拜访方式">
            <Select1 options={VISIT_TYPE}
                     value={this.state.visitType} onChange={(v) => this.setState({visitType: v})}
            />
          </LabelAndInput1>
          <LabelAndInput1 label="拜访日期">
            <DatePicker value={this.state.visitDate} onChange={(v) => this.setState({visitDate: v})}/>
          </LabelAndInput1>
          <LabelAndInput1 label="下次拜访日">
            <DatePicker value={this.state.nextVisitDate} onChange={(v) => this.setState({nextVisitDate: v})}/>
          </LabelAndInput1>
          <LabelAndInput1 label="拜访内容">
            <TextArea value={this.state.visitContent} onChange={e => this.setState({visitContent: e.target.value})}/>
          </LabelAndInput1>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.add}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddVisitRecordDialog
