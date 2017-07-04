/**
 * Created by jiangyukun on 2017/7/4.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'

import {positionList} from '../account-manage.constant'

class AddAccountDialog extends React.Component<any, any> {
  state = {
    show: true,
    position: ''
  }

  close = () => {
    this.setState({show: false})
  }

  addExperience = () => {

  }

  componentWillReceiveProps(nextProps: any) {
    if (!this.props.addQuestionSuccess && nextProps.addQuestionSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>创建账号</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form">
          <FlexDiv>
            <Part>
              账号（邮箱）：
            </Part>
            <Part>

            </Part>
          </FlexDiv>

          <Line/>

          <FlexDiv>
            <Part>
              姓名：
            </Part>
            <Part>

            </Part>
          </FlexDiv>

          <Line/>
          <FlexDiv>
            <Part>
              简称（用于生成编号）：
            </Part>
            <Part>

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
          <ConfirmOrClose onCancel={this.close} onConfirm={() => this.setState({})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AddAccountDialog
