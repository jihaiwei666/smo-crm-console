/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import InputGroup from '../../common/InputGroup'
import LabelAndInput from '../../common/LabelAndInput'
import LabelAndInput1 from '../../common/LabelAndInput1'
import Input from '../../../components/form/Input'
import Radio from '../../../components/form/radio/Radio'
import Button from '../../../components/button/Button'
import AddButton from '../../common/AddButton'

interface CDA_DialogProps {

  onExited: () => void
}

class CDA_Dialog extends React.Component<CDA_DialogProps> {
  state = {
    show: true,
    showAddConfirm: false,
    type: null,
    projectName: '',
    username: '',

  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: CDA_DialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
     this.close()
     }*/
  }

  render() {
    return (
      <Modal style={{marginTop: '20px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>添加CDA</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bt">
          <InputGroup label="有效期" inputType="1">
            <LabelAndInput1 label="起始日期">
              <Input/>
            </LabelAndInput1>
            <LabelAndInput1 label="结束日期">
              <Input/>
            </LabelAndInput1>
            <div className="tip">CDA超过有效期的前一天，会自动向该客户所属BD发送提醒</div>
          </InputGroup>
          <InputGroup label="保密协议" inputType="1">
            <LabelAndInput1 label="类型">
              <Radio.Group value={this.state.type} onChange={v => this.setState({type: v})}>
                <Radio value="1">整体合作</Radio>
                <Radio value="2">单一项目</Radio>
              </Radio.Group>
            </LabelAndInput1>
            <LabelAndInput1 label="项目名称">
              <Select1 value={this.state.projectName}/>
            </LabelAndInput1>
            <div className="tip">单一项目时，填写项目名称</div>
          </InputGroup>
          <InputGroup label="CDA对接人" inputType="2">
            <LabelAndInput1 label="姓名">
              <Select1 value={this.state.username} placeholder="选择联系人"/>
            </LabelAndInput1>
            <LabelAndInput label="电话" placeholder="选择联系人后自动显示" disabled={true}/>
            <LabelAndInput label="邮箱" placeholder="选择联系人后自动显示" disabled={true}/>
            <LabelAndInput label="职位" placeholder="选择联系人后自动显示" disabled={true}/>
            <div className="tip">
              请先完善联系人信息，之后才能在对接人中选择该联系人
              <div className="pull-right">
                <AddButton>添加</AddButton>
              </div>
            </div>
          </InputGroup>
          <LabelAndInput1 label="CDA扫描件" className="bb pb5">
            <Button>上传</Button>
          </LabelAndInput1>
          <LabelAndInput1 label="备注">
            <textarea rows={4} className="input"></textarea>
          </LabelAndInput1>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose okBtnName="添加" onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CDA_Dialog
