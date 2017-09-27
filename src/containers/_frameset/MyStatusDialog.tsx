/**
 * Created by jiangyukun on 2017/9/20.
 */
import React from 'react'
import {Moment} from 'moment'
import Modal from 'app-core/modal'
import Form from 'app-core/form/Form'

import LabelAndInput1 from '../common/LabelAndInput1'
import Radio from '../../components/form/radio/Radio'
import DatePicker from '../../components/form/DatePicker'
import Button from '../../components/button/Button'

import addCommonFunction from './addCommonFunction'
import CommonFunction from '../common/interface/CommonFunction'
import {APP} from '../../core/constants/types'
import {getUserStatusText} from '../common/common.helper'

interface MyStatusDialogProps extends CommonFunction {
  currentStatus: number
  newStatus: number
  startDate: Moment
  endDate: Moment
  updateUserStatus: (options) => void
  updateUserStatusSuccess: boolean
  onExited: () => void
}

class MyStatusDialog extends React.Component<MyStatusDialogProps> {
  state = {
    show: true,
    valid: true,
    status: '',
    startDate: null,
    endDate: null
  }

  close = () => {
    this.setState({show: false})
  }

  update = () => {
    this.props.updateUserStatus({
      user_status: this.state.status,
      "begin_date": this.state.startDate,
      "end_date": this.state.endDate
    })
  }

  checkValid = () => {
    let valid = true
    if (this.state.status != '0' && (!this.state.startDate || !this.state.endDate)) {
      valid = false
    }
    if (valid != this.state.valid) {
      this.setState({valid})
    }
  }

  handleStatusChange = (v) => {
    if (v == '0') {
      this.setState({startDate: null, endDate: null})
    }
    this.setState({status: v}, this.checkValid)
  }

  componentWillMount() {
    const {newStatus, startDate, endDate} = this.props
    this.setState({status: newStatus, startDate, endDate}, this.checkValid)
  }

  componentWillReceiveProps(nextProps: MyStatusDialogProps) {
    if (!this.props.updateUserStatusSuccess && nextProps.updateUserStatusSuccess) {
      this.props.showSuccess('更新状态成功！')
      this.props.clearState(APP.UPDATE_USER_STATUS)
      this.close()
    }
  }

  render() {
    return (
      <Modal style={{width: '450px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>我的状态</Modal.Title>
        </Modal.Header>
        <Modal.Body className="my-status-dialog">
          <Form onValidChange={valid => this.setState({valid})}>
            <section className="current-status">
              <header className="status-title">
                当前状态
              </header>
              <div className="mt7">
                {getUserStatusText(this.props.currentStatus)}
              </div>
            </section>
            <section>
              <header className="status-title">
                设置状态
                <div className="pull-right">
                  <Button className="small" disabled={!this.state.valid} onClick={this.update}>更新</Button>
                </div>
              </header>
              <div>
                <LabelAndInput1 label="状态">
                  <Radio.Group
                    required={true} name="status"
                    value={this.state.status} onChange={this.handleStatusChange}>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">休假</Radio>
                    <Radio value="2">出差</Radio>
                  </Radio.Group>
                </LabelAndInput1>
                <LabelAndInput1 label="生效日期">
                  <DatePicker
                    disabled={this.state.status == '0'}
                    value={this.state.startDate} onChange={v => this.setState({startDate: v}, this.checkValid)}/>
                </LabelAndInput1>
                <LabelAndInput1 label="终止日期">
                  <DatePicker
                    disabled={this.state.status == '0'}
                    value={this.state.endDate} onChange={v => this.setState({endDate: v}, this.checkValid)}/>
                </LabelAndInput1>
              </div>
            </section>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default addCommonFunction(MyStatusDialog)
