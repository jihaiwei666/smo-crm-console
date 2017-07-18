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
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup from '../../../common/InputGroup'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import CheckBox from '../../../../components/form/checkbox/CheckBox'
import Save from '../../../common/Save'

interface RFIProps {
}

class RFI extends React.Component<RFIProps> {
  render() {
    return (
      <div>
        <FlexDiv>
          <div> 1</div>
          <Part>
            <LabelAndInput label="填写日期（*）："/>
            <LabelAndInput label="填写人（*）："/>
            <InputGroup label="RFI对接人（!）：">
              <LabelAndInput label="对接人："/>
              <LabelAndInput label="电话"/>
              <LabelAndInput label="邮箱"/>
              <LabelAndInput label="职位"/>
              <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                <AddButton/>
              </TextAndButton>
            </InputGroup>
            <LabelAndInput label="审阅人（!）："/>
            <LabelAndInput1 label="语言（!）：">
              <Radio.Group value="1">
                <Radio value="1">中文</Radio>
                <Radio value="2">English</Radio>
              </Radio.Group>
            </LabelAndInput1>
            <LabelAndInput1 label="模块（!）：">
              <CheckBox checked={false} onChange={() => this.setState({})}>公司信息</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>财务</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>合规</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>培训</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>项目管理</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>项目经验</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>IT</CheckBox>
              <CheckBox checked={false} onChange={() => this.setState({})}>第三方供应商</CheckBox>
              <FlexDiv>
                <CheckBox checked={false} onChange={() => this.setState({})}>其它，请备注：</CheckBox>
                <Part>
                  <Input placeholder="请输入"/>
                </Part>
              </FlexDiv>
            </LabelAndInput1>
          </Part>
        </FlexDiv>
        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small">...查看更多</Button>
        </TextAndButton>
        <Save/>
      </div>
    )
  }
}

export default RFI
