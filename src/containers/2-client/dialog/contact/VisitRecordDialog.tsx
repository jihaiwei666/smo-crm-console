/**
 * Created by jiangyukun on 2017/7/25.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import LimitInput from 'app-core/form/LimitInput'
import Button from '../../../../components/button/Button'
import AddVisitRecordDialog from './AddVisitRecordDialog'

interface VisitRecordDialogProps {
  contactId: string
  contactOptions: any[]
  fetchVisitRecordList: any
  addVisitRecord: any
  updateVisitRecord: any
  removeVisitRecord: any
  onExited: () => void
}

class VisitRecordDialog extends React.Component<VisitRecordDialogProps> {
  state = {
    show: true,
    showAddDialog: false,

  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchVisitRecordList(this.props.contactId)
  }

  componentWillReceiveProps(nextProps: VisitRecordDialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
      this.close()
    }*/
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddDialog && (
            <AddVisitRecordDialog
              contactOptions={this.props.contactOptions}
              addVisitRecord={this.props.addVisitRecord}
              onExited={() => this.setState({showAddDialog: false})}
            />
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>拜访记录</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Part className="p5">
              <Button className="info block">添 加</Button>
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
