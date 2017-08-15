/**
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import Button from '../../../../components/button/Button'
import AddRfiDialog from './AddRfiDialog'
import Data from '../../../common/interface/Data'
import UpdateRFI_Item from './UpdateRFI_Item'

interface RFI_ListDialogProps {
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
    if (!this.props.removeRfiSuccess && nextProps.removeRfiSuccess) {
      this.props.fetchRfiList(this.props.customerId)
    }
  }

  render() {
    const rfiList = this.props.rfiList.data || []
    return (
      <Modal
        contentComponent={FullDialogContent} style={{width: '50%'}}
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
          <Modal.Title>查看RFI</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            rfiList.map((rfi, index) => {
              return (
                <Row key={rfi.rfiId} className="bb">
                  <div className="item-index">{index + 1}</div>
                  <Part>
                    <UpdateRFI_Item
                      customerId={this.props.customerId}
                      fetchContactList={this.props.fetchContactList}
                      customerContactData={this.props.customerContactData}
                      rfiId={rfi.rfiId}
                      rfi={rfi}
                      updateRfi={this.props.updateRfi}
                      removeRfi={this.props.removeRfi}
                    />
                  </Part>
                </Row>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Part className="p5">
              <Button className="block default" onClick={this.close}>取消</Button>
            </Part>
            <Part className="p5">
              <Button className="block" onClick={() => this.setState({showAddRfi: true})}>添加</Button>
            </Part>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RFI_ListDialog