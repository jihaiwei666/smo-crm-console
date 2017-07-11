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
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'

interface ContactProps {
}

class Contact extends React.Component<ContactProps> {
  render() {
    return (
      <div>
        <FlexDiv>
          <div className="contact-info">
            联系人信息：
          </div>
          <Part>
            <LabelAndInput label="姓名（*）"/>
            <LabelAndInput label="电话（!）"/>
            <LabelAndInput label="邮箱（!）"/>
            <LabelAndInput label="职位"/>
            <LabelAndInput1 label="性别">
              <Radio.Group value="1" onChange={() => null}>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
                <Radio value="3">其它</Radio>
              </Radio.Group>
            </LabelAndInput1>
            <LabelAndInput label="地址"/>
            <LabelAndInput1 label="备注">
              <textarea className="input" rows={5}></textarea>
            </LabelAndInput1>
          </Part>
        </FlexDiv>
        <div className="clearfix p10 bb">
          <span className="input-unit-illustrate">请先完善联系人信息，之后才能在CDA、供应商、RFI的对接人中选择该联系人</span>
          <div className="pull-right">
            <Button className="small">添加</Button>
          </div>
        </div>

        <div className="p10 bb">
          <div style={{marginRight: '120px'}}>
            拜访记录（!）：
          </div>
          <div className="pull-right">
            <Button className="small">...查看更多</Button>
          </div>
          <div className="input-unit-illustrate">
            详细记录对该客户的拜访记录，拜访内容中填写该次拜访的主要讨论事宜
          </div>
          <div className="m10">
            <Button className="block">保存</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact
