/**
 * Created by jiangyukun on 2017/8/30.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import Confirm from 'app-core/common/Confirm'
import Form from 'app-core/form/Form'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'

import Label, {NECESSARY} from '../common/Label'
import Input from '../../components/form/Input'

interface ChangePasswordDialogProps {
  changePassword: () => void
  changePasswordSuccess: boolean
  onExited: () => void
}

class ChangePasswordDialog extends React.Component<ChangePasswordDialogProps> {
  state = {
    show: true,
    valid: true,
    showChangeConfirm: false,
    oldPassword: '',
    newPassword: '',
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: ChangePasswordDialogProps) {
    if (!this.props.changePasswordSuccess && nextProps.changePasswordSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal style={{width: '400px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showChangeConfirm && (
            <Confirm message="确定重置密码吗？"
                     onExited={() => this.setState({showChangeConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>修改密码</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onValidChange={valid => this.setState({valid})}>
            <Row className="v-middle">
              <Part>
                <Label inputType={NECESSARY}>原密码</Label>
              </Part>
              <Part weight={2}>
                <Input
                  required={true} name="oldPassword"
                  type="password" value={this.state.oldPassword} onChange={v => this.setState({oldPassword: v})}/>
              </Part>
            </Row>
            <Line/>
            <Row className="v-middle">
              <Part>
                <Label inputType={NECESSARY}>新密码</Label>
              </Part>
              <Part weight={2}>
                <Input
                  required={true} name="newPassword"
                  type="password" value={this.state.newPassword} onChange={v => this.setState({newPassword: v})}/>
              </Part>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showChangeConfirm: true})} disabled={!this.state.valid}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ChangePasswordDialog
