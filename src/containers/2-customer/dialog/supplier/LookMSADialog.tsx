/**
 * Created by jiangyukun on 2017/7/24.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import {Row, Part} from 'app-core/layout'
import Spinner from 'app-core/common/Spinner'
import Confirm from 'app-core/common/Confirm'
import FullDialogContent from 'app-core/common/content/FullDialogContent'

import Button from '../../../../components/button/Button'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Index from '../../../common/Index'
import DatePicker from '../../../../components/form/DatePicker'
import DownloadFile from '../../../../components/file/DownloadFile'
import NoListData from '../../../common/NoListData'
import AddMsaDialog from './AddMsaDialog'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {fetchMSAList, addMsa, updateMsa, removeMsa} from './supplier.action'

interface LookMSADialogProps extends CommonFunction {
  supplierId: string
  fetchMSAList: (supplierId: string) => void
  msaListInfo: any
  addMsa: (options) => void
  addMsaSuccess: boolean
  updateMsa: (options) => void
  updateMsaSuccess: boolean
  removeMsa: (msaId) => void
  removeMsaSuccess: boolean
  editAuthority: boolean
  onExited: () => void
}

class LookMSADialog extends React.Component<LookMSADialogProps> {
  state = {
    show: true,
    showAddMsaDialog: false,
    toRemoveMsaId: ''
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchMSAList(this.props.supplierId)
  }

  componentWillReceiveProps(nextProps: LookMSADialogProps) {
    if (!this.props.addMsaSuccess && nextProps.addMsaSuccess) {
      this.props.fetchMSAList(this.props.supplierId)
    }
    if (!this.props.removeMsaSuccess && nextProps.removeMsaSuccess) {
      this.props.showSuccess('删除MSA成功！')
      this.props.fetchMSAList(this.props.supplierId)
    }
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
              addMsaSuccess={this.props.addMsaSuccess}
              onExited={() => this.setState({showAddMsaDialog: false})}
            />
          )
        }
        {
          this.state.toRemoveMsaId && (
            <Confirm
              message="确定删除此MSA吗？"
              onExited={() => this.setState({toRemoveMsaId: ''})}
              onConfirm={() => this.props.removeMsa(this.state.toRemoveMsaId)}
            />
          )
        }
        <Modal.Header closeButton={true}>
          <Modal.Title>MSA列表</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && data.length == 0 && (
              <NoListData/>
            )
          }
          {
            loaded && data.map((item, index) => {
              return (
                <Row key={item.msaId} className="msa-list-item">
                  <Index index={index}/>
                  <Part>
                    <LabelAndInput1 label="起始日期">
                      <DatePicker
                        value={item.startDate} onChange={v => null}
                      />
                    </LabelAndInput1>
                    <LabelAndInput1 label="结束日期">
                      <DatePicker value={item.endDate}/>
                    </LabelAndInput1>
                    <LabelAndInput1 label="MSA扫描件">
                      {
                        item.scanFile && (
                          <DownloadFile url={item.scanFile.fileUrl} downloadName={item.scanFile.fileName}>
                            <span>[ {item.scanFile.fileName} ]</span>
                          </DownloadFile>
                        )
                      }
                      {
                        !item.scanFile && (
                          <span>无</span>
                        )
                      }
                    </LabelAndInput1>
                    {
                      this.props.editAuthority && (
                        <div className="clearfix">
                          <div className="pull-right tip">
                            <span className="mr5">点此删除按钮删除一条MSA信息</span>
                            <Button className="small danger" onClick={() => this.setState({toRemoveMsaId: item.msaId})}>删除</Button>
                          </div>
                        </div>
                      )
                    }
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
                  <Button className="info block" onClick={() => this.setState({showAddMsaDialog: true})}>添加</Button>
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

function mapStateToProps(state, props) {
  return {
    addMsaSuccess: state.customer.addMsaSuccess,
    updateMsaSuccess: state.customer.updateMsaSuccess,
    removeMsaSuccess: state.customer.removeMsaSuccess,
    supplierId: props.supplierId,
    msaListInfo: state.msaListInfo
  }
}

export default connect(mapStateToProps, {
  fetchMSAList, addMsa, updateMsa, removeMsa
})(addCommonFunction(LookMSADialog))
