/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import Modal from 'app-core/modal'
import {Row, Part, Line} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'
import Spinner from 'app-core/common/Spinner'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {LimitInput} from 'app-core/form'
import Button from '../../../../components/button/Button'
import AddMsaDialog from './AddMsaDialog'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import FlexDiv from 'app-core/layout/FlexDiv'

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
    showAddConfirm: false,
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
    console.log(data)
    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
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
        {
          this.state.showAddConfirm && (
            <Confirm message="？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={() => null}/>
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
              <Button className="info block" onClick={() => this.setState({showAddMsaDialog: true})}>添加</Button>
            </Part>
            <Part className="p5">
              <Button className="block">保存修改</Button>
            </Part>
          </Row>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default LookMSADialog
