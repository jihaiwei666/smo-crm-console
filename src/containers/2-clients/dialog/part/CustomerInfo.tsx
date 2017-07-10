/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Select1 from 'app-core/common/Select1'

import Input from '../../../../components/form/Input'
import Label from '../../../common/Label'
import InputUnit from '../../../common/InputUnit'
import Button from '../../../../components/button/Button'
import Radio from '../../../../components/form/radio/Radio'
import LabelAndInput from '../../../common/LabelAndInput'

interface CustomerInfoProps {
}

class CustomerInfo extends React.Component<CustomerInfoProps> {
  render() {
    return (
      <div>
        <InputUnit>
          <FlexDiv>
            <Label>客户名称（*）：</Label>
            <Part>
              <Input placeholder="请输入"/>
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">客户名称只能输入汉字、英文、数字、-、（、）， “-”作为母公司名与子公司名的连接符号</div>
        </InputUnit>

        <InputUnit style={{height: '22px'}}>
          <FlexDiv>
            <Label>客户性质（*）：</Label>
            <Part>
              <Radio.Group value={'1'} onChange={value => this.setState({})}>
                <Radio value="1">Sponsor</Radio>
                <Radio value="2">CRO</Radio>
                <Radio value="3">SMO</Radio>
                <Radio value="4">Site</Radio>
              </Radio.Group>
            </Part>
          </FlexDiv>
        </InputUnit>

        <InputUnit>
          <FlexDiv>
            <Label>地址（!）：</Label>
            <Part>
              <Input placeholder="请输入"/>
            </Part>
          </FlexDiv>
        </InputUnit>

        <InputUnit>
          <FlexDiv>
            <Label>重要级别（!）：</Label>
            <Part>
              <Radio.Group value={'1'} onChange={value => this.setState({})}>
                <Radio value="1">关键客户</Radio>
                <Radio value="2">重要客户</Radio>
                <Radio value="3">普通客户</Radio>
              </Radio.Group>
            </Part>
          </FlexDiv>
        </InputUnit>

        <InputUnit>
          <FlexDiv>
            <Label>客户编码：</Label>
            <Part>
              <Input placeholder="请输入"/>
            </Part>
          </FlexDiv>
          <div className="input-unit-illustrate">进入项目合作或进入供应商，则系统自动生成客户编码（流水号），无法修改</div>
        </InputUnit>

        <InputUnit>
          <FlexDiv>
            <Label>开票信息（!）：</Label>
            <Part>
              <div className="bill-info">
                <LabelAndInput label="纳税人识别号"/>
                <LabelAndInput label="开户银行"/>
                <LabelAndInput label="开户银行账号"/>
                <LabelAndInput label="开票地址"/>
                <LabelAndInput label="电话"/>
                <LabelAndInput label="发票邮寄地址"/>
                <LabelAndInput label="发票接收人"/>
                <LabelAndInput label="接收人联系方式"/>
              </div>
            </Part>
          </FlexDiv>
        </InputUnit>

        <div className="m10">
          <Button className="block">保存</Button>
        </div>
      </div>
    )
  }
}

export default CustomerInfo
