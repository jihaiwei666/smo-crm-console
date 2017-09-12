/**
 * Created by jiangyukun on 2017/7/14.
 */
import React from 'react'
import {Row, Part} from 'app-core/layout'
import Confirm from 'app-core/common/Confirm'
import Form from 'app-core/form/Form'

import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import {NECESSARY} from '../../../common/Label'
import Index from '../../../common/Index'

interface CompanyProps {
  customerId: string
  companyId: string
  index: number
  addCompany: (options) => void
  companyInfo?: any
  updateCompany: (options) => void
  removeCompany: (companyId: string) => void
  editAuthority: boolean
}

class Company extends React.Component<CompanyProps> {
  state = {
    valid: true,
    showRemoveConfirm: false,

    companyName: '',
    contactName: '',
    contactMobile: '',
    contactEmail: '',

    taxpayerIdentifyNumber: '',
    bank: '',
    bankAccount: '',
    billAddress: '',
    billMobile: '',
    billPostAddress: '',
    billReceiver: '',
    receiverContactInfo: '',
  }

  addOrUpdate = () => {
    let options = this.getOptions()
    if (this.props.companyId) {
      options['subsidiary_id'] = this.props.companyId
      this.props.updateCompany(options)
    } else {
      this.props.addCompany(options)
    }
  }

  getOptions() {
    const {
      companyName, contactName, contactMobile, contactEmail,
      taxpayerIdentifyNumber, bank, bankAccount, billAddress, billMobile, billPostAddress, billReceiver, receiverContactInfo
    } = this.state
    return {
      "customer_info_id": this.props.customerId,
      "subsidiary_name": companyName,
      "contacts_name": contactName,
      "contacts_telephone": contactMobile,
      "contacts_mail": contactEmail,
      "billing_taxpayer_number": taxpayerIdentifyNumber,
      "billing_open_bank": bank,
      "billing_open_bank_account": bankAccount,
      "billing_address": billAddress,
      "billing_telephone": billMobile,
      "billing_invoice_mailing_address": billPostAddress,
      "billing_invoice_recipient": billReceiver,
      "billing_recipient_contact": receiverContactInfo
    }
  }

  componentWillMount() {
    if (this.props.companyInfo) {
      this.setState(this.props.companyInfo)
    }
  }

  render() {
    return (
      <Row className="bb">
        {
          this.state.showRemoveConfirm && (
            <Confirm
              message="确认删除此子公司信息吗？"
              onExited={() => this.setState({showRemoveConfirm: false})}
              onConfirm={() => this.props.removeCompany(this.props.companyId)}
            />
          )
        }
        <Index index={this.props.index}/>
        <Part>
          <Form onValidChange={valid => this.setState({valid})} disabled={!this.props.editAuthority}>
            <LabelAndInput
              className="bb"
              label="名称" inputType={NECESSARY}
              required={true} name="companyName"
              value={this.state.companyName} onChange={v => this.setState({companyName: v})}
            />
            <InputGroup className="bb" label="联系人信息">
              <LabelAndInput label="联系人" value={this.state.contactName} onChange={v => this.setState({contactName: v})}/>
              <LabelAndInput label="电话" value={this.state.contactMobile} onChange={v => this.setState({contactMobile: v})}/>
              <LabelAndInput label="邮箱" value={this.state.contactEmail} onChange={v => this.setState({contactEmail: v})}/>
            </InputGroup>

            <InputGroup label="开票信息">
              <LabelAndInput label="纳税人识别号" value={this.state.taxpayerIdentifyNumber} onChange={v => this.setState({taxpayerIdentifyNumber: v})}/>
              <LabelAndInput label="开户银行" value={this.state.bank} onChange={v => this.setState({bank: v})}/>
              <LabelAndInput label="开户银行账号" value={this.state.bankAccount} onChange={v => this.setState({bankAccount: v})}/>
              <LabelAndInput label="开票地址" value={this.state.billAddress} onChange={v => this.setState({billAddress: v})}/>
              <LabelAndInput label="电话" value={this.state.billMobile} onChange={v => this.setState({billMobile: v})}/>
              <LabelAndInput label="发票邮寄地址" value={this.state.billPostAddress} onChange={v => this.setState({billPostAddress: v})}/>
              <LabelAndInput label="发票接收人" value={this.state.billReceiver} onChange={v => this.setState({billReceiver: v})}/>
              <LabelAndInput label="接收人联系方式" value={this.state.receiverContactInfo} onChange={v => this.setState({receiverContactInfo: v})}/>
            </InputGroup>
            {
              this.props.editAuthority && this.props.companyId && (
                <div className="clearfix m10">
                  <div className="pull-right">
                    <span className="input-unit-illustrate">点此删除按钮删除一条供应商信息</span>
                    <Button className="small danger" onClick={() => this.setState({showRemoveConfirm: true})}>删除</Button>
                  </div>
                </div>
              )
            }
          </Form>
          <div className="m10">
            {
              this.props.editAuthority && (
                <Button className="block" onClick={this.addOrUpdate} disabled={!this.props.customerId || !this.state.valid}>
                  {this.props.companyId && <span>更新</span>}
                  {!this.props.companyId && <span>保存</span>}
                </Button>
              )
            }
          </div>
        </Part>
      </Row>
    )
  }
}

export default Company
