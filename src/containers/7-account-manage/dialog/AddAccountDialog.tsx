/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {LimitInput} from 'app-core/form'

import {positionList} from '../account-manage.constant'

interface AddAccountDialogProps {
  addAccount: any
  addAccountSuccess: boolean
  onExited: () => void
}

class AddAccountDialog extends React.Component<AddAccountDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

    email: '',
    username: '',
    shortName: '',
    position: ''
  }

  close = () => {
    this.setState({show: false})
  }

  addAccount = () => {
    this.props.addAccount(this.state.email, this.state.username, this.state.shortName, this.state.position)
  }

  componentWillReceiveProps(nextProps: AddAccountDialogProps) {
    if (!this.props.addAccountSuccess && nextProps.addAccountSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定新增账号吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.addAccount}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>创建账号</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexDiv>
            <Part>
              账号（邮箱）：
            </Part>
            <Part>
              <LimitInput
                placeholder="请输入账号"
                limit={20}
                onExceed={() => null}
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
                placeholder="请输入姓名"
                limit={20}
                onExceed={() => null}
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
                placeholder="请输入简称"
                limit={20}
                onExceed={() => null}
                value={this.state.shortName} onChange={e => this.setState({shortName: e.target.value})}/>
            </Part>
          </FlexDiv>

          <Line/>
          <FlexDiv>
            <Part>
              岗位类别：
            </Part>
            <Part>
              <Select1 value={this.state.position} options={positionList} onChange={value => this.setState({position: value})}/>
            </Part>
          </FlexDiv>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddAccountDialog
