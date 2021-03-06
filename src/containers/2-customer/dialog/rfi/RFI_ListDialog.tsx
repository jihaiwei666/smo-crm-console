/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Spinner from 'app-core/common/Spinner'

import Button from '../../../../components/button/Button'
import AddRfiDialog from './AddRfiDialog'
import Data from '../../../common/interface/Data'
import UpdateRFI_Item from './UpdateRFI_Item'
import CommonFunction from '../../../common/interface/CommonFunction'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import Index from '../../../common/Index'

interface RFI_ListDialogProps extends CommonFunction {
  customerId: string
  fetchContactList: (customerId) => void
  customerContactData: Data<any>
  fetchRfiList: (customerId) => void
  rfiList: Data<any[]>
  addRfi: (options) => void
  addRfiSuccess: boolean
  updateRfi: (options) => void
  updateRfiSuccess: boolean
  removeRfi: (rfiId) => void
  removeRfiSuccess: boolean
  editAuthority: boolean
  onExited: () => void
}

class RFI_ListDialog extends React.Component<RFI_ListDialogProps> {
  state = {
    show: true,
    showAddRfi: false,
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchRfiList(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: RFI_ListDialogProps) {
    if (!this.props.addRfiSuccess && nextProps.addRfiSuccess) {
      this.props.fetchRfiList(this.props.customerId)
    }
    if (!this.props.removeRfiSuccess && nextProps.removeRfiSuccess) {
      this.props.showSuccess('删除RFI成功！')
      this.props.fetchRfiList(this.props.customerId)
    }
  }

  render() {
    const {data, loaded} = this.props.rfiList
    return (
      <Modal
        contentComponent={FullDialogContent} style={{width: '600px'}}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddRfi && (
            <AddRfiDialog
              customerId={this.props.customerId}
              fetchContactList={this.props.fetchContactList}
              customerContactData={this.props.customerContactData}
              addRfi={this.props.addRfi}
              addRfiSuccess={this.props.addRfiSuccess}
              onExited={() => this.setState({showAddRfi: false})}
            />
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>RFI列表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && data.map((rfi, index) => {
              return (
                <Row key={rfi.rfiId} className="bb">
                  <Index index={index}/>
                  <Part>
                    <UpdateRFI_Item
                      customerId={this.props.customerId}
                      fetchContactList={this.props.fetchContactList}
                      customerContactData={this.props.customerContactData}
                      rfiId={rfi.rfiId}
                      initRfi={rfi}
                      updateRfi={this.props.updateRfi}
                      removeRfi={this.props.removeRfi}
                      editAuthority={this.props.editAuthority}
                    />
                  </Part>
                </Row>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          {
            this.props.editAuthority && (
              <Row>
                <Part className="p5">
                  <Button className="block default" onClick={this.close}>取消</Button>
                </Part>
                <Part className="p5">
                  <Button className="block" onClick={() => this.setState({showAddRfi: true})}>添加</Button>
                </Part>
              </Row>
            )
          }
          {
            !this.props.editAuthority && (
              <Row>
                <Part className="p5">
                  <Button className="block default" onClick={this.close}>取消</Button>
                </Part>
              </Row>
            )
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default addCommonFunction(RFI_ListDialog)
