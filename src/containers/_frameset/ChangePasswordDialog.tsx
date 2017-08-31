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
import CommonFunction from '../common/interface/CommonFunction'
import addCommonFunction from './addCommonFunction'
import {APP} from '../../core/constants/types'
import md5 from '../../core/utils/md5'

interface ChangePasswordDialogProps extends CommonFunction {
  user: any
  changePassword: (userId, oldPassword, newPassword) => void
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

  changePassword = () => {
    this.props.changePassword(this.props.user.userId, md5(this.state.oldPassword), md5(this.state.newPassword))
  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: ChangePasswordDialogProps) {
    if (!this.props.changePasswordSuccess && nextProps.changePasswordSuccess) {
      this.props.showSuccess('修改密码成功！')
      this.props.clearState(APP.CHANGE_PASSWORD)
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
                     onConfirm={this.changePassword}/>
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
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showChangeConfirm: true})}
                          disabled={!this.state.valid || this.state.newPassword == this.state.oldPassword}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default addCommonFunction(ChangePasswordDialog)
