/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import LimitInput from 'app-core/form/LimitInput'

import {positionList} from '../account-manage.constant'
import Button from '../../../components/button/Button'

interface UpdateAccountDialogProps {
  accountInfo: any
  updateAccount: any
  updateAccountSuccess: boolean
  resetPassword: any
  resetPasswordSuccess: boolean
  onExited: () => void
}

class UpdateAccountDialog extends React.Component<UpdateAccountDialogProps> {
  state = {
    show: true,
    showUpdateConfirm: false,

    email: '',
    username: '',
    shortName: '',
    position: ''
  }

  close = () => {
    this.setState({show: false})
  }
  updateAccount = () => {
    const accountId = this.props.accountInfo['user_account']
    this.props.updateAccount(accountId, this.state.email, this.state.username, this.state.shortName, this.state.position)
  }

  componentWillMount() {
    const accountInfo = this.props.accountInfo || {}
    let email = accountInfo['user_account']
    let username = accountInfo['user_name']
    let shortName = accountInfo['user_short_name']
    let position = accountInfo['post_type']
    this.setState({email, username, shortName, position})
  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.props.updateAccountSuccess && nextProps.updateAccountSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showUpdateConfirm && (
            <Confirm
              message="确定更新吗？"
              onExited={() => this.setState({showUpdateConfirm: false})}
              onConfirm={this.updateAccount}
            />
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>修改账号</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>
              账号（邮箱）：
            </Part>
            <Part>
              <LimitInput
                limit={50}
                onExceed={() => null}
                placeholder="请输入邮箱"
                value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              姓名：
            </Part>
            <Part>
              <LimitInput
                limit={20}
                onExceed={() => null}
                placeholder="请输入姓名"
                value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              简称（用于生成编号）：
            </Part>
            <Part>
              <LimitInput
                limit={20}
                onExceed={() => null}
                placeholder="请输入简称"
                value={this.state.shortName} onChange={e => this.setState({shortName: e.target.value})}/>
            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              岗位类别：
            </Part>
            <Part>
              <Select1
                placeholder="请选择岗位类别"
                value={this.state.position} options={positionList} onChange={value => this.setState({position: value})}/>
            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <FlexDiv>
            <Part className="m5">
              <Button className="block">重置密码</Button>
            </Part>
            <Part className="m5">
              <Button className="block" onClick={() => this.setState({showUpdateConfirm: true})}>保存</Button>
            </Part>
          </FlexDiv>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default UpdateAccountDialog
