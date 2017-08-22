/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout'
import Spinner from 'app-core/common/Spinner'
import FlexDiv from 'app-core/layout/FlexDiv'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import Button from '../../../../components/button/Button'
import AddMsaDialog from './AddMsaDialog'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'

interface LookMSADialogProps {
  supplierId: string
  fetchMSAList: (supplierId: string) => void
  msaListInfo: any
  addMsa: (options) => void
  updateMsa: (options) => void
  onExited: () => void
}

class LookMSADialog extends React.Component<LookMSADialogProps> {
  state = {
    show: true,
    showAddMsaDialog: false,
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchMSAList(this.props.supplierId)
  }

  componentWillReceiveProps(nextProps: LookMSADialogProps) {
    /* if (!this.props.Success && nextProps.Success) {
       this.close()
     }*/
  }

  render() {
    const {loaded, data} = this.props.msaListInfo

    return (
      <Modal
        style={{width: '600px'}}
        contentComponent={FullDialogContent}
        show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddMsaDialog && (
            <AddMsaDialog
              supplierId={this.props.supplierId}
              addMsa={this.props.addMsa}
              addMsaSuccess={false}
              onExited={() => this.setState({showAddMsaDialog: false})}
            />
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>查看MSA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && (
              data.map((item, index) => {
                return (
                  <FlexDiv key={item.msaId} className="">
                    <div style={{width: '75px'}}>{index + 1}</div>
                    <Part className="bb bl">
                      <LabelAndInput label="起始日期" value={item.startDate} onChange={v => this.setState({startDate: v})}/>
                      <LabelAndInput label="结束日期" value={item.endDate} onChange={v => this.setState({endDate: v})}/>
                      <LabelAndInput1 label="MSA扫描件">

                      </LabelAndInput1>
                    </Part>
                  </FlexDiv>
                )
              })
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Part className="p5">
              <Button className="block default" onClick={this.close}>取消</Button>
            </Part>
            <Part className="p5">
              <Button className="info block" onClick={() => this.setState({showAddMsaDialog: true})}>添加</Button>
            </Part>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default LookMSADialog
