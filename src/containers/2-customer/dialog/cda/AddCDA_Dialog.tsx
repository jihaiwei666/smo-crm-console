/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'app-core/modal'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import Form from 'app-core/form/Form'

import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import AddButton from '../../../common/AddButton'
import DatePicker from '../../../../components/form/DatePicker'
import SelectContact from '../base/SelectContact'
import SingleFile from '../../../common/file/SingleFile'

import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import {ADD} from '../../../../core/crud'
import {addListItem, updateItemAtIndex} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'
import {addCda} from './cda.action'
import {fetchContactList, fetchProjectList} from '../../customer.action'
import {CUSTOMER} from '../../../../core/constants/types'

interface AddCDA_DialogProps extends CommonFunction {
  customerId: string
  fetchProjectList: (customerId) => void
  customerProjectData: any
  fetchContactList: (customerId) => void
  customerContactData: any
  addCda: (options) => void
  addCdaSuccess: boolean
  onExited: () => void
}

let cdaBrokerId = 1

class AddCDA_Dialog extends React.Component<AddCDA_DialogProps> {
  _scanFile: any
  state = {
    show: true,
    showAddConfirm: false,
    valid: false,

    startDate: null,
    endDate: null,
    protocolType: '',
    projectId: '',
    cdaList: [],
    scanFile: null,
    remark: '',
  }

  close = () => {
    this.setState({show: false})
  }

  handleProtocolTypeChange = (v) => {
    if (v == '1') {
      this.setState({projectId: ''})
    }
    this.setState({protocolType: v})
  }

  handleContactChange = (index, value) => {
    let cdaList = updateItemAtIndex(this.state.cdaList, index, cda => {
      cda.username = value
    })
    this.setState({cdaList})
  }

  addBroker = () => {
    this.setState({cdaList: addListItem(this.state.cdaList, {id: cdaBrokerId++, username: ''})})
  }

  add = () => {
    let cdaList = this.state.cdaList.map(item => ({
      "contacts_info_id": item.username, "sign": ADD
    }))
    this.props.addCda({
      customerCda: {
        "customer_info_id": this.props.customerId,
        "cda_validity_begin_time": getDateStr(this.state.startDate),
        "cda_validity_end_time": getDateStr(this.state.endDate),
        "cda_agreement_type": this.state.protocolType,
        "cda_agreement_project_id": this.state.projectId,
        "cda_remark": this.state.remark,
      },
      customerCdaPersons: cdaList,
      customerCdaFile: this._scanFile.getData()
    })
  }

  componentDidMount() {
    this.props.fetchContactList(this.props.customerId)
  }

  componentWillReceiveProps(nextProps: AddCDA_DialogProps) {
    if (!this.props.addCdaSuccess && nextProps.addCdaSuccess) {
      this.props.showSuccess('添加CDA成功！')
      this.props.clearState(CUSTOMER.ADD_CDA)
      this.close()
    }
  }

  render() {
    const {loaded, data} = this.props.customerProjectData
    const contactList = this.props.customerContactData.data || []

    return (
      <Modal show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定添加吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.add}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>添加CDA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onValidChange={valid => this.setState({valid})}>
            <InputGroup className="bb" label="有效期" inputType={NECESSARY}>
              <LabelAndInput1 label="起始日期">
                <DatePicker
                  required={true} name="startDate"
                  value={this.state.startDate} onChange={v => this.setState({startDate: v})}/>
              </LabelAndInput1>
              <LabelAndInput1 label="结束日期">
                <DatePicker
                  required={true} name="endDate"
                  value={this.state.endDate} onChange={v => this.setState({endDate: v})}/>
              </LabelAndInput1>
              <div className="tip">CDA超过有效期的前一天，会自动向该客户所属BD发送提醒</div>
            </InputGroup>
            <InputGroup className="bb" label="保密协议" inputType={NECESSARY}>
              <LabelAndInput1 label="类型">
                <Radio.Group
                  required={true} name="protocolType"
                  value={this.state.protocolType} onChange={this.handleProtocolTypeChange}>
                  <Radio value="1">整体合作</Radio>
                  <Radio value="2">单一项目</Radio>
                </Radio.Group>
              </LabelAndInput1>
              <LabelAndInput1 label="项目名称">
                <Select1
                  width="250px"
                  lazyLoad={true} onFirstOpen={() => this.props.fetchProjectList(this.props.customerId)}
                  loadSuccess={loaded} options={data || []}
                  value={this.state.projectId} onChange={v => this.setState({projectId: v})}
                  disabled={this.state.protocolType != '2'}/>
              </LabelAndInput1>
              <div className="tip">单一项目时，填写项目名称</div>
            </InputGroup>

            <InputGroup className="bb" label="CDA对接人" inputType={IMPORTANT}>
              {
                this.state.cdaList.map((item, index) => {
                  return (
                    <div key={item.id} className="bb">
                      <SelectContact
                        contactId={item.username}
                        onChange={v => this.handleContactChange(index, v)}
                        contactList={contactList}
                      />
                    </div>
                  )
                })
              }
              <div className="tip">
                请先完善联系人信息，之后才能在对接人中选择该联系人
                <div className="pull-right">
                  <AddButton onClick={this.addBroker}>添加</AddButton>
                </div>
              </div>
            </InputGroup>

            <LabelAndInput1 label="CDA扫描件" className="bb pb5">
              <SingleFile
                ref={c => this._scanFile = c}
                accept="*"
                file={this.state.scanFile}
                onChange={file => this.setState({scanFile: file})}
                onClear={() => this.setState({scanFile: null})}
              />
            </LabelAndInput1>
            <LabelAndInput1 label="备注">
            <textarea rows={4} className="input"
                      value={this.state.remark} onChange={e => this.setState({remark: e.target.value})}></textarea>
            </LabelAndInput1>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose
            okBtnName="添加" disabled={!this.state.valid}
            onCancel={this.close} onConfirm={() => this.setState({showAddConfirm: true})}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    customerId: props.customerId,
    addCdaSuccess: state.customer.addCdaSuccess,
    customerProjectData: state.customerProjectData,
    customerContactData: state.customerContactData
  }
}

export default connect(mapStateToProps, {
  addCda, fetchProjectList, fetchContactList
})(addCommonFunction(AddCDA_Dialog))
