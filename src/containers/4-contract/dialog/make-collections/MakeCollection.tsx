/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'

import {Row, Part} from 'app-core/layout/'
import Select1 from 'app-core/common/Select1'
import Form from 'app-core/form/Form'

import Input from '../../../../components/form/Input'
import DatePicker from '../../../../components/form/DatePicker'
import InputWithSuffix from '../../../../components/form/InputWithSuffix'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import {NECESSARY, IMPORTANT} from '../../../common/Label'
import Button from '../../../../components/button/Button'
import TextAndButton from '../../../common/TextAndButton'
import Index from '../../../common/Index'
import Update from '../../../common/Update'

import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {nodeProgressOptions, nodeProgress} from '../../contract.constant'
import {getSuffix} from '../after-sign/after-sign.helper'
import {CONTRACT} from '../../../../core/constants/types'

interface MakeCollectionProps extends CommonFunction {
  index: number
  contractId: string
  collectionId: string
  initCollection: any
  loaded: boolean
  institutionList: Data<any[]>
  fetchInstitutionInfo: (institutionId) => void
  institutionInfo: Data<any[]>
  submitBillApply: (content: string) => void
  submitBillApplySuccess: boolean
  newBillDate: any
  updateCollection: (options) => void
  editAuthority: boolean
}

class MakeCollection extends React.Component<MakeCollectionProps> {
  submitApply = false
  loadInstitution = false
  paymentNode = ''
  institutionInfo: any
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
      "subsidiary_id": this.state.institution,
      "biling_apply_date": this.state.invoiceDate,
      "biling_date": this.state.invoiceDate,
      "remind_reminders_date": this.state.pressForMoneyDate,
      "payment_date": this.state.makeCollectionsDate,
      "payment_money": this.state.makeCollectionsValue,
      "payment_node_date": this.state.nodeDate
    })
  }

  fetchInstitutionInfo = () => {
    if (this.state.institution) {
      this.loadInstitution = true
      this.props.fetchInstitutionInfo(this.state.institution)
    }
  }

  submitBillApply = () => {
    let {taxpayerNumber, bank, bankAccount, address, telephone} = this.institutionInfo
    let content = `此合同申请开票，开票信息如下：
                    纳税人识别号: ${taxpayerNumber}
                    开户银行: ${bank}
                    开户银行账号: ${bankAccount}
                    开票地址: ${address}
                    电话: ${telephone}`
    this.submitApply = true
    this.props.submitBillApply(content)
  }

  componentWillReceiveProps(nextProps: MakeCollectionProps) {
    if (this.loadInstitution && !this.props.institutionInfo.loaded && nextProps.institutionInfo.loaded) {
      this.loadInstitution = false
      this.institutionInfo = nextProps.institutionInfo.data
    }
    if (this.submitApply && !this.props.submitBillApplySuccess && nextProps.submitBillApplySuccess) {
      this.submitApply = false
      this.setState({applyInvoiceDate: nextProps.newBillDate})
      this.props.showSuccess('申请开票成功！')
      this.props.clearState(CONTRACT.SUBMIT_BILL_APPLY)
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.setState(nextProps.initCollection)
    }
  }

  componentWillMount() {
    this.setState(this.props.initCollection)
    this.paymentNode = this.props.initCollection.paymentNode
  }

  componentDidMount() {
    this.fetchInstitutionInfo()
  }

  render() {
    let institutionInfo = this.institutionInfo || {}
    let {progressNode, progressQuota, progressDate} = this.props.initCollection

    return (
      <div className="make-collection-item">
        <Row>
          <Index index={this.props.index}/>
          <Part>
            <Form onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority}>
              {
                this.paymentNode == '1' && (
                  <LabelAndInput1 label="节点日期" className="input-row">
                    <DatePicker disabled={true} value={this.state.nodeDate} onChange={v => this.setState({nodeDate: v})}/>
                  </LabelAndInput1>
                )
              }
              {
                this.paymentNode == '2' && (
                  <div className="input-row">
                    <LabelAndInput1 label="节点">
                      <Select1 width="250px" disabled={true} value={progressNode} options={nodeProgressOptions}/>
                    </LabelAndInput1>
                    <LabelAndInput1 label="指标">
                      {
                        (progressNode == '' || progressNode == nodeProgress.contractSigned || progressNode == nodeProgress.databaseLock) ? (
                          <Input width="250px" placeholder="请输入指标数字" disabled={true} value={progressQuota}/>
                        ) : (
                          <InputWithSuffix
                            disabled={true}
                            placeholder="请输入指标数字" suffix={getSuffix(progressNode)}
                            value={progressQuota}
                          />
                        )
                      }
                    </LabelAndInput1>
                    <LabelAndInput1 label="预估日期">
                      <DatePicker disabled={true} value={progressDate}/>
                    </LabelAndInput1>
                  </div>
                )
              }
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
              <div className="input-row">
                <InputGroup label="开票信息">
                  <LabelAndInput1 label="机构" inputType={NECESSARY}>
                    <Select1
                      width="250px" options={this.props.institutionList.data || []}
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
              <div className="input-row">
                <LabelAndInput1 label="申请开票日期" inputType={NECESSARY}>
                  <DatePicker
                    placeholder="提交申请后自动生成" disabled={true}
                    required={true} name="applyInvoiceDate"
                    value={this.state.applyInvoiceDate}
                  />
                </LabelAndInput1>
                <TextAndButton text="点击右侧“提交开票申请”后，将自动生成">
                  <Button className="small" disabled={!this.state.institution || !this.props.editAuthority} onClick={this.submitBillApply}>
                    提交开票申请
                  </Button>
                </TextAndButton>
              </div>
              <LabelAndInput1 className="input-row" label="开票日期" inputType={IMPORTANT}>
                <DatePicker
                  value={this.state.invoiceDate} onChange={v => this.setState({invoiceDate: v})}
                />
              </LabelAndInput1>
              <div className="input-row">
                <LabelAndInput1 label="提醒催款日期" inputType={IMPORTANT}>
                  <DatePicker
                    value={this.state.pressForMoneyDate} onChange={v => this.setState({pressForMoneyDate: v})}
                  />
                </LabelAndInput1>
                <div className="tip">提醒催款日期到后，如果还没有到款日期，则会向所属BDPC发出提醒</div>
              </div>
              <LabelAndInput1 className="input-row" label="到款日期" inputType={IMPORTANT}>
                <DatePicker value={this.state.makeCollectionsDate} onChange={v => this.setState({makeCollectionsDate: v})}/>
              </LabelAndInput1>
              <LabelAndInput
                className="input-row" label="到款金额" inputType={IMPORTANT}
                value={this.state.makeCollectionsValue} onChange={v => this.setState({makeCollectionsValue: v})}
              />
            </Form>
          </Part>
        </Row>
        {
          this.props.editAuthority && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
        {
          !this.props.editAuthority && (<div className="m15"></div>)
        }
      </div>
    )
  }
}

export default addCommonFunction(MakeCollection)
