/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {FlexDiv, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {LimitInput} from 'app-core/form'
import {category} from '../todo-remind.constant'
import Button from '../../../components/button/Button'
import Input from '../../../components/form/Input'

interface RelevantItemDialogProps {
  fetchRelevantItemList: (category: string, searchKey: string) => void
  onExited: () => void
}

class RelevantItemDialog extends React.Component<RelevantItemDialogProps> {
  state = {
    show: true,
    category: '',
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchRelevantItemList('1', '')
  }

  componentWillReceiveProps(nextProps: RelevantItemDialogProps) {

  }

  render() {
    return (
      <Modal style={{width: '450px', marginTop: '120px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>插入关联项</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-box">
            <div className="choice-category">
              <Select1
                className="relevant-item-category"
                placeholder="关联项分类"
                options={category}
                value={this.state.category}
                onChange={v => this.setState({category: v})}
              />
            </div>
            <div className="flex1">
              <Input/>
            </div>
            <div className="pl5">
              <Button className="">搜索</Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={() => null}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RelevantItemDialog
