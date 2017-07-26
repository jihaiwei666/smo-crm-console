/**
 * Created by jiangyukun on 2017/7/25.
 */
import React from 'react'
import DatePicker from 'antd/lib/date-picker'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import Confirm from 'app-core/common/Confirm'
import Select1 from 'app-core/common/Select1'
import Spinner from 'app-core/common/Spinner'
import TextArea from 'app-core/form/TextArea'

import Button from '../../../../components/button/Button'
import AddVisitRecordDialog from './AddVisitRecordDialog'
import LabelAndInput1 from '../../../common/LabelAndInput1'

import {VISIT_TYPE} from './contact.constant'

interface VisitRecordDialogProps {
  customerId: string
  contactOptions: any[]
  fetchVisitRecordList: any
  visitRecordListInfo: any
  addVisitRecord: any
  addVisitRecordSuccess: boolean
  updateVisitRecord: any
  updateVisitRecordSuccess: boolean
  removeVisitRecord: any
  removeVisitRecordSuccess: boolean
  onExited: () => void
}

class VisitRecordDialog extends React.Component<VisitRecordDialogProps> {
  state = {
    show: true,
    showAddDialog: false,
    removeVisitId: ''
  }

  close = () => {
    this.setState({show: false})
  }

  refreshList = () => {
    this.props.fetchVisitRecordList({
      "customer_info_id": this.props.customerId,
      "contacts_info_id": null
    })
  }

  componentDidMount() {
    this.refreshList()
  }

  componentWillReceiveProps(nextProps: VisitRecordDialogProps) {
    if (!this.props.addVisitRecordSuccess && nextProps.addVisitRecordSuccess) {
      this.refreshList()
    }
    if (!this.props.updateVisitRecordSuccess && nextProps.updateVisitRecordSuccess) {
      this.close()
    }
    if (!this.props.removeVisitRecordSuccess && nextProps.removeVisitRecordSuccess) {
      this.refreshList()
    }
  }

  render() {
    const {loaded, data} = this.props.visitRecordListInfo

    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.removeVisitId && (
            <Confirm
              message="确定删除此随访记录吗？"
              onExited={() => this.setState({removeVisitId: ''})}
              onConfirm={() => this.props.removeVisitRecord(this.state.removeVisitId)}
            />
          )
        }
        {
          this.state.showAddDialog && (
            <AddVisitRecordDialog
              contactOptions={this.props.contactOptions}
              addVisitRecord={this.props.addVisitRecord}
              addVisitRecordSuccess={this.props.addVisitRecordSuccess}
              onExited={() => this.setState({showAddDialog: false})}
            />
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>拜访记录列表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && data.map((record, index) => {
              return (
                <div key={record.visitId} className="visit-record-item">
                  <LabelAndInput1 label="联系人">
                    <Select1 options={this.props.contactOptions}
                             value={record.contactId} onChange={(v) => this.setState({contactId: v})}
                    />
                  </LabelAndInput1>
                  <LabelAndInput1 label="拜访方式">
                    <Select1 options={VISIT_TYPE}
                             value={record.visitType} onChange={(v) => this.setState({visitType: v})}
                    />
                  </LabelAndInput1>
                  <LabelAndInput1 label="拜访日期">
                    <DatePicker value={record.visitDate} onChange={(v) => this.setState({visitDate: v})}/>
                  </LabelAndInput1>
                  <LabelAndInput1 label="下次拜访日">
                    <DatePicker value={record.nextVisitDate} onChange={(v) => this.setState({nextVisitDate: v})}/>
                  </LabelAndInput1>
                  <LabelAndInput1 label="拜访内容">
                    <TextArea value={record.visitContent} onChange={e => this.setState({visitContent: e.target.value})}/>
                  </LabelAndInput1>
                  <div className="text-right">
                    <Button className="small danger" onClick={() => this.setState({removeVisitId: record.visitId})}>
                      删除
                    </Button>
                  </div>
                </div>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Part className="p5">
              <Button className="info block" onClick={() => this.setState({showAddDialog: true})}>添 加</Button>
            </Part>
            <Part className="p5">
              <Button className="block">保存修改</Button>
            </Part>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default VisitRecordDialog
