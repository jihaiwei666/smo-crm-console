/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Confirm from 'app-core/common/Confirm'

import Part1 from './part/Part1'
import CustomerInfo from './part/CustomerInfo'
import CategoryTitle from '../../common/CategoryTitle'
import Subcompany from './part/Subcompany'
import Contact from './part/Contact'
import CDA from './part/CDA'
import Supplier from './part/Supplier'
import RFI from './part/RFI'
import AssociateInfo from './part/AssociateInfo'
import RemarkAndAttachment from './part/RemarkAndAttachment'
import OperationRecord from './part/OperationRecord'

interface AddClientDialogProps {

  onExited: () => void
}

class AddClientDialog extends React.Component<AddClientDialogProps> {
  state = {
    show: true,
    showAddConfirm: false,

  }

  close = () => {
    this.setState({show: false})
  }

  componentWillReceiveProps(nextProps: AddClientDialogProps) {
    /*if (!this.props.Success && nextProps.Success) {
     this.close()
     }*/
  }

  render() {
    return (
      <Modal
        style={{width: '60%'}}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>添加客户</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Part1/>
          <CategoryTitle title="客户信息"/>
          <CustomerInfo/>
          <CategoryTitle title="分/子公司或下属院区"/>
          <Subcompany/>
          <CategoryTitle title="联系人"/>
          <Contact/>
          <CategoryTitle title="CDA"/>
          <CDA/>
          <CategoryTitle title="供应商"/>
          <Supplier/>

          <CategoryTitle title="RFI"/>
          <RFI/>

          <CategoryTitle title="关联信息"/>
          <AssociateInfo/>
          <CategoryTitle title="备注及附件"/>
          <RemarkAndAttachment/>

          <CategoryTitle title="操作记录"/>
          <OperationRecord/>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddClientDialog
