/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Select1 from 'app-core/common/Select1'
import Confirm from 'app-core/common/Confirm'
import {FlexDiv, Part} from 'app-core/layout/'
import Form from 'app-core/form/Form'

import DatePicker from '../../../../components/form/DatePicker'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import Button from '../../../../components/button/Button'
import AddButton from '../../../common/AddButton'
import SelectContact from '../base/SelectContact'
import SingleFile from '../../../common/file/SingleFile'
import {NECESSARY} from '../../../common/Label'

import Data from '../../../common/interface/Data'
import {addListItem, updateItemAtIndex} from '../../../../core/utils/arrayUtils'
import {getDateStr} from '../../../../core/utils/dateUtils'

interface UpdateCDA_DialogProps {
  customerId: string
  cdaId: string
  fetchCDA_Detail: (cdaId: string) => void
  cdaDetail: Data<any>
  fetchProjectList: (customerId) => void
  customerProjectData: any
  fetchContactList: (customerId) => void
  customerContactData: any
  updateCda: (options) => void
  updateCdaSuccess: boolean
  removeCda: (cdaId: string) => void
  removeCdaSuccess: boolean
  onExited: () => void
}

let cdaBrokerId = 1

class UpdateCDA_Dialog extends React.Component<UpdateCDA_DialogProps> {
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
      let contact = this.props.customerContactData.data.find(d => d.contactId == value)
      cda.username = value
      cda.telephone = contact.telephone
      cda.email = contact.email
      cda.position = contact.position
    })
    this.setState({cdaList})
  }

  addBroker = () => {
    this.setState({cdaList: addListItem(this.state.cdaList, {id: cdaBrokerId++, username: '', telephone: '', email: '', position: ''})})
  }

  update = () => {
    let cdaList = []
    this.props.updateCda({
      customerCda: {
        "cda_id": this.props.cdaId,
        "customer_info_id": this.props.customerId,
        "cda_validity_begin_time": getDateStr(this.state.startDate),
        "cda_validity_end_time": getDateStr(this.state.endDate),
        "cda_agreement_type": this.state.protocolType,
        "cda_agreement_project_id": this.state.projectId,
        "cda_remark": this.state.remark,
      },
      customerCdaPersons: cdaList,
      customerCdaFile: null
    })
  }

  componentDidMount() {
    this.props.fetchContactList(this.props.customerId)
    this.props.fetchCDA_Detail(this.props.cdaId)
  }

  componentWillReceiveProps(nextProps: UpdateCDA_DialogProps) {
    if (!this.props.cdaDetail.loaded && nextProps.cdaDetail.loaded) {
      this.setState(nextProps.cdaDetail.data)
    }
    if (!this.props.updateCdaSuccess && nextProps.updateCdaSuccess) {
      this.close()
    }
    if (!this.props.removeCdaSuccess && nextProps.removeCdaSuccess) {
      this.close()
    }
  }

  render() {
    const {loaded, data} = this.props.customerProjectData
    const contactList = this.props.customerContactData.data || []

    return (
      <Modal style={{marginTop: '30px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        {
          this.state.showAddConfirm && (
            <Confirm message="确定添加吗？"
                     onExited={() => this.setState({showAddConfirm: false})}
                     onConfirm={this.update}/>
          )
        }

        <Modal.Header closeButton={true}>
          <Modal.Title>编辑CDA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onValidChange={valid => this.setState({valid})}>
            <InputGroup className="bb" label="有效期" inputType="1">
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

            <InputGroup className="bb" label="CDA对接人" inputType="2">
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
                file={this.state.scanFile}
                onAdd={file => this.setState({scanFile: file})}
                onClear={() => this.setState({scanFile: null})}
              />
            </LabelAndInput1>
            <LabelAndInput1 label="备注">
            <textarea rows={4} className="input"
                      value={this.state.remark} onChange={e => this.setState({remark: e.target.value})}
            ></textarea>
            </LabelAndInput1>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <FlexDiv>
            <Part className="pl5 pr5">
              <Button className="block danger" onClick={() => this.props.removeCda(this.props.cdaId)}>删除</Button>
            </Part>
            <Part className="pl5 pr5">
              <Button className="block" disabled={!this.state.valid} onClick={this.update}>更新</Button>
            </Part>
          </FlexDiv>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default UpdateCDA_Dialog
