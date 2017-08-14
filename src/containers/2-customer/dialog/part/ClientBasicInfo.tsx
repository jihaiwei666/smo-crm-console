/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import Form from 'app-core/form/Form'

import Radio from '../../../../components/form/radio/Radio'
import LabelAndInput from '../../../common/LabelAndInput'
import Save from '../../../common/Save'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import {NECESSARY, IMPORTANT} from '../../../common/Label'

interface ClientBasicInfoProps {
  customerId: string
  addCustomer?: (baseInfo) => void
  customerBaseInfo?: any
  updateCustomer?: (baseInfo) => void
}

class ClientBasicInfo extends React.Component<ClientBasicInfoProps> {
  state = {
    valid: false,

    customerName: '',
    customerCategory: null,
    customerAddress: '',
    importantLevel: null,
    customerNumber: '',

    taxpayerIdentifyNumber: '',
    bank: '',
    bankAccount: '',
    billAddress: '',
    telephone: '',
    billPostAddress: '',
    billReceiver: '',
    receiverContactInfo: ''
  }

  save = () => {
    let options = this.getOptions()
    if (this.props.customerId) {
      options['customer_info_id'] = this.props.customerId
      this.props.updateCustomer(options)
    } else {
      this.props.addCustomer(options)
    }
  }

  getOptions = () => {
    const {
      customerName, customerCategory, customerAddress, importantLevel,
      taxpayerIdentifyNumber, bank, bankAccount, billAddress, telephone, billPostAddress, billReceiver, receiverContactInfo
    } = this.state
    return {
      "customer_name": customerName,
      "customer_type": customerCategory,
      "customer_address": customerAddress,
      "customer_important_level": importantLevel,

      "billing_taxpayer_number": taxpayerIdentifyNumber,
      "billing_open_bank": bank,
      "billing_open_bank_account": bankAccount,
      "billing_address": billAddress,
      "billing_telephone": telephone,
      "billing_invoice_mailing_address": billPostAddress,
      "billing_invoice_recipient": billReceiver,
      "billing_recipient_contact": receiverContactInfo,
    }
  }

  componentWillMount() {
    if (this.props.customerBaseInfo) {
      this.setState(this.props.customerBaseInfo)
    }
  }

  render() {
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <div className="bb">
          <LabelAndInput
            label="客户名称" inputType={NECESSARY}
            required={true} name="customerName"
            value={this.state.customerName} onChange={v => this.setState({customerName: v})}/>
          <div className="input-unit-illustrate">客户名称只能输入汉字、英文、数字、-、（、）， “-”作为母公司名与子公司名的连接符号</div>
        </div>

        <LabelAndInput1 label="客户性质" inputType={NECESSARY}>
          <Radio.Group
            required={true} name="customerCategory"
            value={this.state.customerCategory} onChange={v => this.setState({customerCategory: v})}>
            <Radio value="1">Sponsor</Radio>
            <Radio value="2">CRO</Radio>
            <Radio value="3">SMO</Radio>
            <Radio value="4">Site</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput
          label="地址" inputType={IMPORTANT}
          value={this.state.customerAddress} onChange={v => this.setState({customerAddress: v})}/>

        <LabelAndInput1 label="重要级别" inputType={IMPORTANT}>
          <Radio.Group value={this.state.importantLevel} onChange={v => this.setState({importantLevel: v})}>
            <Radio value="1">关键客户</Radio>
            <Radio value="2">重要客户</Radio>
            <Radio value="3">普通客户</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <div className="bb">
          <LabelAndInput placeholder="" label="客户编码" disabled={true} value={this.state.customerNumber}/>
          <div className="input-unit-illustrate">进入项目合作或进入供应商，则系统自动生成客户编码（流水号），无法修改</div>
        </div>

        <div className="bb">
          <LabelAndInput1 label="开票信息" inputType={IMPORTANT}>
            <div className="bill-info">
              <LabelAndInput
                label="纳税人识别号"
                value={this.state.taxpayerIdentifyNumber}
                onChange={v => this.setState({taxpayerIdentifyNumber: v})}
              />
              <LabelAndInput
                label="开户银行"
                value={this.state.bank}
                onChange={v => this.setState({bank: v})}
              />
              <LabelAndInput
                label="开户银行账号"
                value={this.state.bankAccount}
                onChange={v => this.setState({bankAccount: v})}
              />
              <LabelAndInput
                label="开票地址"
                value={this.state.billAddress}
                onChange={v => this.setState({billAddress: v})}
              />
              <LabelAndInput
                label="电话"
                value={this.state.telephone}
                onChange={v => this.setState({telephone: v})}
              />
              <LabelAndInput
                label="发票邮寄地址"
                value={this.state.billPostAddress}
                onChange={v => this.setState({billPostAddress: v})}
              />
              <LabelAndInput
                label="发票接收人"
                value={this.state.billReceiver}
                onChange={v => this.setState({billReceiver: v})}
              />
              <LabelAndInput
                label="接收人联系方式"
                value={this.state.receiverContactInfo}
                onChange={v => this.setState({receiverContactInfo: v})}
              />
            </div>
          </LabelAndInput1>
        </div>

        <Save disabled={!this.state.valid} onClick={this.save}/>
      </Form>
    )
  }
}

export default ClientBasicInfo
