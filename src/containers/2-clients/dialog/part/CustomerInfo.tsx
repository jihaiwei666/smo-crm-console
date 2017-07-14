/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import InputUnit from '../../../common/InputUnit'
import Radio from '../../../../components/form/radio/Radio'
import LabelAndInput from '../../../common/LabelAndInput'
import Save from '../../../common/Save'
import LabelAndInput1 from '../../../common/LabelAndInput1'

interface CustomerInfoProps {
  customerId: string
  addCustomer?: (baseInfo) => void
  customerBaseInfo?: any
  updateCustomer?: (baseInfo) => void
}

class CustomerInfo extends React.Component<CustomerInfoProps> {
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

  checkValid = () => {
    let valid = true
    const {customerName, customerCategory} = this.state
    if (customerName.trim() == '') {
      valid = false
    }
    if (customerCategory == null) {
      valid = false
    }
    if (valid != this.state.valid) {
      this.setState({valid})
    }
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
      <div>
        <InputUnit>
          <LabelAndInput label="客户名称（*）" value={this.state.customerName} onChange={v => this.setState({customerName: v}, this.checkValid)}/>
          <div className="input-unit-illustrate">客户名称只能输入汉字、英文、数字、-、（、）， “-”作为母公司名与子公司名的连接符号</div>
        </InputUnit>

        <InputUnit>
          <LabelAndInput1 label="客户性质（*）">
            <Radio.Group value={this.state.customerCategory} onChange={v => this.setState({customerCategory: v}, this.checkValid)}>
              <Radio value="1">Sponsor</Radio>
              <Radio value="2">CRO</Radio>
              <Radio value="3">SMO</Radio>
              <Radio value="4">Site</Radio>
            </Radio.Group>
          </LabelAndInput1>
        </InputUnit>

        <InputUnit>
          <LabelAndInput label="地址（!）" value={this.state.customerAddress} onChange={v => this.setState({customerAddress: v})}/>
        </InputUnit>

        <InputUnit>
          <LabelAndInput1 label="重要级别（!）">
            <Radio.Group value={this.state.importantLevel} onChange={v => this.setState({importantLevel: v})}>
              <Radio value="1">关键客户</Radio>
              <Radio value="2">重要客户</Radio>
              <Radio value="3">普通客户</Radio>
            </Radio.Group>
          </LabelAndInput1>
        </InputUnit>

        <InputUnit>
          <LabelAndInput placeholder="" label="客户编码" disabled={true} value={this.state.customerNumber}/>
          <div className="input-unit-illustrate">进入项目合作或进入供应商，则系统自动生成客户编码（流水号），无法修改</div>
        </InputUnit>

        <InputUnit>
          <LabelAndInput1 label="开票信息（!）">
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
        </InputUnit>

        <Save disabled={!this.state.valid} onClick={this.save}/>
      </div>
    )
  }
}

export default CustomerInfo
