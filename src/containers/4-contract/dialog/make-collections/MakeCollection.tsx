/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

import DatePicker from 'antd/lib/date-picker'
import {Row} from 'app-core/layout/'
import Select1 from 'app-core/common/Select1'
import Form from 'app-core/form/Form'

import LabelAndInput1 from '../../../common/LabelAndInput1'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import Update from '../../../common/Update'
import {NECESSARY, IMPORTANT} from '../../../common/Label'

import Data from '../../../common/interface/Data'

interface MakeCollectionProps {
  contractId: string
  collectionId: string
  initCollection: any
  fetchInstitutionList: (contractId) => void
  institutionList: Data<any[]>
  fetchInstitutionInfo: (institutionId) => void
  institutionInfo: Data<any[]>
  updateCollection: (options) => void
}

class MakeCollection extends React.Component<MakeCollectionProps> {
  state = {
    valid: null,
    nodeDate: null,
    collectionMoney: '',
    po: '',
    invoiceTitle: '',
    money: '',
    taxRate: '',
    invoicePostAddress: '',
    invoiceReceiver: '',
    receiverContactInfo: '',
    institution: '',
    applyInvoiceDate: null,
    invoiceDate: null,
    pressForMoneyDate: null,
    makeCollectionsDate: null,
    makeCollectionsValue: ''
  }

  update = () => {
    this.props.updateCollection({
      "collection_id": this.props.collectionId,
      "receivables_amount": this.state.collectionMoney,
      "invoice_content_po": this.state.po,
      "invoice_content_title": this.state.invoiceTitle,
      "invoice_content_amount": this.state.money,
      "invoice_cost_detail_taxes_rate": this.state.taxRate,
      "invoice_mailing_address": this.state.invoicePostAddress,
      "invoice_recipient": this.state.invoiceReceiver,
      "invoice_recipient_contact": this.state.receiverContactInfo,
      "biling_apply_date": this.state.invoiceDate,
      "biling_date": this.state.invoiceDate,
      "remind_reminders_date": this.state.pressForMoneyDate,
      "payment_date": this.state.makeCollectionsDate,
      "payment_money": this.state.makeCollectionsValue,
      "payment_node_date": this.state.nodeDate,
    })
  }

  fetchInstitutionList = () => {
    if (!this.props.institutionList.loaded) {
      this.props.fetchInstitutionList(this.props.contractId)
    }
  }

  fetchInstitutionInfo = () => {
    this.props.fetchInstitutionInfo(this.state.institution)
  }

  componentWillMount() {
    if (this.props.initCollection) {
      this.setState(this.props.initCollection)
    }
  }

  render() {
    let institutionInfo: any = {}
    if (this.props.institutionInfo.loaded) {
      institutionInfo = this.props.institutionInfo.data
    }

    return (
      <div>
        <Row>
          <div className="serial-number">1</div>
          <Form onValidChange={valid => this.setState({valid})}>
            <LabelAndInput1 label="节点日期">
              <DatePicker disabled={true} value={this.state.nodeDate} onChange={v => this.setState({nodeDate: v})}/>
            </LabelAndInput1>
            <LabelAndInput
              label="应收款金额"
              value={this.state.collectionMoney} onChange={v => this.setState({collectionMoney: v})}
            />
            <InputGroup className="bb" label="发票内容">
              <LabelAndInput
                label="PO"
                value={this.state.po} onChange={v => this.setState({po: v})}
              />
              <LabelAndInput
                label="发票抬头" inputType={NECESSARY}
                required={true} name="invoiceTitle"
                value={this.state.invoiceTitle} onChange={v => this.setState({invoiceTitle: v})}
              />
              <LabelAndInput
                label="金额" inputType={NECESSARY}
                required={true} name="money"
                value={this.state.money} onChange={v => this.setState({money: v})}
              />
              <LabelAndInput
                label="税率"
                value={this.state.taxRate} onChange={v => this.setState({taxRate: v})}
              />
              <LabelAndInput
                label="发票邮寄地址"
                value={this.state.invoicePostAddress} onChange={v => this.setState({invoicePostAddress: v})}
              />
              <LabelAndInput
                label="发票接收人"
                value={this.state.invoiceReceiver} onChange={v => this.setState({invoiceReceiver: v})}
              />
              <LabelAndInput
                label="接收人联系方式"
                value={this.state.receiverContactInfo} onChange={v => this.setState({receiverContactInfo: v})}
              />
            </InputGroup>
            <div className="bb">
              <InputGroup label="开票信息">
                <LabelAndInput1 label="机构" inputType={NECESSARY}>
                  <Select1
                    options={this.props.institutionList.data || []}
                    onFirstOpen={this.fetchInstitutionList}
                    lazyLoad={true} loadSuccess={this.props.institutionList.loaded}
                    value={this.state.institution} onChange={v => this.setState({institution: v}, this.fetchInstitutionInfo)}
                  />
                </LabelAndInput1>
                <LabelAndInput
                  label="纳税人识别号" placeholder="选择机构后自动匹配" disabled={true}
                  value={institutionInfo.taxpayerNumber || ''}
                />
                <LabelAndInput
                  label="开户银行" placeholder="选择机构后自动匹配" disabled={true}
                  value={institutionInfo.bank || ''}
                />
                <LabelAndInput
                  label="开户银行账号" placeholder="选择机构后自动匹配" disabled={true}
                  value={institutionInfo.bankAccount || ''}
                />
                <LabelAndInput
                  label="开票地址" placeholder="选择机构后自动匹配" disabled={true}
                  value={institutionInfo.address || ''}
                />
                <LabelAndInput
                  label="电话" placeholder="选择机构后自动匹配" disabled={true}
                  value={institutionInfo.telephone || ''}
                />
              </InputGroup>
              <div className="tip">选择机构后，自动匹配相应开票信息</div>
            </div>
            <div className="bb">
              <LabelAndInput
                label="申请开票日期" inputType={NECESSARY}
                required={true} name="applyInvoiceDate"
                value={this.state.applyInvoiceDate}
                placeholder="提交申请后自动生成" disabled={true}/>
              <div>
                <div className="tip">点击右侧“提交开票申请”后，将自动生成</div>
              </div>
            </div>
            <LabelAndInput1 label="开票日期" inputType={IMPORTANT}>
              <DatePicker
                value={this.state.invoiceDate} onChange={v => this.setState({invoiceDate: v})}
              />
            </LabelAndInput1>
            <div className="bb">
              <LabelAndInput1 label="提醒催款日期" inputType={IMPORTANT}>
                <DatePicker
                  value={this.state.pressForMoneyDate} onChange={v => this.setState({pressForMoneyDate: v})}
                />
              </LabelAndInput1>
              <div className="tip">提醒催款日期到后，如果还没有到款日期，则会向所属BDPC发出提醒</div>
            </div>
            <LabelAndInput1 label="到款日期" inputType={NECESSARY}>
              <DatePicker
                value={this.state.makeCollectionsDate} onChange={v => this.setState({makeCollectionsDate: v})}
              />
            </LabelAndInput1>
            <LabelAndInput
              label="到款金额" inputType={NECESSARY}
              value={this.state.makeCollectionsValue} onChange={v => this.setState({makeCollectionsValue: v})}
            />
          </Form>
        </Row>
        <Update onClick={this.update}/>
      </div>
    )
  }
}

export default MakeCollection
