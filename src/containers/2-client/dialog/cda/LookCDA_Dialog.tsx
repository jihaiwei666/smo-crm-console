/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Spinner from 'app-core/common/Spinner'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import InputGroup from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import LabelAndText from '../../../common/LabelAndText'
import {getDateStr} from '../../../../core/utils/dateUtils'

interface LookCDA_DialogProps {
  customerId: string
  cdaId: string
  fetchCDA_Detail: (cdaId: string) => void
  cdaDetail: any
  fetchProjectList: (customerId) => void
  customerProjectData: any
  onExited: () => void
}

class LookCDA_Dialog extends React.Component<LookCDA_DialogProps> {
  state = {
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  componentDidMount() {
    this.props.fetchCDA_Detail(this.props.cdaId)
  }

  render() {
    const {loaded, data} = this.props.cdaDetail
    const {
      startDate, endDate, protocolType, projectName, cdaList, remark
    }:any = data || {}
    return (
      <Modal style={{marginTop: '100px'}} show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>查看CDA</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bt">
          {
            !loaded && (
              <Spinner/>
            )
          }
          {
            loaded && (
              <div>
                <InputGroup label="有效期" inputType={NECESSARY}>
                  <LabelAndText label="起始日期" text={getDateStr(startDate)}/>
                  <LabelAndText label="结束日期" text={getDateStr(endDate)}/>
                  <div className="tip">CDA超过有效期的前一天，会自动向该客户所属BD发送提醒</div>
                </InputGroup>
                <InputGroup label="保密协议" inputType={NECESSARY}>
                  <LabelAndInput1 label="类型">
                    <Radio.Group value={protocolType}>
                      <Radio value="1">整体合作</Radio>
                      <Radio value="2">单一项目</Radio>
                    </Radio.Group>
                  </LabelAndInput1>
                  <LabelAndText label="项目名称" text={projectName}/>
                  <div className="tip">单一项目时，填写项目名称</div>
                </InputGroup>

                <InputGroup label="CDA对接人" inputType={IMPORTANT}>
                  {
                    cdaList.map((item, index) => {
                      return (
                        <div key={item.id} className="bb">
                          <LabelAndText label="姓名" text={item.username}/>
                          <LabelAndText label="电话" text={item.telephone}/>
                          <LabelAndText label="邮箱" text={item.email}/>
                          <LabelAndText label="职位" text={item.position}/>
                        </div>
                      )
                    })
                  }
                  <div className="tip">
                    请先完善联系人信息，之后才能在对接人中选择该联系人
                  </div>
                </InputGroup>

                <LabelAndInput1 label="CDA扫描件" className="bb pb5">
                  <div style={{height: '50px'}}></div>
                </LabelAndInput1>
                <LabelAndText label="备注" text={remark}/>
              </div>
            )
          }

        </Modal.Body>
      </Modal>
    )
  }
}

export default LookCDA_Dialog
